
import { convertCounterObjectToUint8Array, readFileAsArrayBuffer, arrayBufferToFile, base64ToArrayBuffer, bufferToBase64 } from './other';
import { encryptionAlgorithm } from './keyencrypt'
import axios from 'axios';
import { IPFSConfig } from '../../config';


export interface EncryptedFile {
  encryptedFileData: string;  // Base64 encoded string
  encryptedMetadata: string;  // Base64 encoded string
  encryptionDetails: {
    name: string;
    counter: Uint8Array;  // Base64 encoded string
    length: number;
  };
  encryptionKey: Uint8Array[];
}


export interface DecryptedFileMetaData {
  file: File;
  // name: string;
  // type: string;
}


export async function encryptFile(file: File, key: CryptoKey, encryptedParts: Uint8Array[]): Promise<EncryptedFile> {
  // Define the metadata object
  const metadata = {
    name: file.name,
    type: file.type
  };


  // Convert the metadata object to a string
  const metadataString = JSON.stringify(metadata);

  // Log the object and the string
  console.log("Metadata Object:", metadata);
  console.log("Encoded Metadata as String:", metadataString);

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

    // console.log("Encrypted counter : ", encryptionAlgorithm.counter);

    const encryptedFile = {
      encryptedFileData: bufferToBase64(encryptedFileData),
      encryptedMetadata: bufferToBase64(encryptedMetadata),
      encryptionDetails: { name: encryptionAlgorithm.name, length: encryptionAlgorithm.length, counter: encryptionAlgorithm.counter },
      encryptionKey: encryptedParts
    };

    // console.log("Encryption File  :", encryptedFile);


    return encryptedFile;

  } catch (error) {
    console.error("Encryption failed:", error);
    throw error; // Re-throw the error after logging it
  }
}



export async function decryptFile(encryptedFile: EncryptedFile, key: CryptoKey): Promise<DecryptedFileMetaData> {
  try {
    // Ensure the counter is a Uint8Array
    const counter = convertCounterObjectToUint8Array(encryptedFile.encryptionDetails.counter);


    // Decrypt the data using the provided key and algorithm details
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: encryptedFile.encryptionDetails.name,
        counter: counter, // Now explicitly a BufferSource
        length: encryptedFile.encryptionDetails.length
      },
      key,
      base64ToArrayBuffer(encryptedFile.encryptedFileData)
    );

    const decryptedMetaData = await window.crypto.subtle.decrypt(
      {
        name: encryptedFile.encryptionDetails.name,
        counter: counter,
        length: encryptedFile.encryptionDetails.length
      },
      key,
      base64ToArrayBuffer(encryptedFile.encryptedMetadata)
    );

    // Decode ArrayBuffer back to string
    const decoder = new TextDecoder();
    const decodedMetadataString = decoder.decode(decryptedMetaData);
    const decodedMetadata = JSON.parse(decodedMetadataString);
    return {
      file: arrayBufferToFile(decryptedData, decodedMetadata.name, decodedMetadata.type),
      // name: decodedMetadata.name,
      // type: decodedMetadata.type
    };
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}


export const uploadFileToIPFS = async (encryptedFile: EncryptedFile) => {
  const encryptedFileString = JSON.stringify(encryptedFile);
  const encoder = new TextEncoder();
  const metadataArrayBuffer = encoder.encode(encryptedFileString);

  const formData = new FormData();
  formData.append("file", new Blob([metadataArrayBuffer], { type: 'application/json' }));

  try {
      const response = await fetch(IPFSConfig.apiURL, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`IPFS upload failed: ${response.statusText}`);
      }

      const json = await response.json();
      const hash = json.Hash;
      console.log(`File uploaded to local IPFS with hash: ${hash}`);
      return `${IPFSConfig.gatewayURL}/${hash}`;  // Returns the URL via configured gateway
  } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw error;
  }
};



// Function to fetch encrypted file data using a CID hash
export async function getEncryptedFileFromCidHash(cidHash: string): Promise<EncryptedFile> {
  try {
    const response = await axios.get(cidHash); // Assuming cidHash is the full URL to the resource
    if (response.data) {
      // Assuming the response.data is already in the format of EncryptedFile,
      return response.data as EncryptedFile;
    } else {
      throw new Error("No data returned from the server.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Rethrowing the error to handle it further up the call stack or to notify the user appropriately.
    throw error;
  }
}
