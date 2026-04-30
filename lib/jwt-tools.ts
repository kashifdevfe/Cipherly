import { pemToArrayBuffer } from './rsa-crypto';

export const base64urlEncode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const base64urlDecode = (str: string): string => {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  return decodeURIComponent(escape(atob(b64)));
};

export const getClaimAsDate = (value: number): string => {
  if (!value) return 'N/A';
  return new Date(value * 1000).toLocaleString();
};

export const isTokenExpired = (exp: number): boolean => {
  if (!exp) return false;
  return exp < Math.floor(Date.now() / 1000);
};

export async function signJwt(
  header: any,
  payload: any,
  secretOrPrivate: string,
  algorithm: string
): Promise<string> {
  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);

  let signature: ArrayBuffer;

  if (algorithm.startsWith('HS')) {
    const hash = algorithm === 'HS256' ? 'SHA-256' : algorithm === 'HS384' ? 'SHA-384' : 'SHA-512';
    const keyBytes = new TextEncoder().encode(secretOrPrivate);
    const key = await window.crypto.subtle.importKey(
      'raw',
      new Uint8Array(keyBytes),
      { name: 'HMAC', hash },
      false,
      ['sign']
    );
    signature = await window.crypto.subtle.sign('HMAC', key, new Uint8Array(data));
  } else if (algorithm.startsWith('RS')) {
    const hash = algorithm === 'RS256' ? 'SHA-256' : 'SHA-512';
    const der = pemToArrayBuffer(secretOrPrivate);
    const key = await window.crypto.subtle.importKey(
      'pkcs8',
      new Uint8Array(der),
      { name: 'RSASSA-PKCS1-v1_5', hash },
      false,
      ['sign']
    );
    signature = await window.crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new Uint8Array(data));
  } else {
    throw new Error('Unsupported algorithm');
  }

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

export async function verifyJwt(
  token: string,
  secretOrPublic: string,
  algorithmOverride?: string
): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [headerB64, payloadB64, signatureB64] = parts;
  const header = JSON.parse(base64urlDecode(headerB64));
  const algorithm = algorithmOverride || header.alg;
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  
  let signature: Uint8Array;
  const b64 = signatureB64.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(b64);
  signature = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) signature[i] = binary.charCodeAt(i);

  if (algorithm.startsWith('HS')) {
    const hash = algorithm === 'HS256' ? 'SHA-256' : algorithm === 'HS384' ? 'SHA-384' : 'SHA-512';
    const keyBytes = new TextEncoder().encode(secretOrPublic);
    const key = await window.crypto.subtle.importKey(
      'raw',
      new Uint8Array(keyBytes),
      { name: 'HMAC', hash },
      false,
      ['verify']
    );
    return await window.crypto.subtle.verify('HMAC', key, new Uint8Array(signature), new Uint8Array(data));
  } else if (algorithm.startsWith('RS')) {
    const hash = algorithm === 'RS256' ? 'SHA-256' : 'SHA-512';
    const der = pemToArrayBuffer(secretOrPublic);
    const key = await window.crypto.subtle.importKey(
      'spki',
      new Uint8Array(der),
      { name: 'RSASSA-PKCS1-v1_5', hash },
      false,
      ['verify']
    );
    return await window.crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, new Uint8Array(signature), new Uint8Array(data));
  }

  return false;
}
