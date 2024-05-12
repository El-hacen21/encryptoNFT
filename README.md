# Documentation of the project NFT for access control to secret content, by El Hacen Diallo & Matthieu Rambaud

This document gives an overview of the process of creation and management of NFTs doing access control to secret contents.
The management of the NFTs is done by the unique [contract](/src/components/Blockchain/contract.sol) and the graphical interface (Mint.css and Gallery.css) enables to interact with this contract and with the storage place of the encrypted secret contents.
This storage place is IPFS (InterPlanetary File System), ensuring robust and decentralized storage solutions.
Each NFT (token) controls access to one secret content, its `owner` may possibly give access to this content to several users, which we call the _Shared-with_ of the token.

As explained in V. below, we are considering adding, as a bonus, the possibility to hide the identities the Shared-with.
Only the Shared-with effectively querying access to a plaintext content, would lose their anonymity. 
This will be implementable as soon as efficient functions for encrypted arrays will be available in the fhEVM.

## 0. Running the Application
  - The graphical interface is provided by Mint.css and Gallery.css. It onboard a [short documentation](/src/components/HowItWorks/HowITWorks.tsx).
  - In case, we have deployed the application here: https://el-hacen21.github.io/zama_bounty/ .
  - To run the application locally: a first requirement is to import Buffer. Recall that Buffer is used in Zama's implementation of the `instance.decrypt` function, which decrypts re-rencrypted ciphertexts produced by the fhEVM.
    This import can cause problems https://docs.zama.ai/fhevm/guides/webpack .
    A second requirement is that, since the application interacts with IPFS, it is necessary to run an IPFS node.
    The hard way is to run a local IPFS node (in which case, it is needed to update IPFSConfig in config.ts).
    The easy way is to use Pinata: Pinata (https://www.pinata.cloud/) is a cloud-based service that provides an easier way to upload and manage files on IPFS. <br />
    
## I. Creation of an NFT from a secret content
Summarizing, the graphical interface (Mint.css) enables the Creator of a secret content (`file`) to perform automatically all the following steps at once:
  - Generation of a symmetric key (`fileKey`), encryption of `file` under `fileKey`, producing a ciphertext `ciphFile`.
  - Then, upload of `ciphFile` on IPFS, concatenated with an encryption of the `fileKey` (`encryptedFileKey`) under the fhEVM public key attached to the contract.<br />
    `// Hence, controling access to the secret content "file" is equivalent to controling access to the "fileKey".`<br />
  - Finally, minting of the NFT associated to the `encryptedFileKey`.<br />
    `// The contract will do the access control to the "encryptedFileKey", thanks to the power of the fhEVM to privately decrypt the "encryptedFileKey" into a "fileKey", to a predetermined list of so-called Shared-with users (identified by their Ethereum addresses).`

In detail: the Creator uploads a secret content (`file`) in the graphical interface. This upload calls `EncryptThenMint` in Mint.tsx, which automatically performs all the following operations at once:

1. **Encryption of the Secret Content**:
    - A symmetric 256 bits encryption key (`fileKey`) is generated.
    - The secret content `file` is symmetrically encrypted to produce the ciphertext:<br />
        <p align="center"> "ciphFile" <-- AES-CTR.Encrypt("fileKey","file") </p>
    - The `fileKey` is encrypted into a ciphertext: `encryptedFileKey` under the fhEVM public key attached to the contract. <br />
      `// This is done in the function "fileKeyEncryption" in Utils/utils.ts. For compatibility reasons with the encryption function `encrypt64` taking 64bits-long inputs, "encryptedFileKey" comes as an array of 4 entries of 64bits each.`
    - Then, the `encryptedFileKey` is added as a metadata of the `ciphFile`, giving:<br />
      <p align="center"> "encryptedFile" <-- ("ciphFile"|"encryptedFileKey"). </p>

2. **Storage on IPFS** :
    - `encryptedFile` is uploaded on IPFS , and the `cidHash` (unique IPFS identifier of `encryptedFile`) is retrieved.
   
3. **Minting of the NFT** :
    - An NFT (token) is created on the contract, containing `cidHash` as IPFS reference to the `encryptedFile`. `// This is performed by the function "mintToken(cidHash)" in contract.ts.`
    - The _hash_ of the `encryptedFileKey` is also added as metadata of the NFT. `// We could have put all the "encryptedFileKey" as metadata, but this would have costed much more blockchain storage space.
      We will detail later the trick enabling the contract to control acces to "fileKey" despite storing only this hash of the "encryptedFileKey". `
      
## II. Management of the NFT

- **Transfer and Burn** :
    - Classical operations such as transfer of ownership, or destruction (burn) of the NFT are possible via the graphical interface.
   
- **Addition and Revocation of Shared-with** :
    - The functions `shareToken` and `revokeTokenAccess` (in contract.sol and accessible by the graphical interface) enable to add or remove the address of a user (`user`) in the list `sharedAccess[tokenId]` of the _Shared-with_ users, i.e., those having access to the secret content associated to the token (`tokenId`).<br />
    ` // To enable a shared-with user to quickly know the tokens that it has access to, these functions also update the lists ("sharedTokens[user]") of the tokens shared with each user ("user")`  <br />
    `// The graphical interface also enables to revoke, at once, all the shared-with of a given token.`

## III. Acces to the secret content by a Shared-with
The function `displayGallery` (in Gallery.tsx) is executed by a user, it returns and displays all the secret contents of the tokens of which it is a _shared-with_.
The function performs automatically all the following steps.
Summarizing, for each secret content (token) for which the user is shared-with, it queries the re-encryption of the `fileKey` under a public encryption key `publicKey` which the user owns.
Then, it decrypts this re-encryption to obtain `fileKey`, downloads the public ciphertext `ciphFile` from IPFS and finally decrypts it into `file` using the `fileKey`.

In more detail, the function `displayGallery` performs automatically the following steps for each token in the list "sharedTokens[user]", i.e., of which the user is a _shared-with_:

1. **Generation of the target public Key for Reencryption** :
    - The user shared-with of a token needs to receive the `fileKey` encrypted under an encryption key `publicKey` which it owns.
      It thus generates an encryption key pair (unless it has already one associated to the contract) using the function `getSignature(contractAddress, account)`.<br />
      `// This function is borrowed from `[fhevmjs.ts](https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts).
      `// The strange syntax ("getSignature") is because the output ("reencryption")  of this function is actually the "publicKey" concatenated with a signature ("signature") issued by the Shared-with on the "publicKey".`
   
2. **Reencryption then Decryption of the fileKey** :
    - Reencryption of the `encryptedFileKey` into the encryption key `publicKey`, to obtain `reEncryptedFileKey`.<br />
    `// The reencryption query to the fhEVM is done by the function "reencrypt" in "contract.sol".
        It is this function which controls the access: it checks that the signer ("signer") of the public key ("publicKey") is member of the list ("sharedAccess[tokenId]") of the Shared-with of the token .`<br /><br />
    `// Technically, this check is done by the modifier "onlyAuthorizedSigner".
    Its implementation is inspired from the official modifier `["onlySignedPublicKey"](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
    `The novelty is that "onlyAuthorizedSigner" allows the msg.sender not to be necessarily the "signer".
    To maintain security despite this relaxation, "onlyAuthorizedSigner" controls acces on the basis of the "signer" (of the "publicKey"), and not anymore based on the "msg.sender" (as in `["balanceOf" of the eERC720](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol)`)`
    `These modifications enable a scalability gain, as explained below in IV.` <br /><br />
    `// Very important: the  function "reencrypt" also checks that the "encryptedFileKey" is the one of the token: indeed, otherwise, a Shared-with of token1 could get the `fileKey2` of token2!.`<br />
    `// To this end, "reencrypt" compares the hash of the input "encryptedFileKey", with the hash stored on the contract. This trick enables no to store the (much heavier) "encryptedFileKey" on the blockchain.`
      
    - Decryption of `reEncryptedFileKey` with the secret decryption key of the Shared-with, to obtain the `fileKey`.<br />
    `// This is done via the call to "instance.decrypt". Note that the "instance" is not the fhEVM, we are not making a public decryption here. It is instead the local instance of the Shared-with, the one with which it generated its personal "publicKey".`
    - Using the `fileKey` to decrypt the `ciphFile`: <br />
        <p align="center"> "decryptedFile" <-- AES-CTR.Decrypt("fileKey","ciphFile") </p> 
        which is thus equal to the `file` initially uploaded by the Creator.

## IV. Scalability, thanks to Delegation to an untrusted Acces Broker
The shared-with Alice(s) do not necessarily want to create Ethereum accounts, nor to send requests to a contract and spend gaz just to access secret contents.
Our contract enables the use-case that _any_ Bob can call `reencrypt` with a `publicKey` for re-encryption which was generated and signed by Alice.
Hence, Bob can play the role of an Untrusted Acces Broker on behalf of several shared-with Alices, thus improving scalability.

In such a use-case, Bob is _untrusted_ because our function `reencrypt` enables him to obtain only `reEncryptedFileKey`'s encrypted with `publicKeys`'s _signed_ by shared-with Alices.
This proves that these `publicKeys`'s were generated and kept secretly by the Alices, unless they were absent-minded.
As a result, only the shared-with Alices can decrypt the `reEncryptedFileKey`'s obtained by Bob.
To achieve this desirable behavior of our function `reencrypt`, we had to remove the official modifier [`onlySignedPublicKey`](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
Indeed it imposed that the `publicKey` for reencryption be signed by the msg.sender, whereas, in our use-case, the msg.sender is instead Bob.
Our second modification was to control accès, in `reencrypt`, directly based on the `signer` of the `publicKey` (Alice), and not based on the le `msg.sender` Bob (as in [`balanceOf` of the eERC720](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol) ). 

Note that our graphical interface does not yet enable such a delegation, it deals only with calls to `reencrypt` made directly by Shared-with themselves.

## V. Project of improvement: Anonymization of the Shared-with, as soon as encrypted arrays will be released

We are considering adding an optional fonctionality enabling the owner of a token to declare Shared-with's under the form of a list (`hiddenSharedWith`) of their encrypted addresses (format "eaddress").
It is only when a Shared-with requests access to a plaintext content `file` that its public request to `reencrypt` makes it lose its anonymity.
We thus need to enrich `reencrypt` so that its tests membership of the public `signer` of the `publicKey`, in the encrypted list (`hiddenSharedWith`).
If it belongs, it is thus that the `signer` was indeed a (previously hidden) shared-with.
Thus, for the arguably majority of Shared-with Alices who do not need to obtain the secret content `file`, their anonymity is préserved.
What blocks us from implementing this addition is that, according to the [documentation](https://docs.zama.ai/fhevm/guides/pitfalls) , it is currently not advised to implement a membership test to a list of ciphertexts.
The reason being that the currently available functions of the fhEVM would require to "loop over all the indexes and check equality homomorphically, however this pattern is very expensive in gas and should be avoided whenever possible."
This documentation announces ("plans to make this kind of operation much more efficient in the future, by adding specialized operators for arrays").
As soon as such a membership operator will be shipped, we will be able to implement anonymization.

## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
* Banner image taken from https://www.zama.ai/fhevm
