// Pure JS MD5 Implementation
function md5(string: string) {
  function k(n: number) { return Math.sin(n) * Math.pow(2, 32); }
  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  const s = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  const x: number[] = [];
  const str = unescape(encodeURIComponent(string));
  for (let i = 0; i < str.length; i++) x[i >> 2] |= str.charCodeAt(i) << ((i % 4) << 3);
  x[str.length >> 2] |= 0x80 << ((str.length % 4) << 3);
  x[(((str.length + 8) >> 6) << 4) + 14] = str.length << 3;
  for (let i = 0; i < x.length; i += 16) {
    let aa = a, bb = b, cc = c, dd = d;
    for (let j = 0; j < 64; j++) {
      let f, g;
      if (j < 16) { f = (b & c) | (~b & d); g = j; }
      else if (j < 32) { f = (d & b) | (~d & c); g = (5 * j + 1) % 16; }
      else if (j < 48) { f = b ^ c ^ d; g = (3 * j + 5) % 16; }
      else { f = c ^ (b | ~d); g = (7 * j) % 16; }
      const temp = d;
      d = c;
      c = b;
      b = b + rotateLeft(a + f + (k(j + 1) | 0) + (x[i + g] | 0), s[j]);
      a = temp;
    }
    a += aa; b += bb; c += cc; d += dd;
  }
  return [a, b, c, d].map(v => hex(v)).join('');
}

function hex(n: number) {
  let s = '', v: number;
  for (let i = 0; i < 4; i++) {
    v = (n >> (i * 8)) & 0xff;
    s += v.toString(16).padStart(2, '0');
  }
  return s;
}

function rotateLeft(n: number, s: number) {
  return (n << s) | (n >>> (32 - s));
}

// Web Crypto Hash
export async function generateHash(text: string, algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512', output: 'Hex' | 'Base64' | 'UPPERCASE HEX'): Promise<string> {
  if (algorithm === 'MD5') {
    const hash = md5(text);
    if (output === 'Base64') return btoa(hash.match(/.{1,2}/g)!.map(v => String.fromCharCode(parseInt(v, 16))).join(''));
    if (output === 'UPPERCASE HEX') return hash.toUpperCase();
    return hash;
  }

  const data = new TextEncoder().encode(text);
  const hashBuffer = await window.crypto.subtle.digest(algorithm, new Uint8Array(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  if (output === 'Base64') {
    return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  }
  if (output === 'UPPERCASE HEX') return hashHex.toUpperCase();
  return hashHex;
}

export async function generateFileHash(file: File, algorithm: 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512', onProgress: (p: number) => void): Promise<string> {
  if (algorithm === 'MD5') {
    const buffer = await file.arrayBuffer();
    const str = String.fromCharCode(...new Uint8Array(buffer));
    return md5(str);
  }

  const buffer = await file.arrayBuffer();
  const hashBuffer = await window.crypto.subtle.digest(algorithm, new Uint8Array(buffer));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
