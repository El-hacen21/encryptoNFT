# fhevmjs-react-template

This is a simple template to show how to use fhevmjs with Vite + React.

## Getting started

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Documentation

For more information about fhevmjs, you can [read the documentation](https://docs.zama.ai/fhevm).



# Documentation du projet NFT pour contenu sécurisé

Ce document fournit une vue d'ensemble du processus de création, de gestion et d'accès aux NFTs qui sécurisent l'accès à des contenus secrets.

## I. Création d'un NFT à partir d'un contenu secret

### Processus de création et d'encryption

1. **Upload et Encryption du Contenu** :
    - La Créatrice upload un contenu secret. `EncryptThenMint` dans Mint.tsx s'exécute automatiquement aprés upload d'un fichier. 
    - Une clé d'encryption symétrique (`fileKey`) est générée.
    - Le `fileKey` est chiffré en plusieurs parties `encryptedFileKey` par l'instance de la fhEVM dans la fonction `fileKeyEncryption`, qui est appliquée après `getSignature(contractAddress, account)`, définie dans fhevmjs.ts. Cette fonction permet de générer des identifiants pour l'instance.
    - Le fichier est encrypté symétriquement pour produire `ciphFile` 
    - Ensuite `encryptedFileKey` est rajouter  dans les  métadonnées  du `ciphFile` pour donner `ecryptedFile`.

2. **Stockage sur IPFS** :
    - `ecryptedFile` est uploadé sur IPFS (pour tester l'application if faut un noued local ipf et mettre à jour IPFSConfig dans config.ts ), et le `cidHash` (identifiant unique du fichier sur IPFS) est récupéré et utilisé comme métadonnée essentielle du NFT.


3. **Mintage du NFT** :
    - Un NFT est un compressé contenant `cidHash` comme référence au `ecryptedFile`. La fonction `mintToken(cidHash)` dans `contract.ts` s'occupe de cette opération. 

## II. Gestion du NFT

- **Transfert et Burn du NFT** :
    - Des opérations classiques telles que le transfert de propriété ou la destruction (burn) du NFT sont possibles via l'interface graphique fournie par l'API.

- **Interface Utilisateur** :
    - L'API propose `displayGallery` dans `Gallery.tsx` pour afficher les NFTs possédés par l'utilisateur et les cidHashs des fichiers associés.

- **Ajout de Bénéficiaires** :
    - La fonction `Send` permettra d'envoyer un NFT à un autre compte: pas encore fait!

## III. Accès au contenu en clair par un Bénéficiaire

1. **Génération de la Clé Publique** :
    - Le Bénéficiaire génère une clé publique (`reencryption`).

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
