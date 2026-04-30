export const base64Encode = (text: string, urlSafe: boolean = false): string => {
  let b64 = btoa(unescape(encodeURIComponent(text)));
  if (urlSafe) {
    b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  return b64;
};

export const base64Decode = (b64: string): string => {
  let input = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (input.length % 4) input += '=';
  return decodeURIComponent(escape(atob(input)));
};

export async function generateHmac(
  message: string,
  secret: string,
  algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512',
  output: 'Hex' | 'Base64'
): Promise<string> {
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    new Uint8Array(enc.encode(secret)),
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign(
    'HMAC',
    key,
    new Uint8Array(enc.encode(message))
  );

  if (output === 'Hex') {
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } else {
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }
}

export async function verifyHmac(
  message: string,
  secret: string,
  expectedHmac: string,
  algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512',
  outputType: 'Hex' | 'Base64'
): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw',
    new Uint8Array(enc.encode(secret)),
    { name: 'HMAC', hash: algorithm },
    false,
    ['verify']
  );

  let signature: Uint8Array;
  if (outputType === 'Hex') {
    signature = new Uint8Array(expectedHmac.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  } else {
    const binary = atob(expectedHmac);
    signature = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) signature[i] = binary.charCodeAt(i);
  }

  return await window.crypto.subtle.verify(
    'HMAC',
    key,
    new Uint8Array(signature),
    new Uint8Array(enc.encode(message))
  );
}
