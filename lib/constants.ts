export const ALGORITHMS = [
  {
    id: 'AES-256',
    name: 'AES-256',
    description: 'Advanced Encryption Standard with 256-bit key. Highly secure, recommended for most use cases.',
    keySize: 256,
  },
  {
    id: 'AES-128',
    name: 'AES-128',
    description: 'Advanced Encryption Standard with 128-bit key. Faster but slightly less secure than AES-256.',
    keySize: 128,
  },
  {
    id: '3DES',
    name: 'Triple DES',
    description: 'Triple Data Encryption Standard. Applies DES three times to each data block.',
    keySize: 192,
  },
  {
    id: 'DES',
    name: 'DES',
    description: 'Data Encryption Standard. Legacy algorithm, not recommended for sensitive data.',
    keySize: 64,
  },
  {
    id: 'Rabbit',
    name: 'Rabbit',
    description: 'A high-speed stream cipher.',
    keySize: 128,
  },
  {
    id: 'RC4',
    name: 'RC4',
    description: 'A stream cipher known for its simplicity and speed. Not recommended for modern security.',
    keySize: 128,
  },
] as const;

export type AlgorithmId = typeof ALGORITHMS[number]['id'];

export const OUTPUT_FORMATS = [
  { id: 'Base64', name: 'Base64' },
  { id: 'Hex', name: 'Hex' },
] as const;

export type OutputFormat = typeof OUTPUT_FORMATS[number]['id'];
