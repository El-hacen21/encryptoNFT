
import { bigIntsToBuffer } from './other';

// Prepare the encryption encryptionAlgorithm specifications
export const encryptionAlgorithm = {
  name: "AES-CTR",
  length: 128,  // This specifies the size of the counter block in bits
  counter: window.crypto.getRandomValues(new Uint8Array(16)) // AES-CTR uses a 16-byte counter

};

// encryptionAlgorithm specification for generating an AES key
const keyAlgorithm = {
  name: "AES-CTR",
  length: 256,  // Specifies the length of the key in bits
};


export async function generateKey() {
  const key = await window.crypto.subtle.generateKey(
    keyAlgorithm,
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}



export async function importCryptoKey(bigIntKeys: bigint[], keyUsages: KeyUsage[] = ["encrypt", "decrypt"]): Promise<CryptoKey> {
  const buffer = bigIntsToBuffer(bigIntKeys);

  const key = await window.crypto.subtle.importKey(
    "raw",
    buffer,
    keyAlgorithm,
    false, // false if key does not need to be exported
    keyUsages
  );

  return key;
}



export async function exportCryptoKey(key: CryptoKey): Promise<bigint[]> {
  // Ensure the key can be exported in the desired format
  const exported = await window.crypto.subtle.exportKey("raw", key);
  const buffer = exported as ArrayBuffer;

  // Check that the key length matches the expected size (256 bits, or 32 bytes)
  if (buffer.byteLength !== 32) {
    throw new Error("Expected key size of 256 bits.");
  }

  // Convert the buffer to a BigInt64Array
  const bigInt64Array = new BigInt64Array(buffer);
  // Convert the BigInt64Array to a regular array of BigInts
  const bigIntKeys = Array.from(bigInt64Array);

  return bigIntKeys; // Returns an array of four 64-bit BigInts
}


