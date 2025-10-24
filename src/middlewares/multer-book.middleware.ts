import multer from "multer";

type UploadField = "bookCover" | "bookFile";

const allowedMimeTypes: Record<UploadField, string[]> = {
  bookCover: ["image/jpeg", "image/png"],
  bookFile: ["application/pdf", "application/epub+zip"],
};

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const field = file.fieldname as UploadField;
  const isValid = allowedMimeTypes[field]?.includes(file.mimetype);

  if (!isValid) {
    return cb(new Error(`Unsupported file type for '${field}': ${file.mimetype}`));
  }

  cb(null, true);
};

// ✅ Usamos memoryStorage para evitar escritura automática
const storage = multer.memoryStorage();

export const uploadBookFiles = multer({
  storage,
  fileFilter,
}).fields([
  { name: "bookCover", maxCount: 1 },
  { name: "bookFile", maxCount: 1 },
]);
