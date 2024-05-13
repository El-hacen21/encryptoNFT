# Documentation of the on-chain DRM system using Zama's fhEVM, by El-Hacen Diallo & Matthieu Rambaud

[Link to the Application](https://el-hacen21.github.io/zama_bounty/)


This document gives an overview of the process of creation and management of NFTs doing access control to secret contents. The management of the NFTs is done by the unique [contract](/src/components/Blockchain/contract.sol) and the interfaces ([Mint](/src/components/Mint/) and [Gallery](/src/components/Gallery/)) enable to interact with this contract and with the storage place of the encrypted secret contents.
The storage location is IPFS (InterPlanetary File System), which ensures robust and decentralized storage solutions. Each NFT (token) controls access to specific secret content. Its owner has the authority to grant or revoke access to this content for multiple users, which we call the _Shared-with_ of the token.

## I. Creation of an NFT
Summarizing, the graphical interface [Mint.tsx](/src/components/Mint/Mint.tsx) allows a user to upload a file (image, video, document, etc.) to be saved as secret content over which only they have control. To achieve this, the following processes are automatically performed after the file has been uploaded:

  - Generation of a symmetric key (`fileKey`), encryption of `file` under `fileKey`, producing a ciphertext `ciphFile`.
  - Then, upload of `ciphFile` on IPFS, concatenated with an encryption of the `fileKey` (`encryptedFileKey`) under the fhEVM public key attached to the contract.
    > Hence, controlling access to the secret content "file" is equivalent to controlling access to the "fileKey".
  - Finally, minting of the NFT associated to the `encryptedFileKey`.
    > The contract will do the access control to the "encryptedFileKey", thanks to the power of the fhEVM to privately decrypt the "encryptedFileKey" into a "fileKey", to a predetermined list of so-called Shared-with users (identified by their Ethereum addresses).


In detail: the Creator uploads a secret content (`file`) in the graphical interface. This upload calls `EncryptThenMint` in [Mint.tsx](/src/components/Mint/Mint.tsx), which automatically performs all the following operations at once:


1. **Encryption of the Secret Content**:
    - A symmetric 256-bit encryption key (`fileKey`) is generated using [AES-CTR algorthim](/src/components/Utils/keyencrypt.ts)
      ```javascript 
      const fileKey = await generateKey();
      ```
    
    - The secret content `file` is symmetrically encrypted to produce the ciphertext:
      ```javascript 
        const ciphFile = await encryptFile(file, fileKey);
      ```
    - The `fileKey` is encrypted into a `ciphFile`: `encryptedFileKey` under the fhEVM public key attached to the contract. 
      ```javascript 
      const encryptedFileKey = await fileKeyEncryption(fileKey);
      ```
   
      > The `fileKey` was decomposed into an array of four 64-bit entries to be passed to `instance.encrypt64`. As output, the `encryptedFileKey`  will contain 4 `Uint8Array` objects, each resulting from calling `instance.encrypt64`.

    - Then, the `encryptedFileKey` is added to the `ciphFile: CiphFile` to create the `encryptedFile: EncryptedFile`
      ```
      encryptedFile <-- (ciphFile|encryptedFileKey). 
      ```
      > For more details on how `CiphFile` and `EncryptedFile` are defined, see [utils.ts](/src/components/Utils/utils.ts).



2. **Storage on IPFS** :
    - `encryptedFile` is uploaded on IPFS , and the `cidHash` (unique IPFS identifier of `encryptedFile`) is retrieved.
      ```javascript 
      const cidHash = await uploadFileToIPFS(encryptedFile);
      ```

      > Pinata (https://www.pinata.cloud/) is a cloud-based service that simplifies uploading and managing files on IPFS. It is used to upload files to IPFS through an API key.

3. **Minting of the NFT** :
    - The _hash_ of the `encryptedFileKey` (`hashedEncryptedFileKey`) is added as metadata of the NFT. 

      ```javascript 
      const hashedEncryptedFileKey = await fileKeyHashing(encryptedFileKey);
      ```
    
      >We could have put all the `encryptedFileKey` as metadata, but this would have costed much more blockchain storage space.
      We will detail later the trick enabling the contract to control acces to `fileKey` despite storing only the hash of the `encryptedFileKey`. 

    - Finally, an NFT (token) is created (or minted) through the contract, with an IPFS reference to the `encryptedFile`.
      ```javascript
      const token = await mintToken(cidHash, hashedEncryptedFileKey);
      ```
      ```javascript 
      const token = await mintToken(cidHash, hashedEncryptedFileKey);
      ```
      > For more details refer to the function  `mintToken(string calldata cidHash, bytes32 encryptedKeyHash)` in [contract.sol](/src/components/Blockchain/contract.sol).
   
      
## II. Management of the NFT

- **Transfer and Burn** :
    - Classical operations such as transfer of ownership, or destruction (burn) of the NFT are possible via the graphical interface.
   
- **Addition and Revocation of Shared-with** :
    - The functions `shareToken` and `revokeTokenAccess` (in [contract.sol](/src/components/Blockchain/contract.sol) and accessible by the graphical interface) enable to add or remove the address of a user (`user`) in the list `sharedAccess[tokenId]` of the _Shared-with_ users, i.e., those having access to the secret content associated to the token (`tokenId`).
  
   
    > To enable a shared-with user to quickly know the tokens that it has access to, these functions also update the lists (`sharedTokens[user]`) of the tokens shared with each user ("user").

    > The graphical interface also enables to revoke, at once, all the shared-with of a given token.

## III. Acces to the secret content by a Shared-with
The function `displayGallery` (in [Gallery.tsx](/src/components/Gallery/Gallery.tsx)) is executed by a user, it returns and displays all the secret contents of the tokens of which it is a _shared-with_.
The function performs automatically all the following steps.

Summarizing, for each secret content (token) for which the user is shared-with, it queries the re-encryption of the `fileKey` under a public encryption key `publicKey` which the user owns.
Then, it decrypts this re-encryption to obtain `fileKey`, downloads the public ciphertext (`ciphFile`) from IPFS and finally decrypts it into `file` using the `fileKey`.

In more detail, the function `displayGallery` automatically performs the following steps for each token in the `ownerTokens[user]` to display the NFTs owned by the user, and in `sharedTokens[user]` for the NFTs with which the user is _shared-with_. For a better user interface, two separate components are created in the gallery. One, managed by `displayMyNFTs`, displays only the owned NFTs; the other, `displaySharedWithMeNFTs`, displays the shared NFTs. These two components can be refreshed separately. The main difference between owned NFTs and shared NFTs is that the latter can only be downloaded; other functionalities are not possible.

1. **Generation of the target public Key for Reencryption** :
    - The user _shared-with_ of a token needs to receive the `fileKey` encrypted under an encryption key `publicKey` which it owns. It thus generates an encryption key pair (unless it has already one associated to the contract) using the function `getSignature(contractAddress, account)`.
  

      > This function is borrowed from [fhevmjs.ts](https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts).

      ```javascript 
       const reencryption = await getSignature(contract.contractAddress, account);
       ```

      > The output of `getSignature` is (`reencryption` : the `publicKey` concatenated with a signature (`signature`) issued by the _shared-with_ on the `publicKey`.
      
   
2. **Reencryption then Decryption of the fileKey** :
    - Reencryption of the `encryptedFileKey` into the encryption key `publicKey`, to obtain `reEncryptedFileKey`.
  
      > The reencryption query to the fhEVM is done by the function :
      ```
      function reencrypt(
        uint256 tokenId,
        bytes[] calldata encryptedFileKey,
        bytes32 publicKey,
        bytes memory signature)
      ``` 
    
      `reencrypt` is defined in [contract.sol](/src/components/Blockchain/contract.sol) and controls the access: it checks that the signer (`signer`) of the public key (`publicKey`) is member of the list (`sharedAccess[tokenId]`) of the shared-with of the token or the owner .

      > Technically, this check is done by the modifier `onlyAuthorizedSigner`. Its implementation is inspired from the official modifier [onlySignedPublicKey](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11). The novelty is that `onlyAuthorizedSigner` allows the msg.sender not to be necessarily the `signer`.
    
      > To maintain security despite this relaxation, `onlyAuthorizedSigner` controls acces on the basis of the `signer` (of the `publicKey`), and not anymore based on the `msg.sender` (as in [balanceOf of the eERC720](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol)). These modifications enable a scalability gain, as explained below in IV.
      
      >  Very important: the  function `reencrypt` also checks that the `encryptedFileKey` is the owner of the token: indeed, otherwise, a _shared-with_ of token1 could get the fileKey2 of token2!.

      > To this end, `reencrypt` compares the hash of the input `encryptedFileKey`, with the hash stored on the contract. This trick enables not to store the (much heavier) `encryptedFileKey` on the blockchain.
      
    - Decryption of `reEncryptedFileKey` with the secret decryption key of the _shared-with_, to obtain the `fileKey`.
  
      > This is done via the call to `instance.decrypt`.
       <!-- Note that the "instance" is not the fhEVM, we are not making a public decryption here. It is instead the local instance of the Shared-with, the one with which it generated its personal "publicKey".` -->
    - Using the `fileKey` to decrypt the `ciphFile`: 
      ```javascript
      const decryptedFile = await decryptFile(encryptedFile, fileKey);
      ```
      (`decryptedFile` <-- `AES-CTR.Decrypt("ciphFile","fileKey")` 
        which is thus equal to the `file` initially uploaded by the Creator.

## IV. Scalability, thanks to Delegation to an untrusted Acces Broker
The _shared-with_ Alice(s) do not necessarily want to create Ethereum accounts, nor to send requests to a contract and spend gaz just to access secret contents.
Our contract enables the use-case that _any_ Bob can call `reencrypt` with a `publicKey` for re-encryption which was generated and signed by Alice.
Hence, Bob can play the role of an Untrusted Acces Broker on behalf of several shared-with Alices, thus improving scalability.

In such a use-case, Bob is _untrusted_ because our function `reencrypt` enables him to obtain only `reEncryptedFileKey`'s encrypted with `publicKeys`'s _signed_ by shared-with Alices.
This proves that these `publicKeys`'s were generated and kept secretly by the Alices, unless they were absent-minded.
As a result, only the shared-with Alices can decrypt the `reEncryptedFileKey`'s obtained by Bob.
To achieve this desirable behavior of our function `reencrypt`, we had to remove the official modifier [onlySignedPublicKey](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
Indeed it imposed that the `publicKey` for reencryption be signed by the msg.sender, whereas, in our use-case, the `msg.sender` is instead Bob.
Our second modification was to control acces, in `reencrypt`, directly based on the `signer` of the `publicKey` (Alice), and not based on the `msg.sender` Bob (as in [`balanceOf` of the eERC720](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol) ). 

Note that our graphical interface does not yet enable such a delegation, it deals only with calls to `reencrypt` made directly by _shared-with_ themselves.

As explained in V. below, we are considering adding, as a bonus, the possibility to hide the identities the _shared-with_.
Only the _shared-with_ effectively querying access to a plaintext content, would lose their anonymity. 
This will be implementable as soon as efficient functions for encrypted arrays will be available in the fhEVM.


## V. Project of improvement: Anonymization of the Shared-with, as soon as encrypted arrays will be released

We are considering adding an optional fonctionality enabling the owner of a token to declare shared-with's under the form of a list (`hiddenSharedWith`) of their encrypted addresses (format `eaddress`).
It is only when a _shared-with_ requests access to a plaintext content `file` that its public request to `reencrypt` makes it lose its anonymity.
We thus need to enrich `reencrypt` so that its tests membership of the public `signer` of the `publicKey`, in the encrypted list (`hiddenSharedWith`).
If it belongs, it is thus that the `signer` was indeed a (previously hidden) shared-with.
Thus, for the arguably majority of Shared-with Alices who do not need to obtain the secret content `file`, their anonymity is préserved.
What blocks us from implementing this addition is that, according to the [documentation](https://docs.zama.ai/fhevm/guides/pitfalls) , it is currently not advised to implement a membership test to a list of ciphertexts.
The reason being that the currently available functions of the fhEVM would require to "loop over all the indexes and check equality homomorphically, however this pattern is very expensive in gas and should be avoided whenever possible."
This documentation announces ("plans to make this kind of operation much more efficient in the future, by adding specialized operators for arrays").
As soon as such a membership operator will be shipped, we will be able to implement anonymization.


## Overview of the Code Implementation
- The smart contract was implemented using [Remix](https://remix.zama.ai/). It has been thoroughly tested to ensure reliability and robustness before being deployed to the Zama Devnet. [contract.ts](/src/components/Blockchain/contract.ts) handles the interactions with the deployed contract.

- To ensure global accessibility of the created instance throughout the application, we utilize the [FhevmContext.tsx](/src/components/Contexts/FhevmContext.tsx). This context management strategy helps maintain state across different components effectively. Additionally, [NFTContext.tsx](/src/components/Contexts/NFTContext.tsx) is created to optimize how NFTs are displayed in the gallery, enhancing the visual presentation and interaction.

- The application also includes a 'How to Work' modal that provides guidance for users, helping them navigate and utilize the application efficiently.

## Running the Application

- Access the application through the following URL: [Link to the Application](https://el-hacen21.github.io/zama_bounty/)

- To run the application locally, follow these steps:
  * Install all necessary packages: `npm install`
  * To start the development server: `npm run dev`
  * To build the application for production: `npm run build`
  
- If you encounter the error ReferenceError: Buffer is not defined, as anticipated by Zama, [here](https://docs.zama.ai/fhevm/guides/webpack), adding the following two lines into [main.tsx](/src/main.tsx) should resolved the issue:
  
  ```javascript 
  import { Buffer as BufferPolyfill } from "buffer/";
  (window as any).Buffer = BufferPolyfill; 
  ```

For more details and alternative solutions, refer to: [Vite Discussion #2785](https://github.com/vitejs/vite/discussions/2785#discussioncomment-1452855).

## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* Smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
  
* Banner image taken from https://www.zama.ai/fhevm
