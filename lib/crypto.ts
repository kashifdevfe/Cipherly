import CryptoJS from 'crypto-js';
import { AlgorithmId, OutputFormat } from './constants';

export const encryptText = (
  text: string,
  key: string,
  algorithm: AlgorithmId,
  format: OutputFormat
): string => {
  if (!text || !key) return '';

  let encrypted;
  switch (algorithm) {
    case 'AES-256':
    case 'AES-128':
      encrypted = CryptoJS.AES.encrypt(text, key);
      break;
    case '3DES':
      encrypted = CryptoJS.TripleDES.encrypt(text, key);
      break;
    case 'DES':
      encrypted = CryptoJS.DES.encrypt(text, key);
      break;
    case 'Rabbit':
      encrypted = CryptoJS.Rabbit.encrypt(text, key);
      break;
    case 'RC4':
      encrypted = CryptoJS.RC4.encrypt(text, key);
      break;
    default:
      throw new Error('Unsupported algorithm');
  }

  if (format === 'Hex') {
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }
  return encrypted.toString(); // Base64 by default
};

export const decryptText = (
  ciphertext: string,
  key: string,
  algorithm: AlgorithmId,
  format: OutputFormat
): string => {
  if (!ciphertext || !key) return '';

  try {
    let input = ciphertext;
    if (format === 'Hex') {
      // If hex, we need to convert it back to a format CryptoJS expects (usually CipherParams or Base64 string)
      // CryptoJS.AES.decrypt can take a hex string if we convert it to lib.CipherParams
      const encryptedHex = CryptoJS.enc.Hex.parse(ciphertext);
      input = CryptoJS.enc.Base64.stringify(encryptedHex);
    }

    let decrypted;
    switch (algorithm) {
      case 'AES-256':
      case 'AES-128':
        decrypted = CryptoJS.AES.decrypt(input, key);
        break;
      case '3DES':
        decrypted = CryptoJS.TripleDES.decrypt(input, key);
        break;
      case 'DES':
        decrypted = CryptoJS.DES.decrypt(input, key);
        break;
      case 'Rabbit':
        decrypted = CryptoJS.Rabbit.decrypt(input, key);
        break;
      case 'RC4':
        decrypted = CryptoJS.RC4.decrypt(input, key);
        break;
      default:
        throw new Error('Unsupported algorithm');
    }

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) throw new Error('Decryption failed. Check your key and algorithm.');
    return result;
  } catch (error) {
    throw new Error('Decryption failed. Check your key and algorithm.');
  }
};
