export function getEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;

  let value = raw.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim();
  }

  return value.length > 0 ? value : undefined;
}

export function requireEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}
