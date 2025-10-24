import path from "path";

export function generateSafeFilename(originalName: string, isbn: string): string {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  const safeBase = base.replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
  return `${isbn}_${safeBase}${ext}`;
}
