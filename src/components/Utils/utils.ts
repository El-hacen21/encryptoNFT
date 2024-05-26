
import { convertCounterObjectToUint8Array, readFileAsArrayBuffer, arrayBufferToFile, base64ToArrayBuffer, bufferToBase64 } from './other';
import { encryptionAlgorithm } from './keyencrypt'
import axios from 'axios';
import { create } from 'ipfs-http-client';


export interface CiphFile {
  ciphFileData: string;  // Base64 encoded string
  ciphFileMetadata: string;  // Base64 encoded string
  encryptionAlgorithm: {
    name: string;
    counter: Uint8Array;
    length: number;
  };
}

// export interface EncryptedFile extends CiphFile {
//   encryptedFileKey: Uint8Array[];  // Array of Uint8Array, each representing a key segment resulting from instance.encrypt64
// }

export interface DecryptedFileMetaData {
  file: File;
}


export async function encryptFile(file: File, key: CryptoKey): Promise<CiphFile> {
  // Define the metadata object
  const metadata = {
    name: file.name,
    type: file.type
  };


  // Convert the metadata object to a string
  const metadataString = JSON.stringify(metadata);


  // Convert the metadata string to an ArrayBuffer
  const encoder = new TextEncoder();
  const metadataArrayBuffer = encoder.encode(metadataString);


  const arrayBuffer = await readFileAsArrayBuffer(file);
  try {
    // Encrypt the file data
    const ciphFileData = await window.crypto.subtle.encrypt(
      encryptionAlgorithm,
      key,
      arrayBuffer
    );


    // Encrypt the metadata
    const ciphFileMetadata = await window.crypto.subtle.encrypt(
      encryptionAlgorithm,
      key,
      metadataArrayBuffer
    );

    // console.log("metadataString", metadataString);

    const ciphFile: CiphFile = {
      ciphFileData: bufferToBase64(ciphFileData),
      ciphFileMetadata: bufferToBase64(ciphFileMetadata),
      encryptionAlgorithm: { name: encryptionAlgorithm.name, length: encryptionAlgorithm.length, counter: encryptionAlgorithm.counter },
    };


    return ciphFile;

  } catch (error) {
    console.error("Encryption failed:", error);
    throw error; // Re-throw the error after logging it
  }
}



export async function decryptFile(ciphFile: CiphFile, key: CryptoKey): Promise<DecryptedFileMetaData> {
  try {
    // Ensure the counter is a Uint8Array
    const counter = convertCounterObjectToUint8Array(ciphFile.encryptionAlgorithm.counter);

    // console.log("Decrypted counter : ", encryptionAlgorithm.counter);
    // Decrypt the data using the provided key and algorithm details
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: ciphFile.encryptionAlgorithm.name,
        counter: counter, // Now explicitly a BufferSource
        length: ciphFile.encryptionAlgorithm.length
      },
      key,
      base64ToArrayBuffer(ciphFile.ciphFileData)
    );

    const decryptedMetaData = await window.crypto.subtle.decrypt(
      {
        name: ciphFile.encryptionAlgorithm.name,
        counter: counter,
        length: ciphFile.encryptionAlgorithm.length
      },
      key,
      base64ToArrayBuffer(ciphFile.ciphFileMetadata)
    );

    const decodedMetadataString = new TextDecoder().decode(decryptedMetaData);
    const decodedMetadata = JSON.parse(decodedMetadataString) as { name: string; type: string };

    return {
      file: arrayBufferToFile(decryptedData, decodedMetadata.name, decodedMetadata.type),
    };
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}


export const uploadFileToIPFS = async (encryptedFile: CiphFile): Promise<string> => {
  // const pinataJWT = import.meta.env.VITE_PINATA_JWT as string;
  const PINATA_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const LOCAL_IPFS_URL = (import.meta.env.VITE_LOCAL_IPFS_API_URL || 'http://localhost:5001') as string;
  const DEDICATED_IPFS_URL = import.meta.env.VITE_DEDICATED_IPFS_URL as string;
  const LOCAL_IPFS_GATEWAY_URL = (import.meta.env.VITE_LOCAL_IPFS_GATEWAY_URL || 'http://localhost:8080') as string;

  const isProduction = import.meta.env.MODE === 'production';

  const encryptedFileString = JSON.stringify(encryptedFile);
  const encoder = new TextEncoder();
  const fileArrayBuffer = encoder.encode(encryptedFileString);
  const formData = new FormData();
  formData.append("file", new Blob([fileArrayBuffer], { type: 'application/json' }));

  if (isProduction) {
    const pinataOptions = JSON.stringify({ cidVersion: 1 });
    formData.append('pinataOptions', pinataOptions);

    const uploadToPinata = async (retries = 3): Promise<string> => {
      try {
        const response = await axios.post<{ IpfsHash: string }>(PINATA_API_URL, formData, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status !== 200) {
          throw new Error(`IPFS upload failed: ${response.statusText}`);
        }

        return `${DEDICATED_IPFS_URL}/ipfs/${response.data.IpfsHash}`;
      } catch (error) {
        console.error("Error uploading to IPFS via Pinata:", error);
        if (retries > 0) {
          console.warn(`Retrying... (${retries} attempts left)`);
          return uploadToPinata(retries - 1);
        }
        throw error;
      }
    };

    return uploadToPinata();
  } else {
    const ipfs = create({ url: LOCAL_IPFS_URL });

    try {
      const result = await ipfs.add(formData.get('file') as Blob);

      if (!result || !result.path) {
        throw new Error('IPFS upload failed');
      }

      return `${LOCAL_IPFS_GATEWAY_URL}/ipfs/${result.path}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }
}



export async function getCiphFileCidHash(cidHash: string): Promise<CiphFile> {

  try {
    const response = await fetch(cidHash, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data as CiphFile;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


