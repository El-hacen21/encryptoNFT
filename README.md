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
Summarizing, for each secret content (token) for which the user is shared-with, it queries the re-encryption of the `fileKey` under a public encryption key `publicKey` which the user possesses.
Then, it decrypts this re-encryption to obtain `fileKey`, downloads the public ciphertext `ciphFile` from IPFS and finally decrypts it into `file` using the `fileKey`.

En détail:

1. **Génération de la Clé de Réencryption** :
    - Le Shared-with d'un token a besoin de recevoir la `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
      Il commence donc par générer `publicKey`, s'il n'en a pas déjà une associée à ce contrat, grâce à la fonction `getSignature(contractAddress, account)`.<br />
      `// Cette fonction est récupérée de `[fhevmjs.ts](https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts).
      `// La syntaxe étrange ("getSignature") s'explique par le fait que l'output ("reencryption") de cette fonction est en fait la "publicKey" concaténée avec une signature ("signature") du Shared-with sur la "publicKey".`
   
2. **Réencryption puis Décryption de la fileKey** :
    - Réencryption de `encryptedFileKey` avec la clé publique `publicKey` pour obtenir `reEncryptedFileKey`.<br />
    `// La demande de ré-encryption à la fhEVM est faite par la fonction "reencrypt" dans "contract.sol". C'est cette fonction qui contrôle l'accès: elle vérifie que le signataire ("signer") de la clé "publicKey" de réencryption fait bien partie de la liste des shared-with du token ("sharedAccess[tokenId]").`<br /><br />
    `// Techniquement, cette vérification est faite par le modifier "onlyAuthorizedSigner".
    Son implémentation est largement inspirée du modifier officiel `["onlySignedPublicKey"](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
    `La nouveauté est que "onlyAuthorizedSigner" autorise que le msg.sender ne soit pas forcément le "signer".
    To maintain security despite this relaxation, "onlyAuthorizedSigner" contrôle l'accès sur la base du "signer" de la "publicKey" de réencryption (et non plus sur la base du "msg.sender", comme dans la fonction `["balanceOf" du ERC720](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol)`)`
    `Ces modifications permettent le gain de scalabilité dans le use-case expliqué ci-dessous en IV.` <br /><br />
    `// Très important: la  fonction "reencrypt" vérifie également que la "encryptedFileKey" est bien celle du token: en effet sinon un shared-with de token1 pourrait obtenir l'accès à token2!.`<br />
    `// Pour cela, "reencrypt" compare le hash de la "encryptedFileKey" passée en input, avec le hash stocké sur le contrat. Cette astuce permet de ne pas stocker la "encryptedFileKey" sur la blockchain et donc de gagner de la place.`
      
    - Décryption de `reEncryptedFileKey` avec la secret decryption key du Shared-with, pour obtenir la `fileKey`.<br />
    `// C'est fait par l'appel à "instance.decrypt". Attention: ici l' "instance" en question n'est pas la fhEVM, sinon la décryption serait publique! C'est l'instance locale du Shared-with, celle avec laquelle il a généré sa "publicKey" personnelle.`
    - Utilisation de `fileKey` pour décrypter `ciphFile`: <br />
        <p align="center"> "decryptedFile" <-- AES-CTR.Decrypt("fileKey","ciphFile") </p> 
        qui est donc égal au `file` initialement uploadé par la Créatrice.

## IV. Bonus de scalabilité, grâce à la Délégation à un untrusted Acces Broker
Les shared-with Alice n'ont pas tous envie de se créer un compte Ethereum, ni d'envoyer une requête à un contrat en payant du gaz à chaque fois qu'ils veulent accéder à un contenu.
Notre contrat permet le cas d'usage bonus que _tout_ Bob peut appeler `reencrypt` avec une `publicKey` de ré-encryption générée et signed par Alice.
Ainsi, Bob peut jouer le rôle de Untrusted Acces Broker pour le compte de plusieurs shared-with Alices, ce qui augmente la scalabilité.

Dans ce cas d'usage bonus, Bob est _untrusted_ car notre fonction `reencrypt` ne lui permet que d'obtenir des `reEncryptedFileKey` cryptées avec des clés _signées_ par des shared-with Alices, et donc qui ont été générées par elles.
Ainsi, seules les shared-with Alices peuvent décrypter les `reEncryptedFileKey` obtenues par Bob (sauf si elles ont donné leurs secret decryption keys à Bob, ce qui est bien entendu fortement déconseillé).
Pour arriver à réaliser ce bonus, nous avons dû enlever le modifier officiel [`onlySignedPublicKey`](https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
En effet il imposait que la `publicKey` de réencryption soit signée par le msg.sender, or, dans notre cas d'usage bonus, le msg.sender est Bob.
Notre deuxième modification a été de contrôler l'accès dans `reencrypt` directement selon le `signer` de la `publicKey` (Alice), et non sur le `msg.sender` Bob (tel que le faisait [`balanceOf`](https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol) ). 

À noter que notre interface ne permet pas une telle délégation pour le moment, elle ne gère les appels à `reencrypt` que directement par les shared-with eux-mêmes.

## V. Projet d'amélioration: Anonymisation des shared-with, dès que les encrypted arrays seront disponibles

Nous prévoyons d'ajouter une fonctionalité optionnelle permettant à l'owner du NFT de déclarer des shared-with également sous la forme d'une liste (`hiddenSharedWith`) de leurs encrypted addresses (format "eaddress").
C'est seulement au moment que le Shared-with a besoin d'accéder au contenu `file` en clair qu'il envoie la requête publique à reencrypt.
Nous allons donc enrichir `reencrypt` pour qu'il teste l'appartenance de l'adresse faisant la requête (`signer` de la `publicKey`) à la liste (`hiddenSharedWith`): s'il y a appartenance, c'est donc que le `signer` était bien un shared-with.
Ainsi, pour la grande majorité des shared-with Alices qui n'ont pas réellement besoin d'accéder au contenu `file`, leur anonymat est préservé.
Cependant la [documentation](https://docs.zama.ai/fhevm/guides/pitfalls)  déconseille d'implémenter un test d'appartenance à une liste de ciphertexts. La raison est que les fonctions actuelles de la fhevm obligeraient à "loop over all the indexes and check equality homomorphically, however this pattern is very expensive in gas and should be avoided whenever possible."
Cette documentation annonce dans le futur un test d'appartenance efficace à un encrypted array ("there are plans to make this kind of operation much more efficient in the future, by adding specialized operators for arrays").
Dès que ce sera prêt, nous pourrons implémenter cette anonymisation.

## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
* Banner image taken from https://www.zama.ai/fhevm
