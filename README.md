# Documentation du projet NFT pour contrôle d'accès anonyme à du contenu confidentiel

Ce document fournit une vue d'ensemble du processus de création, de gestion et d'accès aux NFTs qui sécurisent l'accès à des contenus secrets.
La gestion des NFTs est réalisée par le contrat unique /src/components/Blockchain/contract.sol et l'interface graphique Gallery permet d'interagir avec ce contrat et le lieu de stockage des contenus (IPFS).  

Dans la prochaine mise à jour nous pensons ajouter en bonus l'option d'encrypter l'identité des utilisateurs ayant accès à un contenu secret.
Seuls les utilisateurs qui demandent effectivement à lire ce contenu en clair perdront l'anonymat. 

## I. Création d'un NFT à partir d'un contenu secret

En résumé, l'interface graphique fournie par l'API (`Gallery.css` et `Gallery.tsx`) permet à la Créatrice d'un contenu secret (`file`) de réaliser automatiquement les opérations suivantes.
Génération d'une clé symétrique (`fileKey`), encryption de `file` sous cette clé `fileKey` pour donner une ciphertext `ciphFile`.
Puis upload de `ciphFile` sur IPFS, concaténé avec une encryption de la `fileKey` (`encryptedFileKey`) sous la clé publique de l'instance de la fhEVM attachée au contrat.
//_On voit donc que contrôler l'accès au contenu en clair `file` équivaut à contrôler l'accès à la `fileKey`._
Enfin, mintage du NFT associé à l'`encryptedFileKey`.
// Le contrat va réaliser le contrôle d'accès à l'`encryptedFileKey`: c'est possible car les miners fhEVM ont le pouvoir de décrypter la `encryptedFileKey` en la `fileKey`, à destination d'une liste de Bénéficiaires accrédités (identifiées par leurs adresses Ethereum).

En détail: La Créatrice d'un contenu secret (`file`) l'uploade dans l'interface. Cet upload appelle `EncryptThenMint` dans Mint.tsx, qui réalise automatiquement toutes les opérations suivantes. 

1. **Encryption du Contenu** :
    - Une clé d'encryption symétrique (`fileKey`) de taille 256bits est générée.
    - Le fichier `file` est encrypté symétriquement pour produire le ciphertext: `ciphFile` <-- AES-CTR.Encrypt(`fileKey`,`file`)
    - Le `fileKey` est chiffrée en un ciphertext: `encryptedFileKey` par l'instance de la fhEVM. // _C'est fait dans la fonction_ `fileKeyEncryption` dans Utils/utils.ts.
   // _Pour des raisons de limitation à 64bits d'input de la fonction encrypt64 de la fhEVM,_ `encryptedFileKey` _se présente sous la forme d'un tableau de 4 cases de 64bits chacune.
    - Ensuite `encryptedFileKey` est ajoutée aux métadonnées du `ciphFile`, pour donner:
      
      `encryptedFile` <-- (`ciphFile`|`encryptedFileKey`).

