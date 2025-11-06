import multer from 'multer';
import path from 'path';
import fs from 'fs';

type UploadField = 'bookCover' | 'bookFile';

const allowedMimeTypes: Record<UploadField, string[]> = {
  bookCover: ['image/jpeg', 'image/png'],
  bookFile: ['application/pdf', 'application/epub+zip'],
};

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  const field = file.fieldname as UploadField;
  const isValid = allowedMimeTypes[field]?.includes(file.mimetype);

  if (!isValid) {
    return cb(new Error(`Unsupported file type for '${field}': ${file.mimetype}`));
  }

  cb(null, true);
};

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { isbn } = req.params;
    const isCover = file.fieldname === 'bookCover';
    const folder = isCover ? 'uploads/cover' : 'uploads/file';

    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const { isbn } = req.params;
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeBase = base.replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    const newName = `${isbn}_${safeBase}${ext}`;
    cb(null, newName);
  },
});

export const uploadBookFiles = multer({
  storage,
  fileFilter,
}).fields([
  { name: 'bookCover', maxCount: 1 },
  { name: 'bookFile', maxCount: 1 },
]);
