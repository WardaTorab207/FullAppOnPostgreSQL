// src/routes/file.routes.ts
import { Router } from "express";
import multer from "multer";
import {FileController}  from "../controllers/file";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/upload", upload.single("file"), FileController.uploadFile);
router.get("/",FileController.getAllFiles);

export default router;
