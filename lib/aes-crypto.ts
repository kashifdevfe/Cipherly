import * as CryptoJS from 'crypto-js';

export type AesMode = 'ECB' | 'CBC' | 'CTR' | 'GCM';

export type PaddingType = 'PKCS5Padding' | 'NoPadding';
export type KeySize = 128 | 192 | 256;
export type FormatType = 'Plain Text' | 'Base64' | 'Hex';

// --- Helpers ---

export const stringToBytes = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

export const bytesToString = (bytes: Uint8Array): string => {
  return new TextDecoder().decode(bytes);
};

export const hexToBytes = (hex: string): Uint8Array => {
  const cleanHex = hex.replace(/\s+/g, '');
  if (cleanHex.length % 2 !== 0) throw new Error('Invalid Hex string');
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
};

export const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const base64ToBytes = (b64: string): Uint8Array => {
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodeFormat = (input: string, format: FormatType): Uint8Array => {
  switch (format) {
    case 'Hex': return hexToBytes(input);
    case 'Base64': return base64ToBytes(input);
    default: return stringToBytes(input);
  }
};

export const encodeFormat = (bytes: Uint8Array, format: FormatType): string => {
  switch (format) {
    case 'Hex': return bytesToHex(bytes);
    case 'Base64': return bytesToBase64(bytes);
    default: return bytesToString(bytes);
  }
};

// --- Logic ---

export const generateRandomBytes = (count: number): Uint8Array => {
  const bytes = new Uint8Array(count);
  window.crypto.getRandomValues(bytes);
  return bytes;
};

export const encryptAes = async (
  data: string,
  keyInput: string,
  keyFormat: FormatType,
  keySize: KeySize,
  mode: AesMode,
  ivInput: string,
  ivFormat: FormatType,
  tagLength: number = 128
): Promise<Uint8Array> => {
  const dataBytes = stringToBytes(data);
  const keyBytes = decodeFormat(keyInput, keyFormat);
  
  if (keyBytes.length !== keySize / 8) {
    throw new Error(`Key must be exactly ${keySize / 8} bytes for AES-${keySize}`);
  }

  if (mode === 'ECB') {
    const keyWA = CryptoJS.enc.Hex.parse(bytesToHex(keyBytes));
    const encrypted = CryptoJS.AES.encrypt(data, keyWA, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return base64ToBytes(encrypted.toString());
  }

  const algorithm: any = { name: `AES-${mode}` };

  const ivBytes = decodeFormat(ivInput, ivFormat);
  if (ivBytes.length !== 16) {
    throw new Error('IV must be exactly 16 bytes (128-bit)');
  }
  algorithm.iv = new Uint8Array(ivBytes);


  if (mode === 'GCM') {
    algorithm.tagLength = tagLength;
  } else if (mode === 'CTR') {
    algorithm.counter = new Uint8Array(algorithm.iv);
    algorithm.length = 64;
    delete algorithm.iv;
  }

  const key = await window.crypto.subtle.importKey(
    'raw',
    new Uint8Array(keyBytes),
    algorithm.name,
    false,
    ['encrypt']
  );

  const encrypted = await window.crypto.subtle.encrypt(
    algorithm,
    key,
    new Uint8Array(dataBytes)
  );

  return new Uint8Array(encrypted);
};

export const decryptAes = async (
  ciphertext: string,
  cipherFormat: FormatType,
  keyInput: string,
  keyFormat: FormatType,
  keySize: KeySize,
  mode: AesMode,
  ivInput: string,
  ivFormat: FormatType,
  tagLength: number = 128
): Promise<Uint8Array> => {
  const cipherBytes = decodeFormat(ciphertext, cipherFormat);
  const keyBytes = decodeFormat(keyInput, keyFormat);

  if (keyBytes.length !== keySize / 8) {
    throw new Error(`Key must be exactly ${keySize / 8} bytes for AES-${keySize}`);
  }

  if (mode === 'ECB') {
    const keyWA = CryptoJS.enc.Hex.parse(bytesToHex(keyBytes));
    const input = cipherFormat === 'Hex' ? bytesToBase64(hexToBytes(ciphertext)) : ciphertext;
    const decrypted = CryptoJS.AES.decrypt(input, keyWA, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) throw new Error('Decryption failed');
    return stringToBytes(result);
  }

  const algorithm: any = { name: `AES-${mode}` };

  const ivBytes = decodeFormat(ivInput, ivFormat);
  if (ivBytes.length !== 16) {
    throw new Error('IV must be exactly 16 bytes (128-bit)');
  }
  algorithm.iv = new Uint8Array(ivBytes);


  if (mode === 'GCM') {
    algorithm.tagLength = tagLength;
  } else if (mode === 'CTR') {
    algorithm.counter = new Uint8Array(algorithm.iv);
    algorithm.length = 64;
    delete algorithm.iv;
  }

  const key = await window.crypto.subtle.importKey(
    'raw',
    new Uint8Array(keyBytes),
    algorithm.name,
    false,
    ['decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    algorithm,
    key,
    new Uint8Array(cipherBytes)
  );

  return new Uint8Array(decrypted);
};
