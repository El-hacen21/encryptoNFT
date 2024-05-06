
import './Mint.css'
import React, { useState, useEffect } from 'react';
import uploadIcon from "../../assets/img/upload-icon.jpg";
import { useFhevm } from '../Contexts/FhevmContext';
import { mintToken } from '../Blockchain/contract'
import { generateKey, exportCryptoKey } from '../Utils/keyencrypt'
import { useNFTs, NFTDetails } from '../Contexts/NFTContext';
import { encryptFile, uploadFileToIPFS } from '../Utils/utils'
import { toast } from 'react-toastify'



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

  const handleFileEncryption = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    try {
      const encKey = await generateKey();
      const encryptedParts = await handleKeyEncryption(encKey);
      const ecryptedFile = await encryptFile(file, encKey, encryptedParts);
      const cidHash = await uploadFileToIPFS(ecryptedFile);

      toast.info("Your file is currently being minted as an NFT. This may take a few moments.");
      const token = await mintToken(cidHash);

      if (token) {
        const nftDetail: NFTDetails = { id: Number(token.tokenId), file: file };
        addNFT(nftDetail);
        toast.success("The File has been minted as an NFT and will soon appear in your gallery!");
      }

    } catch (error) {
      console.log("Failed to mint:", error);
      showMintingErrorToast();
    }
  };



  const handleKeyEncryption = async (encKey: CryptoKey): Promise<Uint8Array[]> => {
    const encryptedParts: Uint8Array[] = [];

    if (!instance) throw new Error("Intance retrieval failed.");

    const keySegments = await exportCryptoKey(encKey);
    for (const segment of keySegments) {
      const encrypted = instance.encrypt32(segment);
      encryptedParts.push(encrypted);
    }

    return encryptedParts;
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
                    onChange={handleFileEncryption}
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