2. **Stockage sur IPFS** :
    - `encryptedFile` est uploadé sur IPFS (pour tester l'application il faut un noeud local ipfs et mettre à jour IPFSConfig dans config.ts ), et le `cidHash` (identifiant unique du fichier sur IPFS) est récupéré et utilisé comme métadonnée essentielle du NFT.
    

3. **Mintage du NFT** :
    - Un NFT (token) est créé au contrat, contenant `cidHash` comme référence au `encryptedFile`. // _C'est réalisé par la fonction_ `mintToken(cidHash)` _dans_ `contract.ts`. 
    - Le hash de la `encryptedFileKey` est également ajouté comme métadonnée essentielle du NFT. //_On aurait pu mettre toute la `encryptedFileKey` en métadonnée mais ça aurait pris beaucoup plus de place sur la blockchain. On va détailler plus loin l'astuce permettant de contrôler l'accès à 'fileKey' juste avec le hash de la `encryptedFileKey`._
      
## II. Gestion du NFT

- **Transfert et Burn du NFT** :
    - Des opérations classiques telles que le transfert de propriété ou la destruction (burn) du NFT sont possibles via l'interface graphique fournie par l'API.
   
- **Ajout et Révocation de Bénéficiaires** :
    - Les fonctions `shareToken` et `revokeTokenAccess` (l'interface graphique de cette dernière est en cours de création), permettent d'ajouter ou enlever l'adresse d'un utilisateur (`user`) à la liste `sharedAccess[tokenId]` des utilisateurs ayant accès à un token (`tokenId`).
      Par la suite on appellera ces utilisateurs les _shared-with_ du token.
    // _Ces fonctions se trouvent dans `contract.sol`.
Pour des raisons d'indexation rapide, ces fonctions mettent également à jour la liste (_`sharedTokens[user]`_) des tokens partagés avec_ `user`  

## III. Accès au contenu en clair par un Shared-with
La fonction `displayGallery` dans Gallery.tsx est exécutée par un Shared-with et permet d'afficher tous les contenus en clair auxquels il a accès.
Elle fait automatiquement toutes les étapes suivantes.
En résumé, pour chaque contenu (token) dont il est shared-with, il demande la ré-encryption de `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
Puis il décrypte cette ré-encryption, obtient `fileKey`, récupère le ciphertext public `ciphFile` sur IPFS et peut donc le déchiffrer vers `file` grâce à la `fileKey`.

En détail:

1. **Génération de la Clé de Réencryption** :
    - Le Shared-with d'un token a besoin de recevoir la `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
      Il commence donc par générer `publicKey`, s'il n'en a pas déjà une associée à ce contrat, grâce à la fonction `getSignature(contractAddress, account)`.
      // _Cette fonction est récupérée de fhevmjs.ts (https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts)._
      // _La syntaxe étrange (getSignature) s'explique par le fait que l'output_ (`reencryption`) _de cette fonction est en fait la_ `publicKey` _concaténée avec une_ `signature` _du Shared-with.
   
2. **Réencryption puis Décryption de la fileKey** :
    - Réencryption de `encryptedFileKey` avec la clé publique `publicKey` pour obtenir `reEncryptedFileKey`.
    // _La demande de ré-encryption à la fhEVM est faite par la fonction_ `reencrypt` _dans_ `contract.sol`. _C'est cette fonction qui contrôle l'accès: elle vérifie que le signataire (signer) de la clé `publicKey` de réencryption fait bien partie de la liste des shared-with du token_ (`sharedAccess[tokenId]`).
     _Techniquement elle le fait en deux étapes: d'abord `onlySignedPublicKey` (https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11) vérifie que le signer est égal au msg.sender (cf https://docs.zama.ai/fhevm/guides/pitfalls pour le risque d'usurpation de msg.sender address), puis vérifie que le msg.sender fait partie des shared-with.
Cette fonction vérifie enfin que la `encryptedFileKey` est bien celle du token: en effet sinon un shared-with de token1 pourrait obtenir l'accès à token2!. Pour cela, l'astuce est que `reencrypt` compare le hash de la `encryptedFileKey` passée en input, avec le hash stocké sur le contrat._ 
    - Décryption de `reEncryptedFileKey` avec la secret decryption key du Shared-with, pour obtenir la `fileKey`.
    // _C'est fait par l'appel à_ `instance.decrypt`. _Attention: ici l'_ `instance` _en question n'est pas la fhEVM, sinon la décryption serait publique! C'est l'_ `instance` _locale du Shared-with, celle avec laquelle il a généré sa_ `publicKey` _personnelle._
    - Utilisation de `fileKey` pour décrypter `ciphFile`: `file` <-- AES-CTR.Decrypt(`fileKey`,`ciphFile`) et accéder au contenu en clair (`decryptedFile`, égal au `file` créé par la Créatrice).


## Pas encore Prêt du côté de l'interface

1. Affichage des documents partagés : Dans la galerie, je prévois d'ajouter une section pour afficher les documents (NFTs) partagés.

2. Gestion de la révocation d'accès et de la révocation.

## Projets d'améliorations, merci d'avance pour les commentaires!

1. Anonymisation des shared-with. Nous prévoyons d'ajouter une fonctionalité optionnelle permettant à l'owner du NFT de déclarer des "hidden shared-with" sous la forme d'une liste de leurs eaddress.
C'est seulement au moment que le Shared-with a besoin d'accéder au contenu en clair qu'il envoie la requête publique à reencrypt.
Nous allons donc enrichir `reencrypt` pour qu'il teste l'égalité de l'adresse faisant la requête (msg.sender) avec chaque eaddress: s'il y a un match, c'est donc que msg.sender était bien un "hidden shared-with".
Ainsi, pour la grande majorité des shared-with qui n'ont pas réellement besoin d'accéder au contenu, leur anonymat est préservé.

2. Délégation d'accès à un untrusted broker Bob. Les shared-with n'ont pas tous envie de se créer un compte Ethereum et d'envoyer une requête à un contrat chaque fois qu'ils veulent accéder à un contenu.
Nous prévoyons une amélioration permettant à _tout_ Bob d'appeler `reencrypt` avec une ré-encryption key choisie par Alice. Cependant il faudra donc que `reencrypt` vérifie que la réencryption key est bien signée par Alice.
Pour y arriver, il faudra _affaiblir_ `onlySignedPublicKey` (https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11) en simplement ECDSA.recover, c'est à dire, vérification de la signature et output de l'identité du signer (=Alice).
Puis, au lieu de vérifier que le msg.sender est un shared-with, vérifier que le signer (=Alice) fait bien partie des shared-with du token.
 



## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
