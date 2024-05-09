# Documentation du projet NFT pour contrôle d'accès à du contenu confidentiel

Ce document fournit une vue d'ensemble du processus de création, de gestion et d'accès aux NFTs qui sécurisent l'accès à des contenus secrets.

## I. Création d'un NFT à partir d'un contenu secret

En résumé, l'interface graphique fournie par l'API (`Gallery.css` et `Gallery.tsx`) permet à la Créatrice d'un contenu secret (`file`) de faire automatiquement les opérations suivantes.
Génération d'une clé symétrique (`fileKey`), encryption de `file` sous cette clé `fileKey` pour donner une ciphertext `ciphFile`.
Puis upload de `ciphFile` sur IPFS, concaténé avec une encryption de la `fileKey` (`encryptedFileKey`) sous la clé publique de l'instance de fhEVM.
On voit donc que contrôler l'accès au contenu en clair `file` équivaut à contrôler l'accès à la `fileKey`.
La fhEVM va réaliser ce contrôle car elle a le pouvoir de décrypter la `encryptedFileKey` en la `fileKey`, à destination d'une liste de personnes accréditées (techniquement: identifiées par leurs clés publiques de reencryption).
La règles d'accès sont régies par un contrat de type NFT que crée automatiquement l'interface.

1. **Détail de l'Upload et Encryption du Contenu** :
    - La Créatrice uploade un contenu secret (`file`) dans l'interface. Cet upload appelle `EncryptThenMint` dans Mint.tsx, qui réalise automatiquement toutes les opérations suivantes. 
    - Une clé d'encryption symétrique (`fileKey`) de taille 256bits est générée.
    - Le fichier est encrypté symétriquement pour produire le ciphertext: `ciphFile` <-- AES-CTR.Encrypt(`fileKey`,`file`)
    - Le `fileKey` est chiffrée en un ciphertext: `encryptedFileKey` par l'instance de la fhEVM. // _C'est fait dans la fonction_ `fileKeyEncryption` dans Utils/utils.ts.
   // _Pour des raisons de limitation à 32bits d'input de la fonction encrypt32 de la fhEVM,_ `encryptedFileKey` _se présente sous la forme d'un tableau de 8 cases de 32bits chacune.
Nous prévoyons de passer à 4 cases de 64bits grâce à la dernière version fhEVM 0.5._
    - Ensuite `encryptedFileKey` est ajoutée aux métadonnées du `ciphFile`, pour donner:
      
      `encryptedFile` <-- (`ciphFile`|`encryptedFileKey`).

