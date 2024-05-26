import './Mint.css';
import React, { useState, useEffect, useRef } from 'react';
import uploadIcon from "../../assets/img/upload-icon.jpg";
import { useFhevm } from '../Contexts/useFhevm';
import { mintToken, getAccount } from '../Blockchain/contract';
import { exportCryptoKey, generateKey } from '../Utils/keyencrypt';
import { NFTContent } from '../Contexts/NFTContext';
import { useNFTs } from '../Contexts/useNFTs';
import { encryptFile, uploadFileToIPFS } from '../Utils/utils';
import { toast } from 'react-toastify';

export const Mint = () => {
  const [fileInfo, setFileInfo] = useState({ name: '', status: '' });
  const { instance, createInstance } = useFhevm();
  const { addNFT } = useNFTs();
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input

  const showMintingErrorToast = () => {
    const content = (
      <div>
        Minting the file as an NFT failed. Ensure you have enough Zama: you acquire Zama from&nbsp;
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
    setFileInfo({ name: file.name, status: 'Minting...' });

    try {
      const fileKey = await generateKey();

      const account = await getAccount();
      if (!account) {
        toast.info('Merci de vous connecter pour continuer.');
        setFileInfo({ name: '', status: '' });
        return;
      }
      if (!instance) throw new Error("Instance retrieval failed.");

      const ciphFile = await encryptFile(file, fileKey);

      const encryptedFileKey = await fileKeyEncryption(fileKey);

      const cidHash = await uploadFileToIPFS(ciphFile);

      // toast.info("Your file is currently being minted as an NFT. This may take a few moments.");

      const token = await mintToken(cidHash, encryptedFileKey);

      if (token) {
        const nftContent: NFTContent = { id: Number(token.tokenId), file: file };
        addNFT(nftContent);
        toast.success("The File has been minted as an NFT and will soon appear in your gallery!");
        setFileInfo({ name: file.name, status: 'Minted successfully' });
      }

    } catch (error) {
      console.log("Failed to mint:", error);
      showMintingErrorToast();
      setFileInfo({ name: file.name, status: 'Minting failed' });
    }

    e.target.value = ''; // Clear the file input field

    fileInputRef.current?.blur(); // Blur the file input field to remove focus
  };

  const fileKeyEncryption = async (fileKey: CryptoKey): Promise<Uint8Array[]> => {
    if (!instance) throw new Error("Instance retrieval failed.");
    const encryptedFileKey: Uint8Array[] = [];

    const keySegments = await exportCryptoKey(fileKey);
    for (const segment of keySegments) {
      const encrypted = instance.encrypt64(segment);
      encryptedFileKey.push(encrypted);
    }

    return encryptedFileKey;
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
              <div className="file-upload-container">
                <label htmlFor="file-upload-input" className="file-upload-label">
                  <input
                    id="file-upload-input"
                    ref={fileInputRef} // Attach the ref to the file input
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
                <p className="upload-explanation">
                  The uploaded files are securely and confidentially saved on IPFS and accessible only by you or the people you have shared it with using Zama's fhEVM.
                </p>
                {fileInfo.status && <p className="file-upload-status">{fileInfo.status}</p>}
                {fileInfo.name && <p className="uploaded-file-info">Name: {fileInfo.name}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
