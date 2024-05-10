import { Buffer } from 'buffer/';


export async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Ensure the result is indeed an ArrayBuffer
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("File read did not return an ArrayBuffer."));
      }
    };

    reader.onerror = () => {
      // Provide a more descriptive error message by including the error's details
      reject(new Error(`Error reading file: ${reader.error?.message}`));
    };

    reader.onabort = () => {
      reject(new Error("File read was aborted by the user."));
    };

    reader.readAsArrayBuffer(file);
  });
}


/**
 * Converts an ArrayBuffer to a File object.
 * @param buffer The ArrayBuffer to convert.
 * @param filename The name of the resulting file.
 * @param mimeType The MIME type of the file.
 * @returns A File object.
 */
export function arrayBufferToFile(buffer: ArrayBuffer, filename: string, mimeType: string): File {
  // Create a new Blob from the ArrayBuffer
  const blob = new Blob([buffer], { type: mimeType });

  // Create a file from the Blob
  const file = new File([blob], filename, { type: mimeType });

  return file;
}


export function bigIntsToBuffer(bigInts: bigint[]): ArrayBuffer {
  // Each 64-bit integer needs 8 bytes
  const buffer = new ArrayBuffer(bigInts.length * 8);
  const view = new DataView(buffer);

  bigInts.forEach((bigint, index) => {
    // Set each bigint as a 64-bit integer; assuming little-endian format
    view.setBigInt64(index * 8, bigint, true);
  });

  return buffer;
}




export function concatenateUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  let result = new Uint8Array(totalLength);
  let length = 0;
  arrays.forEach(array => {
    result.set(array, length);
    length += array.length;
  });
  return result;
}

export function uint8ArrayToHex(array: Uint8Array): string {
  return '0x' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function convertCounterObjectToUint8Array(counterObject: { [index: number]: number }): Uint8Array {
  // Determine the length of the resulting array.
  const arrayLength = Object.keys(counterObject).length;
  const counterArray = new Uint8Array(arrayLength);

  // Iterate over each key in the object and populate the Uint8Array.
  Object.entries(counterObject).forEach(([key, value]) => {
    counterArray[parseInt(key)] = value;
  });

  return counterArray;
}


export function bufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString('base64');
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const buffer = Buffer.from(base64, 'base64');
  return new Uint8Array(buffer).buffer;  // Ensure that the conversion maintains the type
}

export const serializeUint8ArrayToBase64 = (arrayOfUint8Array: Uint8Array[]): string[] => {
  return arrayOfUint8Array.map(uintArray => bufferToBase64(uintArray.buffer));
};

export const deserializeBase64ToUint8Array = (base64Array?: string[]): Uint8Array[] => {
  if (!base64Array || !Array.isArray(base64Array)) {
    console.error("Invalid or undefined base64Array provided.");
    return [];
  }

  return base64Array.map(base64 => new Uint8Array(base64ToArrayBuffer(base64)));
};


export const deserializeEncryptedKeyParts = (encryptedKeys: any[]): Uint8Array[] => {
  return encryptedKeys.map(convertCounterObjectToUint8Array);
};

