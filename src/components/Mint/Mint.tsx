
import './Mint.css'
import React, { useState, useEffect } from 'react';
import uploadIcon from "../../assets/img/upload-icon.jpg";
import { useFhevm } from '../Contexts/FhevmContext';
import { mintToken, getAccount } from '../Blockchain/contract'
import { exportCryptoKey, generateKey } from '../Utils/keyencrypt'
import { useNFTs, NFTContent } from '../Contexts/NFTContext';
import { encryptFile, uploadFileToIPFS } from '../Utils/utils'
import { toast } from 'react-toastify'
import { keccak256 } from 'js-sha3';


export const Mint = () => {

  const [fileInfo] = useState({ name: '', status: '' });
  const { instance, createInstance } = useFhevm();
  const { addNFT } = useNFTs();

  const showMintingErrorToast = () => {
    const content = (
      <div>
        Minting the file as an NFT failed. Ensure you are connected and have enough Zama: you acquire Zama from&nbsp;
        <a href="https://faucet.zama.ai/" target="_blank" rel="noopener noreferrer">
          https://faucet.zama.ai/
        </a>.
      </div>
    );

    toast.error(content, {
      autoClose: 10000,
    });
  };

  const EncryptThenMint = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    try {
      const fileKey = await generateKey();

      const account = await getAccount();
      if (!account) throw new Error("Account retrieval failed.");
      if (!instance) throw new Error("Intance retrieval failed.");

      const encryptedFileKey = await fileKeyEncryption(fileKey);
      const ciphFile = await encryptFile(file, fileKey);

      const encryptedFile = { ...ciphFile, encryptedFileKey };

      const cidHash = await uploadFileToIPFS(encryptedFile);

      toast.info("Your file is currently being minted as an NFT. This may take a few moments.");

      const hashedEncryptedFileKey = await fileKeyHashing(encryptedFileKey);
      console.log("hashedEncryptedFileKey:: ", hashedEncryptedFileKey);
      const token = await mintToken(cidHash, hashedEncryptedFileKey);

      if (token) {
        const nftContent: NFTContent = { id: Number(token.tokenId), file: file };
        addNFT(nftContent);
        toast.success("The File has been minted as an NFT and will soon appear in your gallery!");
      }

    } catch (error) {
      console.log("Failed to mint:", error);
      showMintingErrorToast();
    }
  };

  const fileKeyEncryption = async (fileKey: CryptoKey): Promise<Uint8Array[]> => {
    if (!instance) throw new Error("Intance retrieval failed.");
    const encryptedFileKey: Uint8Array[] = [];

    const keySegments = await exportCryptoKey(fileKey);
    for (const segment of keySegments) {
      const encrypted = instance.encrypt64(segment);
      encryptedFileKey.push(encrypted);
    }

    return encryptedFileKey;
  };



  const fileKeyHashing = async (encryptedFileKey: Uint8Array[]): Promise<string> => {
    let concatenatedHashes = '';

    for (const segment of encryptedFileKey) {
      const hashHex = keccak256(segment);
      concatenatedHashes += hashHex;
    }

    // Hash the concatenated hashes to fit into bytes32
    const aggregateHash = '0x' + keccak256(concatenatedHashes);
    return aggregateHash;
  };






  useEffect(() => {
    if (!instance) {
      createInstance().catch(console.error);
    }
  }, [instance, createInstance]);


  return (
    <section className="mint" id="mint">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mint-bx wow zoomIn">
              <h2>Convert Files to NFTs</h2>
              {/* <p>Drag and drop your files here or click to select files to upload.</p> */}
              <div className="file-upload-container">
                <label htmlFor="file-upload-input" className="file-upload-label">
                  <input
                    id="file-upload-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={EncryptThenMint}
                    accept=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .mp4"
                  />
                  <div className="upload-area">
                    <img src={uploadIcon} alt="Upload" className="upload-icon" />
                    <span>Upload Files</span>
                  </div>
                  <div className="file-types-explanation">.jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .mp4</div>
                </label>
                <p className="upload-explanation">The uploaded files are securely and confidentially saved on IPFS and accessible only by you or the people you have shared it with using Zama's fhEVM.</p>
                {fileInfo.status && <p className="file-upload-status">{fileInfo.status}</p>}
                {fileInfo.name && <p className="uploaded-file-info">Name: {fileInfo.name}</p>}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
