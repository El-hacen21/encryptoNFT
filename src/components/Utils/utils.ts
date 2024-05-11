
import { convertCounterObjectToUint8Array, readFileAsArrayBuffer, arrayBufferToFile, base64ToArrayBuffer, bufferToBase64 } from './other';
import { encryptionAlgorithm } from './keyencrypt'
import axios from 'axios';


export interface CiphFile {
  encryptedFileData: string;  // Base64 encoded string
  encryptedMetadata: string;  // Base64 encoded string
  encryptionAlgorithm: {
    name: string;
    counter: Uint8Array;
    length: number;
  };

}

export interface EncryptedFile extends CiphFile {
  encryptedFileKey: Uint8Array[];  // Array of Uint8Array, each representing a key segment resulting from instance.encrypt64
}

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
    const encryptedFileData = await window.crypto.subtle.encrypt(
      encryptionAlgorithm,
      key,
      arrayBuffer
    );


    // Encrypt the metadata
    const encryptedMetadata = await window.crypto.subtle.encrypt(
      encryptionAlgorithm,
      key,
      metadataArrayBuffer
    );

    // console.log("metadataString", metadataString);

    const encryptedFile: CiphFile = {
      encryptedFileData: bufferToBase64(encryptedFileData),
      encryptedMetadata: bufferToBase64(encryptedMetadata),
      encryptionAlgorithm: { name: encryptionAlgorithm.name, length: encryptionAlgorithm.length, counter: encryptionAlgorithm.counter },
    };


    return encryptedFile;

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
      base64ToArrayBuffer(ciphFile.encryptedFileData)
    );

    const decryptedMetaData = await window.crypto.subtle.decrypt(
      {
        name: ciphFile.encryptionAlgorithm.name,
        counter: counter,
        length: ciphFile.encryptionAlgorithm.length
      },
      key,
      base64ToArrayBuffer(ciphFile.encryptedMetadata)
    );

    // console.log('Encrypted Metadata: ', ciphFile.encryptedMetadata);

    const decodedMetadataString = new TextDecoder().decode(decryptedMetaData);
    // console.log("Decrypted Metadata String:", decodedMetadataString); 

    const decodedMetadata = JSON.parse(decodedMetadataString);

    return {
      file: arrayBufferToFile(decryptedData, decodedMetadata.name, decodedMetadata.type),
    };
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}


export const uploadFileToIPFS = async (encryptedFile:EncryptedFile) => {
  const ipfsApiKey = import.meta.env.VITE_PINATA_API_KEY;
  const PINATA_API_URL="https://api.pinata.cloud/pinning/pinFileToIPFS";

  // Prepare the encrypted file as a JSON string
  const encryptedFileString = JSON.stringify(encryptedFile);
  const encoder = new TextEncoder();
  const metadataArrayBuffer = encoder.encode(encryptedFileString);
  const formData = new FormData();

  // Append the encrypted file as a Blob of type 'application/json'
  formData.append("file", new Blob([metadataArrayBuffer], { type: 'application/json' }));

  const pinataOptions = JSON.stringify({
    cidVersion: 0, 
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    // Make an HTTP POST request to Pinata's pinning service
    const response = await axios.post(PINATA_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${ipfsApiKey}`, 
        'Content-Type': `multipart/form-data;`, 
      }
    });

    if (response.status !== 200) {
      throw new Error(`IPFS upload failed: ${response.statusText}`);
    }

    // Log the response data from Pinata (contains IPFS hash and more)
    console.log('File uploaded to IPFS via Pinata:', response.data);

    // Construct the URL to access the file via an IPFS gateway
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS via Pinata:", error);
    throw error;
  }
};


export async function getEncryptedFileCidHash(cidHash: string): Promise<EncryptedFile> {
  const url = `https://gateway.pinata.cloud/ipfs/${cidHash}`;
  try {
    const response = await axios.get(url);
    if (response.data) {
      return response.data as EncryptedFile;
    } else {
      throw new Error("No data returned from the server.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}


