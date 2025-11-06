import fs from 'fs/promises';

export async function deleteUploadedFiles(paths: (string | undefined)[]): Promise<void> {
  for (const path of paths) {
    await deleteIfExists(path);
  }
}

export async function deleteIfExists(path: string | undefined | null): Promise<void> {
  if (!path) return;
  try {
    await fs.unlink(path);
  } catch (err) {
    console.warn(
      `Warning: Could not delete file ${path}: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