2. **Stockage sur IPFS** :
    - `encryptedFile` est uploadé sur IPFS (pour tester l'application if faut un noeud local ipf et mettre à jour IPFSConfig dans config.ts ), et le `cidHash` (identifiant unique du fichier sur IPFS) est récupéré et utilisé comme métadonnée essentielle du NFT.


3. **Mintage du NFT** :
    - Un NFT est créé, contenant `cidHash` comme référence au `encryptedFile`. // _C'est réalisé par la fonction_ `mintToken(cidHash)` _dans_ `contract.ts`. 

## II. Gestion du NFT

- **Transfert et Burn du NFT** :
    - Des opérations classiques telles que le transfert de propriété ou la destruction (burn) du NFT sont possibles via l'interface graphique fournie par l'API.

- **Interface Utilisateur** :
    - L'API propose `displayGallery` dans `Gallery.tsx` pour afficher les NFTs possédés par l'utilisateur et les cidHashs des fichiers associés.

- **Ajout et Révocation de Bénéficiaires** :
    - Les fonctions `shareToken` et `revokeTokenAccess` (l'interface graphique de cette dernière est en cours de création), permettent d'ajouter ou enlever l'adresse d'un utilisateur (`user`) à la liste `sharedAccess[tokenId]` des bénéficiaires d'un token (`tokenId`).
    // _Elles se trouvent dans `contract.sol`.
Pour des raisons d'indexation rapide, ces fonctions mettent également à jour la liste (_`sharedTokens[user]`_) des tokens partagés avec_ `user`  

## III. Accès au contenu en clair par un Bénéficiaire
La fonction displayGallery dans Gallery.tsx est exécutée par un Bénéficiaire et permet d'afficher tous les contenus en clair auxquels il à accès.
Elle fait automatiquement toutes les étapes suivantes.
En résumé, pour chaque contenu (token) dont il est Bénéficiaire, il demande la ré-encryption de `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
Puis il décrypte cette ré-encryption, obtient `fileKey`, récupère le ciphertext public `ciphFile` sur IPFS et peut donc le déchiffrer vers `file` grâce à la `fileKey`.
En détail:

1. **Génération de la Clé Publique** :
    - Le Bénéficiaire a besoin de recevoir `fileKey` sous format chiffré sous une clé d'encryption `publicKey` qu'il possède.
      Il commence donc par générer `publicKey`, s'il n'en a pas déjà une associée à ce contrat, grâce à la fonction `getSignature(contractAddress, account)`.
      // _Cette fonction est récupérée de fhevmjs.ts (https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts)._
      // _La syntaxe étrange (getSignature) s'explique par le fait que l'output_ (`reencryption`) _de cette fonction est en fait la_ `publicKey` _concaténée avec une_ `signature` _de Bénéficiaire. Cf 3. Obstacles ci-dessous pour des commentaires sur l'implémentation actuelle de_ `getSignature`.
      // _Nous n'utilisons actuellement pas la signature pour contrôler l'accès, car nous contrôlons directement le user qui appelle la réencryption, mais prévoyons dans le futur de contrôler l'accès via la signature._
    - [À FINIR] Puis  il appelle `reEncryptedFileKey` `reencryption` de `encryptedFile` vers sa `publicKey`.

2. **Processus de Décryption** :
    - Réencryption de `encryptedFileKey` avec la clé publique `publicKey` pour obtenir `reEncryptedFileKey`.
    // _La demande de ré-encryption à la fhEVM est faite par la fonction_ `tokenOf` _dans_ `contract.sol`. _C'est cette fonction qui contrôle l'accès: elle vérifie que l'utilisateur qui l'appelle_ (`msg.sender`) _fait partie de la liste des bénéficiaires_ (`sharedAccess[tokenId]`).
    - Décryption de `reEncryptedFileKey` avec la secret decryption key du Bénéficiaire pour obtenir la `fileKey`.
    // _C'est fait par l'appel à_ `instance.decrypt`. _Attention: ici l'_ `instance` _en question n'est pas la fhEVM, sinon la décryption serait publique! C'est l'_ `instance` _locale du Bénéficiaire, celle avec laquelle il a généré sa_ `publicKey` _personnelle._
    - Utilisation de `fileKey` pour décrypter `ciphFile`: `file` <-- AES-CTR.Decrypt(`fileKey`,`ciphFile`) et accéder au contenu en clair (`decryptedFile`, égal au `file` créé par la Créatrice).


## Pas encore Prêt du côté de l'interface

1. Affichage des documents partagés : Dans la galerie, je prévois d'ajouter une section pour afficher les documents (NFTs) partagés.

2. Gestion de la révocation d'accès et de la révocation.

## Projets d'améliorations et obstacles, merci d'avance pour les commentaires!

1. Anonymisation des Bénéficiaires. Nous prévoyons d'ajouter une fonctionalité optionnelle permettant à l'owner du NFT de déclarer des "hidden Bénéficiaires" sous la forme d'une liste de leurs eaddress.
C'est seulement au moment que le Bénéficiaire a besoin d'accéder au contenu en clair qu'il envoie la requête publique à tokenOf.
Nous allons donc enrichir tokenOf pour qu'il teste l'égalité de l'adresse faisant la requête (msg.sender) avec chaque eaddress: s'il y a un match, c'est donc que msg.sender était bien un "hidden Bénéficiaire".
Ainsi, pour la grande majorité des Bénéficiaires qui n'ont pas réellement besoin d'accéder au contenu, leur anonymat est préservé.

2. Délégation d'accès à un untrusted broker Bob. Les Bénéficiaires n'ont pas tous envie de se créer un compte Ethereum et d'envoyer une requête à un contrat chaque fois qu'ils veulent accéder à un contenu.
Nous prévoyons une amélioration permettant à _tout_ Bob d'appeler tokenOf avec une ré-encryption key choisie par Alice. Cependant il faudra donc que tokenOf vérifie que la réencryption key est bien signée par Alice.
Or, nous avons identifié deux gaps dans le SDK actuel avant de pouvoir arriver à une telle vérification. 

3. Un premier gap. L'implémentation actuelle de la fonctionalité de réencryption ne fait pas la vérification que la signature est valide sur la `publicKey`.
En détail (cf https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/docs/guides/reencryption.md?plain=1#L16): le modifier `onlySignedPublicKey` (https://github.com/zama-ai/fhevm/blob/d7783378e1e035cd02b4c913d8537e68205ff215/abstracts/Reencrypt.sol#L11) appelle juste la fontion ECDSA.recover , dont le travail est juste d'extraire le signer et de vérifier que la signature est au bon format (mais pas forcément valide sur la `publicKey`).
Donc par exemple, ce modifier en l'état accepterait une signature de Bénéficiaire sur n'importe quelle string (au format des `params`, cf ci-dessous).

4. Un deuxième gap. L'implémentation actuelle de `getSignature` (telle que dans https://github.com/zama-ai/fhevm-react-template/blob/main/src/fhevmjs.ts) ne semble en fait pas signer la `publicKey`, mais seulement des métadonnées (`params`).
Une solution rapide à ce deuxième gap semblerait de remplacer la ligne 32 par: const signature: string = await window.ethereum.request({ method: 'eth_signTypedData_v4', publicKey }).
 
5. `instance.getSignature` est appelée dans la galerie pour afficher la liste des NFTs. Serait-il mieux de l'enregistrer localement pour d'autres utilisations ? Auriez-vous des idées ?"



## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
