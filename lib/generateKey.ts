export const generateSecureKey = (bits: number): string => {
  const bytes = bits / 8;
  const array = new Uint8Array(bytes);
  window.crypto.getRandomValues(array);
  
  // Convert to hex for a strong, readable secret key
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const checkKeyStrength = (key: string): { strength: 'Weak' | 'Medium' | 'Strong'; color: string; score: number } => {
  if (!key) return { strength: 'Weak', color: 'bg-red-500', score: 0 };
  
  let score = 0;
  if (key.length >= 8) score += 1;
  if (key.length >= 16) score += 1;
  if (/[A-Z]/.test(key)) score += 1;
  if (/[a-z]/.test(key)) score += 1;
  if (/[0-9]/.test(key)) score += 1;
  if (/[^A-Za-z0-9]/.test(key)) score += 1;

  if (score < 3) return { strength: 'Weak', color: 'bg-red-500', score };
  if (score < 5) return { strength: 'Medium', color: 'bg-yellow-500', score };
  return { strength: 'Strong', color: 'bg-green-500', score };
};
