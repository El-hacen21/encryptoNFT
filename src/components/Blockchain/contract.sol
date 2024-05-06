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

    // Mapping from token ID to a list of addresses with shared access
    mapping(uint256 => address[]) private sharedAccess;
    // Mapping from address to a list of shared tokens
    mapping(address => uint256[]) private tokensSharedWith;

    // Constant values used in the contract
    string private constant _TOKEN_NAME = "DRMNFT";
    string private constant _TOKEN_SYMBOL = "DRM";

    constructor() ERC721(_TOKEN_NAME, _TOKEN_SYMBOL) Ownable(msg.sender) {
        mintedCounter = 0;
    }

    // Public function to mint a new token
    function mint(string calldata cid)
        external
        returns (uint256, string memory)
    {
        require(bytes(cid).length > 0, "CID cannot be empty.");
        uint256 tokenId = mintedCounter;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, cid);

        ownerTokens[msg.sender].push(tokenId);
        tokenIndex[tokenId] = ownerTokens[msg.sender].length - 1;
        mintedCounter++;

        emit TokenMinted(tokenId, cid);
        return (tokenId, cid);
    }

    // Function to retrieve the number of tokens owned by the caller
    function getMySupply() external view returns (uint256) {
        return ownerTokens[msg.sender].length;
    }

    // Public function to get a list of tokens with pagination
    function getMyTokensInRange(uint256 start, uint256 end)
        external
        view
        returns (uint256[] memory, string[] memory)
    {
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
        delete sharedAccess[tokenId];
    }

    // Function to share a token with other addresses
    function shareToken(uint256 tokenId, address[] calldata recipients)
        external
        onlyTokenOwner(tokenId)
    {
        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                recipients[i] != address(0),
                "Cannot share with zero address"
            );
            sharedAccess[tokenId].push(recipients[i]);
        }
    }

    // Function to retrieve a list of tokens shared with msg.sender
    function getSharedWithMe() external view returns (uint256[] memory) {
        return tokensSharedWith[msg.sender];
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
            "The NFT encryption key must be a table of size 4"
        );

        // Declaring an array to hold re-encrypted data
        bytes[] memory reEncryptedKeys = new bytes[](8);

        // Re-encrypt each key
        for (uint256 i = 0; i < nftEncryptionKey.length; i++) {
            euint32 ekey = TFHE.asEuint32(nftEncryptionKey[i]);
            reEncryptedKeys[i] = TFHE.reencrypt(ekey, publicKey, 0);
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

    // Events
    event TokenMinted(uint256 indexed tokenId, string tokenURI);
}
