# Documentation du projet NFT pour contrôle d'accès à du contenu confidentiel

Ce document fournit une vue d'ensemble du processus de création, de gestion et d'accès aux NFTs qui sécurisent l'accès à des contenus secrets.

## I. Création d'un NFT à partir d'un contenu secret

### Processus de création et d'encryption

1. **Upload et Encryption du Contenu** :
    - La Créatrice uploade un contenu secret (`file`) dans l'interface. Cet upload appelle `EncryptThenMint` dans Mint.tsx, qui réalise automatiquement toutes les opérations suivantes. 
    - Une clé d'encryption symétrique (`fileKey`) est générée.
    - Le fichier est encrypté symétriquement pour produire le ciphertext: ciphFile<--AES-CTR(fileKey,file)
// _Il va être rendu publiquement accessible sur IPFS, donc on voit que contrôler l'accès au contenu en clair_ `file` _équivaut à contrôler l'accès à la_ `fileKey`.
    - Le `fileKey` est chiffrée en un ciphertext: `encryptedFileKey` par l'instance de la fhEVM. // _C'est fait dans la fonction_ `fileKeyEncryption`.
    - Ensuite `encryptedFileKey` est ajoutée aux métadonnées du `ciphFile`, pour donner:
      
      `encryptedFile` <-- (`ciphFile`|`encryptedFileKey`).

2. **Stockage sur IPFS** :
    - `encryptedFile` est uploadé sur IPFS (pour tester l'application if faut un noeud local ipf et mettre à jour IPFSConfig dans config.ts ), et le `cidHash` (identifiant unique du fichier sur IPFS) est récupéré et utilisé comme métadonnée essentielle du NFT.


3. **Mintage du NFT** :
    - Un NFT est un compressé contenant `cidHash` comme référence au `encryptedFile`. La fonction `mintToken(cidHash)` dans `contract.ts` s'occupe de cette opération. 

## II. Gestion du NFT

- **Transfert et Burn du NFT** :
    - Des opérations classiques telles que le transfert de propriété ou la destruction (burn) du NFT sont possibles via l'interface graphique fournie par l'API.

- **Interface Utilisateur** :
    - L'API propose `displayGallery` dans `Gallery.tsx` pour afficher les NFTs possédés par l'utilisateur et les cidHashs des fichiers associés.

- **Ajout de Bénéficiaires** :
    - La fonction `Send` permettra d'envoyer un NFT à un autre compte: pas encore fait!

## III. Accès au contenu en clair par un Bénéficiaire
C'est réalisé automatiquement par la fonction displayGallery dans Gallery.tsx, qui fait toutes les étapes suivantes.
1. **Génération de la Clé Publique** :
    - Le Bénéficiaire a besoin de recevoir `fileKey` sous format chiffré sous une clé qu'il possède.
      Il génère donc une clé publique, appelée `reencryption`, grâce à la fonction `getSignature(contractAddress, account)`, définie dans fhevmjs.ts.
      // Cette syntaxe étrange s'explique par le fait que la clé publique s'accompagne d'une signature sur elle-même, i.e., `reencryption`=(`public key`, `signature`).
    - Enfin il appelle `reencryption` de `encryptedFile` vers sa `public key`.

2. **Processus de Décryption** :
    - Réencryption de `encryptedFileKey` avec la clé publique pour obtenir `reEncryptedFileKey`.
    - Décryption de `reEncryptedFileKey` pour retrouver `fileKey`.
    - Utilisation de `fileKey` pour décrypter `ecryptedFile` et accéder à `decryptedFile` qui contient le contenu en clair.


## Pas encore Prêt du côté de l'interface

1. Affichage des documents partagés : Dans la galerie, je prévois d'ajouter une section pour afficher les documents (NFTs) partagés.

2. Gestion de la révocation d'accès et de la révocation.

## Questions

1. Masquer l'ownership d'une adresse dans un smart contract : Utiliser `mapping(address => uint256[]) private ownerTokens` dans `contract.sol` ne cache pas complètement l'ownership car msg.sender est toujours visible sur la blockchain, et nous ne sommes pas certains que cela résout le problème de suivi de l'ownership des NFTs cryptés. La solution idéale serait d'appliquer un Zero-Knowledge Proof (ZKP) à l'account, mais nous ne sommes pas certains de pouvoir l'implémenter.

2. `instance.getSignature` est appelée dans la galerie pour afficher la liste des NFTs. Serait-il mieux de l'enregistrer localement pour d'autres utilisations ? Auriez-vous des idées ?"


## Credits

* The frontend design of this project was adapted from
https://github.com/judygab/web-dev-projects/tree/main/personal-portfolio

* smart contracts were implemented using TFHE by zama https://github.com/zama-ai/fhevm
