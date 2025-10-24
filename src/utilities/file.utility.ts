import fs from "fs/promises";

/**
 * Deletes an array of file paths if they exist.
 * Logs a warning if deletion fails.
 */
export async function deleteUploadedFiles(paths: (string | undefined)[]): Promise<void> {
  for (const path of paths) {
    await deleteIfExists(path);
  }
}

/**
 * Deletes a single file path if it exists.
 * Logs a warning if deletion fails.
 */
export async function deleteIfExists(path: string | undefined | null): Promise<void> {
  if (!path) return;
  try {
    await fs.unlink(path);
  } catch (err) {
    console.warn(`Warning: Could not delete file ${path}: ${err instanceof Error ? err.message : String(err)}`);
  }
}

