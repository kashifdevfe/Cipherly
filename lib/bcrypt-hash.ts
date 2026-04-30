export async function generateBcryptHash(password: string, costFactor: number): Promise<string> {
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.genSalt(costFactor);
  return await bcrypt.hash(password, salt);
}

export async function verifyBcryptHash(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    return false;
  }
}
