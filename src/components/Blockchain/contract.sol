// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "fhevm/abstracts/Reencrypt.sol";
import "fhevm/lib/TFHE.sol";

contract DRM is Reencrypt, ERC721URIStorage, Ownable2Step {
    uint256 private mintedCounter;

    // Mapping from owner to list of owned token IDs
    mapping(address => uint256[]) private ownerTokens;
    // Mapping from token ID to its index in the owner's array
    mapping(uint256 => uint256) private tokenIndex;

    // Constant values used in the contract
    string private constant _TOKEN_NAME = "DRMNFT";
    string private constant _TOKEN_SYMBOL = "DRM";

    constructor() ERC721(_TOKEN_NAME, _TOKEN_SYMBOL) Ownable(msg.sender) {
        mintedCounter = 0;
    }

    // Public function to mint a new token
    function mintToken(string calldata cidHash)
        external
        returns (uint256, string memory)
    {
        require(bytes(cidHash).length > 0, "CID cannot be empty.");
        uint256 tokenId = mintedCounter;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, cidHash);

        ownerTokens[msg.sender].push(tokenId);
        tokenIndex[tokenId] = ownerTokens[msg.sender].length - 1;
        mintedCounter++;


        emit TokenMinted(tokenId, cidHash);
        return (tokenId, cidHash);
    }

    // Function to retrieve the number of tokens owned by the caller
    function getSupply()
        external
        view
        returns (uint256)
    {
        return ownerTokens[msg.sender].length;
    }

    // Public function to get a list of tokens with pagination
    function getTokensInRange(
        uint256 start,
        uint256 end
    ) external view returns (uint256[] memory, string[] memory) {

        uint256[] storage allTokens = ownerTokens[msg.sender];
        uint256 totalTokens = allTokens.length;

        require(start < totalTokens, "Invalid start index");
        if (end > totalTokens) end = totalTokens;

        uint256 rangeSize = end - start;
        uint256[] memory tokens = new uint256[](rangeSize);
        string[] memory uris = new string[](rangeSize);

        for (uint256 i = 0; i < rangeSize; i++) {
            tokens[i] = allTokens[start + i];
            uris[i] = tokenURI(tokens[i]);
        }

        return (tokens, uris);
    }

    // Function to transfer a token to another address
    function transferToken(address to, uint256 tokenId)
        external
        onlyTokenOwner(tokenId)
        isNotZeroAddress(to)
    {
        safeTransferFrom(msg.sender, to, tokenId);
        _removeTokenFromOwnerEnumeration(msg.sender, tokenId);
        ownerTokens[to].push(tokenId);
        tokenIndex[tokenId] = ownerTokens[to].length - 1;
    }

    // Function to burn a token owned by the caller
    function burnToken(uint256 tokenId) external onlyTokenOwner(tokenId) {
        _burn(tokenId);
        _removeTokenFromOwnerEnumeration(msg.sender, tokenId);
    }


    // Function for re-encrypting the NFT encryption key before calling instance.decrypt locally
    function tokenOf(
        bytes32 publicKey,
        bytes calldata signature,
        bytes[] calldata nftEncryptionKey
    )
        public
        view
        onlySignedPublicKey(publicKey, signature)
        returns (bytes[] memory)
    {
        require(
            nftEncryptionKey.length == 8,
            "The NFT encryption key must be a table of size 8"
        );

        // Declaring an array to hold re-encrypted data
        bytes[] memory reEncryptedKeys = new bytes[](8);

        // Re-encrypt each key
        for (uint256 i = 0; i < nftEncryptionKey.length; i++) {
            euint32 ekey = TFHE.asEuint32(nftEncryptionKey[i]);
            reEncryptedKeys[i] = TFHE.reencrypt(ekey, publicKey);
        }

        return reEncryptedKeys;
    }

    // Function to remove a token from the ownership mapping
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId)
        internal
    {
        uint256 lastIndex = ownerTokens[from].length - 1;
        uint256 index = tokenIndex[tokenId];

        if (index != lastIndex) {
            uint256 lastTokenId = ownerTokens[from][lastIndex];
            ownerTokens[from][index] = lastTokenId;
            tokenIndex[lastTokenId] = index;
        }

        ownerTokens[from].pop();
        delete tokenIndex[tokenId];
    }

    // Modifier to check token ownership
    modifier onlyTokenOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this token.");
        _;
    }

    // Modifier to check address is not zero
    modifier isNotZeroAddress(address addr) {
        require(addr != address(0), "Cannot share with zero address.");
        _;
    }

    // Event to 
    event TokenMinted(uint256 indexed tokenId, string cidHash);
}
