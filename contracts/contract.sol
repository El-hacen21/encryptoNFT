// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity >=0.8.13 <0.9.0;

// Importing necessary modules from OpenZeppelin and other libraries
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

import "fhevm/abstracts/Reencrypt.sol";
import "fhevm/lib/TFHE.sol";

contract FDRM is Reencrypt, ERC721URIStorage, Ownable2Step {
    // Enable the use of EnumerableSet's functionality for UintSet and AddressSet.
    // This allows us to use set operations like add, remove, and contains, which
    // are useful for managing unique collections of unsigned integers and addresses.
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;

    // Tracks the total number of NFT tokens that have been minted in the contract.
    // This counter is incremented each time a new token is minted, ensuring each token
    // has a unique identifier.
    uint256 internal mintedCounter;

    // Maps each owner's Ethereum address to a set of token IDs that they own.
    // The use of EnumerableSet.UintSet helps prevent duplicates and provides
    // efficient operations to manage the collection of owned tokens.
    mapping(address => EnumerableSet.UintSet) internal ownerTokens;

    // Maps each token ID to its encrypted key hash.
    mapping(uint256 => mapping(uint8 => euint64)) internal tokenEncryptedKey;

    // Maps each token ID to a dynamic mapping where each address points to a boolean
    // value indicating whether that address has been granted shared access to the token.
    // This is public, allowing for external visibility into access rights for each token.
    mapping(uint256 => mapping(address => bool)) internal sharedAccess;

    // Maps each user's Ethereum address to a set of token IDs that have been shared with them,
    // enabling users to quickly check and iterate over tokens they have access to.
    // The use of EnumerableSet.UintSet ensures that there are no duplicate entries and allows
    // efficient addition and removal of tokens.
    mapping(address => EnumerableSet.UintSet) internal sharedTokens;

    // Maps each token ID to a set of addresses that have shared access to that token.
    // This mapping is used to efficiently manage and revoke shared access when needed,
    // as it allows quick enumeration and modification of all users who have access to a specific token.
    mapping(uint256 => EnumerableSet.AddressSet) internal tokenSharedWithUsers;

    // Constants for token name and symbol
    string private constant _TOKEN_NAME = "NFTDRM";
    string private constant _TOKEN_SYMBOL = "FDRM";

    // size limits on the sets to avoid DDOS issues due to excessive gas costs if sets become too big
    uint8 public constant MAX_USERS_TO_REMOVE = 20;

    // Constructor initializes the ERC721 token with a name and a symbol and sets the owner
    constructor() ERC721(_TOKEN_NAME, _TOKEN_SYMBOL) Ownable(msg.sender) {
        mintedCounter = 0;
    }

    // Allows users to mint a new NFT with a specified content identifier hash (CID)
    function mintToken(
        string calldata cidHash,
        bytes[4] calldata encryptedFileKey
    ) external returns (uint256) {
        require(bytes(cidHash).length > 0, "CID cannot be empty.");
        uint256 tokenId = mintedCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, cidHash);
        ownerTokens[msg.sender].add(tokenId);

        for (uint8 i = 0; i < 4; i++) {
            euint64 fileKeyPart = TFHE.asEuint64(encryptedFileKey[i]);
            tokenEncryptedKey[tokenId][i] = fileKeyPart;
        }

        mintedCounter++;
        emit TokenMinted(tokenId);
        return tokenId;
    }

    // Function to retrieve the number of tokens owned by the caller
    function getSupply() external view returns (uint256) {
        return ownerTokens[msg.sender].length();
    }

    // Public function to get a list of tokens with pagination
    function getTokensInRange(uint256 start, uint256 end)
        external
        view
        returns (uint256[] memory, string[] memory)
    {
        uint256 totalTokens = ownerTokens[msg.sender].length();

        require(start < totalTokens, "Invalid start index");
        if (end > totalTokens) end = totalTokens;

        uint256 rangeSize = end - start;
        uint256[] memory tokens = new uint256[](rangeSize);
        string[] memory uris = new string[](rangeSize);

        for (uint256 i = 0; i < rangeSize; i++) {
            uint256 tokenId = ownerTokens[msg.sender].at(start + i);
            tokens[i] = tokenId;
            uris[i] = tokenURI(tokenId);
        }

        return (tokens, uris);
    }

    // Function to share a token with another user
    function shareToken(uint256 tokenId, address user)
        public
        onlyTokenOwner(tokenId)
        requireNonZeroAddress(user)
    {
        require(
            !sharedAccess[tokenId][user],
            "Token already shared with this user."
        );

        sharedAccess[tokenId][user] = true;
        sharedTokens[user].add(tokenId);
        tokenSharedWithUsers[tokenId].add(user);
    }

    // Function to get shared tokens for a user with pagination
    function getSharedTokensInRange(uint256 start, uint256 end)
        external
        view
        requireNonZeroAddress(msg.sender)
        returns (uint256[] memory, string[] memory)
    {
        uint256 totalTokens = sharedTokens[msg.sender].length();

        require(start < totalTokens, "Invalid start index");
        if (end > totalTokens) end = totalTokens;

        uint256 rangeSize = end - start;
        uint256[] memory tokens = new uint256[](rangeSize);
        string[] memory uris = new string[](rangeSize);

        for (uint256 i = 0; i < rangeSize; i++) {
            uint256 tokenId = sharedTokens[msg.sender].at(start + i);
            tokens[i] = tokenId;
            uris[i] = tokenURI(tokenId);
        }

        return (tokens, uris);
    }

    // Function to retrieve the number of tokens shared with the caller
    function getSharedWithSupply() external view returns (uint256) {
        return sharedTokens[msg.sender].length();
    }

    // Function to get a list of all users sharing the given token
    function getSharedWithAddresses(uint256 tokenId)
        public
        view
        returns (address[] memory)
    {
        EnumerableSet.AddressSet storage set = tokenSharedWithUsers[tokenId];
        uint256 length = set.length();
        address[] memory users = new address[](length);

        for (uint256 i = 0; i < length; ++i) {
            users[i] = set.at(i);
        }

        return users;
    }

    function transferToken(
        address to,
        uint256 tokenId
    ) public onlyTokenOwner(tokenId) {
        _safeTransfer(msg.sender, to, tokenId);

        ownerTokens[msg.sender].remove(tokenId);
        ownerTokens[to].add(tokenId);

        // Remove the new owner as a shared with
        if (sharedAccess[tokenId][to]) {
            _revokeSharedAccess(tokenId, to);
        }
    }

    function _revokeSharedAccess(uint256 tokenId, address user) private {
        if (sharedAccess[tokenId][user]) {
            sharedAccess[tokenId][user] = false;
            sharedTokens[user].remove(tokenId);
            tokenSharedWithUsers[tokenId].remove(user);
        }
    }

    // Function to revoke all shared access for a token with a limit
    function revokeAllSharedAccess(
        uint256 tokenId,
        uint8 limitNumberOfSharedWith
    ) public onlyTokenOwner(tokenId) {
        EnumerableSet.AddressSet storage users = tokenSharedWithUsers[tokenId];
        uint256 numberOfUsers = users.length();
        uint8 limit = limitNumberOfSharedWith < numberOfUsers
            ? limitNumberOfSharedWith
            : uint8(numberOfUsers);

        // Loop over the set and remove each user up to the limit
        for (uint8 i = 0; i < limit; i++) {
            address user = users.at(0); // Always remove the first user as the set shrinks
            _revokeSharedAccess(tokenId, user);
        }
    }

    // Function to revoke shared access to a token for a specific address
    function revokeTokenAccess(uint256 tokenId, address user)
        public
        onlyTokenOwner(tokenId)
        requireNonZeroAddress(user)
    {
        require(sharedAccess[tokenId][user], "Access not granted.");
        _revokeSharedAccess(tokenId, user);
    }

    // Function to burn a token owned by the caller
    function burnToken(uint256 tokenId, uint8 limitNumberOfSharedWith)
        public
        onlyTokenOwner(tokenId)
    {
        // Revoke all shared accesses and remove token from sharedTokens for each user who had access
        revokeAllSharedAccess(tokenId, limitNumberOfSharedWith);

        // If there are no more shared users, proceed with burning
        if (tokenSharedWithUsers[tokenId].length() == 0) {
            // Remove the token from the owner's set of tokens
            ownerTokens[msg.sender].remove(tokenId);

            _burn(tokenId);
        }
    }

    function reencrypt(
        uint256 tokenId,
        bytes32 publicKey,
        bytes memory signature
    )
        public
        view
        onlySignedPublicKey(publicKey, signature)
        returns (bytes[] memory)
    {
        require(
            ownerOf(tokenId) == msg.sender || sharedAccess[tokenId][msg.sender],
            "Caller is neither owner nor authorized."
        );

        // Declaring an array to hold re-encrypted key parts
        bytes[] memory reEncryptedKeyParts = new bytes[](4);

        // Re-encrypt each key part
        for (uint8 i = 0; i < 4; i++) {
            reEncryptedKeyParts[i] = TFHE.reencrypt(
                tokenEncryptedKey[tokenId][i],
                publicKey
            );
        }

        return reEncryptedKeyParts;
    }

    // Modifier to check token ownership
    modifier onlyTokenOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this token.");
        _;
    }

    // Modifier to check that the provided address is not the zero address.
    modifier requireNonZeroAddress(address addr) {
        require(addr != address(0), "Cannot use the zero address.");
        _;
    }

    // Event: Emitted after a token is successfully minted to track the creation of new tokens.
    event TokenMinted(uint256 indexed tokenId);
}
