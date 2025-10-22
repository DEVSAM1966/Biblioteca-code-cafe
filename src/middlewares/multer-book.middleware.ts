import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { isbn } = req.params;
    const isCover = file.fieldname === "bookCover";
    const folder = isCover ? "uploads/cover" : "uploads/file";

    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const { isbn } = req.params;
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeBase = base.replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
    const newName = `${isbn}_${safeBase}${ext}`;
    cb(null, newName);
  },
});

export const uploadBookFiles = multer({ storage });
