# Documentation du projet NFT pour contrôle d'accès anonyme à du contenu confidentiel

Ce document fournit une vue d'ensemble du processus de création et de gestion de NFTs qui réalisent du contrôle d'accès à des contenus secrets.
La gestion des NFTs est réalisée par le contrat unique /src/components/Blockchain/contract.sol et l'interface graphique Gallery permet d'interagir avec ce contrat et le lieu de stockage des contenus (IPFS).  

Dans la prochaine mise à jour nous pensons ajouter en bonus l'option d'encrypter l'identité des utilisateurs ayant accès à un contenu secret.
Seuls les utilisateurs qui demandent effectivement à lire ce contenu en clair perdront l'anonymat. 

## I. Création d'un NFT à partir d'un contenu secret

En résumé, l'interface graphique fournie par l'API (`Gallery.css` et `Gallery.tsx`) permet à la Créatrice d'un contenu secret (`file`) de réaliser automatiquement les opérations suivantes.
Génération d'une clé symétrique (`fileKey`), encryption de `file` sous cette clé `fileKey` pour donner une ciphertext `ciphFile`.
Puis upload de `ciphFile` sur IPFS, concaténé avec une encryption de la `fileKey` (`encryptedFileKey`) sous la clé publique de l'instance de la fhEVM attachée au contrat.
// _On voit donc que contrôler l'accès au contenu en clair `file` équivaut à contrôler l'accès à la `fileKey`._ 
Enfin, mintage du NFT associé à l'`encryptedFileKey`.
// Le contrat va réaliser le contrôle d'accès à l'`encryptedFileKey`: c'est possible car les miners fhEVM ont le pouvoir de décrypter la `encryptedFileKey` en la `fileKey`, à destination d'une liste de Bénéficiaires accrédités (identifiées par leurs adresses Ethereum).

En détail: La Créatrice d'un contenu secret (`file`) l'uploade dans l'interface. Cet upload appelle `EncryptThenMint` dans Mint.tsx, qui réalise automatiquement toutes les opérations suivantes. 

1. **Encryption du Contenu** :
    - Une clé d'encryption symétrique (`fileKey`) de taille 256bits est générée.
    - Le fichier `file` est encrypté symétriquement pour produire le ciphertext:<br />
    <p align="center"> `ciphFile` <-- AES-CTR.Encrypt(`fileKey`,`file`) </p>
    - Le `fileKey` est chiffrée en un ciphertext: `encryptedFileKey` par l'instance de la fhEVM. // _C'est fait dans la fonction_ `fileKeyEncryption` dans Utils/utils.ts. <br />
   // _Pour des raisons de limitation à 64bits d'input de la fonction encrypt64 de la fhEVM,_ `encryptedFileKey` _se présente sous la forme d'un tableau de 4 cases de 64bits chacune._
    - Ensuite `encryptedFileKey` est ajoutée aux métadonnées du `ciphFile`, pour donner:<br />
      <p align="center"> `encryptedFile` <-- (`ciphFile`|`encryptedFileKey`). </p>

