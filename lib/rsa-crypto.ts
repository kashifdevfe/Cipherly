export type RsaPadding = 'OAEP-SHA256' | 'OAEP-SHA1' | 'PKCS1v15';

// --- Helpers ---

export const bytesToBase64 = (bytes: Uint8Array): string => {
  const binary = Array.from(bytes)
    .map(b => String.fromCharCode(b))
    .join('');
  return btoa(binary);
};

export const base64ToBytes = (b64: string): Uint8Array => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const arrayBufferToPem = (buffer: ArrayBuffer, type: 'PUBLIC KEY' | 'PRIVATE KEY'): string => {
  const b64 = bytesToBase64(new Uint8Array(buffer));
  const lines = b64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
};

export const pemToArrayBuffer = (pem: string): ArrayBuffer => {
  const b64 = pem
    .replace(/-----BEGIN (?:PUBLIC|PRIVATE) KEY-----/g, '')
    .replace(/-----END (?:PUBLIC|PRIVATE) KEY-----/g, '')
    .replace(/\s/g, '');
  return base64ToBytes(b64).buffer as ArrayBuffer;
};

// --- Logic ---

export const generateRsaKeyPair = async (modulusLength: 512 | 1024 | 2048 | 4096) => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );

  const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKeyBuffer = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKey: arrayBufferToPem(publicKeyBuffer, 'PUBLIC KEY'),
    privateKey: arrayBufferToPem(privateKeyBuffer, 'PRIVATE KEY'),
  };
};

export const encryptRsa = async (
  text: string,
  publicKeyPem: string,
  padding: RsaPadding
): Promise<string> => {
  const data = new TextEncoder().encode(text);
  const der = pemToArrayBuffer(publicKeyPem);

  const hash = padding === 'OAEP-SHA1' ? 'SHA-1' : 'SHA-256';
  
  const key = await window.crypto.subtle.importKey(
    'spki',
    new Uint8Array(der),
    padding === 'PKCS1v15' ? { name: 'RSA-PKCS1-v1_5' } : { name: 'RSA-OAEP', hash },
    false,
    ['encrypt']
  );

  const encrypted = await window.crypto.subtle.encrypt(
    padding === 'PKCS1v15' ? { name: 'RSA-PKCS1-v1_5' } : { name: 'RSA-OAEP' },
    key,
    new Uint8Array(data)
  );

  return bytesToBase64(new Uint8Array(encrypted));
};

export const decryptRsa = async (
  ciphertextB64: string,
  privateKeyPem: string,
  padding: RsaPadding
): Promise<string> => {
  const data = base64ToBytes(ciphertextB64);
  const der = pemToArrayBuffer(privateKeyPem);

  const hash = padding === 'OAEP-SHA1' ? 'SHA-1' : 'SHA-256';

  const key = await window.crypto.subtle.importKey(
    'pkcs8',
    new Uint8Array(der),
    padding === 'PKCS1v15' ? { name: 'RSA-PKCS1-v1_5' } : { name: 'RSA-OAEP', hash },
    false,
    ['decrypt']
  );

  const decrypted = await window.crypto.subtle.decrypt(
    padding === 'PKCS1v15' ? { name: 'RSA-PKCS1-v1_5' } : { name: 'RSA-OAEP' },
    key,
    new Uint8Array(data)
  );

  return new TextDecoder().decode(decrypted);
};