2. **Stockage sur IPFS** :
    - `encryptedFile` est uploadé sur IPFS (pour tester l'application il faut un noeud local ipfs et mettre à jour IPFSConfig dans config.ts ), et le `cidHash` (identifiant unique du fichier sur IPFS) est récupéré et utilisé comme métadonnée essentielle du NFT.

    
    - IPFS Storage via Pinata: Pinata (https://www.pinata.cloud/)  is used to store and manage digital assets on the InterPlanetary File System (IPFS). Pinata is a cloud-based service that provides an easier way to upload and manage files on IPFS, ensuring robust and decentralized storage solutions.


3. **Mintage du NFT** :
    - Un NFT (token) est créé au contrat, contenant `cidHash` comme référence au `encryptedFile`. // _C'est réalisé par la fonction_ `mintToken(cidHash)` _dans_ `contract.ts`. 
    - Le hash de la `encryptedFileKey` est également ajouté comme métadonnée essentielle du NFT. //_On aurait pu mettre toute la `encryptedFileKey` en métadonnée mais ça aurait pris beaucoup plus de place sur la blockchain. On va détailler plus loin l'astuce permettant de contrôler l'accès à 'fileKey' juste avec le hash de la `encryptedFileKey`._
      
## II. Gestion du NFT

- **Transfert et Burn du NFT** :
    - Des opérations classiques telles que le transfert de propriété ou la destruction (burn) du NFT sont possibles via l'interface graphique fournie par l'API.
   
- **Ajout et Révocation de Bénéficiaires** :
    - Les fonctions `shareToken` et `revokeTokenAccess`, permettent d'ajouter ou enlever l'adresse d'un utilisateur (`user`) à la liste `sharedAccess[tokenId]` des utilisateurs ayant accès à un token (`tokenId`).
      Par la suite on appellera ces utilisateurs les _shared-with_ du token. <br />
    // _Ces fonctions se trouvent dans `contract.sol`.
Pour des raisons d'indexation rapide, ces fonctions mettent également à jour la liste (_`sharedTokens[user]`_) des tokens partagés avec_ `user`  <br />
    // _L'interface permet également de révoquer à la fois tous les shared-with d'un token donné._

## III. Accès au contenu en clair par un Shared-with
La fonction `displayGallery` dans Gallery.tsx est exécutée par un Shared-with et permet d'afficher tous les contenus en clair auxquels il a accès.
Elle fait automatiquement toutes les étapes suivantes.
En résumé, pour chaque contenu (token) dont il est shared-with, il demande la ré-encryption de `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
Puis il décrypte cette ré-encryption, obtient `fileKey`, récupère le ciphertext public `ciphFile` sur IPFS et peut donc le déchiffrer vers `file` grâce à la `fileKey`.

En détail:

1. **Génération de la Clé de Réencryption** :
    - Le Shared-with d'un token a besoin de recevoir la `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
      Il commence donc par générer `publicKey`, s'il n'en a pas déjà une associée à ce contrat, grâce à la fonction `getSignature(contractAddress, account)`.<br />
      // _Cette fonction est récupérée de fhevmjs.ts (https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts)._
      // _La syntaxe étrange (getSignature) s'explique par le fait que l'output_ (`reencryption`) _de cette fonction est en fait la_ `publicKey` _concaténée avec une_ `signature` _du Shared-with.
   
2. **Réencryption puis Décryption de la fileKey** :
    - Réencryption de `encryptedFileKey` avec la clé publique `publicKey` pour obtenir `reEncryptedFileKey`.<br />
    // _La demande de ré-encryption à la fhEVM est faite par la fonction_ `reencrypt` _dans_ `contract.sol`. _C'est cette fonction qui contrôle l'accès: elle vérifie que le signataire (`signer`) de la clé `publicKey` de réencryption fait bien partie de la liste des shared-with du token_ (`sharedAccess[tokenId]`).<br />
    // _Techniquement, cette vérification est faite par le modifier `onlyAuthorizedSigner`.
    Son implémentation est largement inspirée du modifier officiel `onlySignedPublicKey` (https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
    La nouveauté est que `onlySignedPublicKey` autorise que le msg.sender ne soit pas forcément le `signer`.
    Pour compenser cette relaxation, `onlyAuthorizedSigner` contrôle l'accès sur la base du `signer` de la `publicKey` de réencryption, et non plus sur la base du `msg.sender` (tel que dans https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol `balanceOf`)
    Ces modifications permettent le gain de scalabilité dans le use-case expliqué ci-dessous en IV._

    - À noter que la  fonction `reencrypt` vérifie que la `encryptedFileKey` est bien celle du token: en effet sinon un shared-with de token1 pourrait obtenir l'accès à token2!.<br />
      //_Pour cela, l'astuce est que `reencrypt` compare le hash de la `encryptedFileKey` passée en input, avec le hash stocké sur le contrat._
      
    - Décryption de `reEncryptedFileKey` avec la secret decryption key du Shared-with, pour obtenir la `fileKey`.<br />
    // _C'est fait par l'appel à_ `instance.decrypt`. _Attention: ici l'_ `instance` _en question n'est pas la fhEVM, sinon la décryption serait publique! C'est l'_ `instance` _locale du Shared-with, celle avec laquelle il a généré sa_ `publicKey` _personnelle._
    - Utilisation de `fileKey` pour décrypter `ciphFile`: <br />
    <p align="center"> `decryptedFile` <-- AES-CTR.Decrypt(`fileKey`,`ciphFile`) </p> 
    qui est égal au `file` uploadé par la Créatrice.

## IV. Bonus de scalabilité, grâce à la Délégation à un untrusted Acces Broker
Les shared-with Alice n'ont pas tous envie de se créer un compte Ethereum et d'envoyer une requête à un contrat chaque fois qu'ils veulent accéder à un contenu.
Notre contrat permet le cas d'usage bonus que _tout_ Bob peut appeler `reencrypt` avec une `publicKey` de ré-encryption générée et signed par Alice.
Ainsi, Bob peut jouer le rôle de Untrusted Acces Broker pour le compte de plusieurs shared-with Alices, ce qui augmente la scalabilité.

Dans ce cas d'usage bonus, Bob est _untrusted_ car notre fonction `reencrypt` ne lui permet que d'obtenir des `reEncryptedFileKey` cryptées avec des clés _signées_ par des shared-with Alices, et donc qui ont été générées par elles.
Ainsi, seules les shared-with Alices peuvent décrypter les `reEncryptedFileKey` obtenues par Bob (sauf si elles ont donné leurs secret decryption keys à Bob, ce qui est bien entendu fortement déconseillé).
Pour arriver à réaliser ce bonus, nous avons dû enlever le modifier officiel `onlySignedPublicKey` (https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11).
En effet il imposait que la `publicKey` de réencryption soit signée par le msg.sender, or, dans notre cas d'usage bonus, le msg.sender est Bob.
Notre deuxième modification a été de contrôler l'accès dans `reencrypt` directement selon le `signer` de la `publicKey` (Alice), et non sur le `msg.sender` Bob (tel que le faisait https://github.com/zama-ai/fhevm/blob/main/examples/EncryptedERC20.sol `balanceOf`). 

À noter que notre interface ne permet pas une telle délégation pour le moment, elle ne gère les appels à `reencrypt` que directement par les shared-with eux-mêmes.

## Pas encore Prêt du côté de l'interface

1. Hidden Shared With en utilisant eadress.. pas encore implémenté non plus.

## Projet d'amélioration: Anonymisation des shared-with

Nous prévoyons d'ajouter une fonctionalité optionnelle permettant à l'owner du NFT de déclarer des "hidden shared-with" sous la forme d'une liste de leurs eaddress.
C'est seulement au moment que le Shared-with a besoin d'accéder au contenu `file` en clair qu'il envoie la requête publique à reencrypt.
Nous allons donc enrichir `reencrypt` pour qu'il teste l'égalité de l'adresse faisant la requête (msg.sender) avec chaque eaddress: s'il y a un match, c'est donc que msg.sender était bien un "hidden shared-with".
Ainsi, pour la grande majorité des shared-with Alices qui n'ont pas réellement besoin d'accéder au contenu `file`, leur anonymat est préservé.


## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* Smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm

* Banner image from taken https://www.zama.ai/fhevm
