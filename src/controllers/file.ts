// src/controllers/FileController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { File } from "../entities/file";

const fileRepository = AppDataSource.getRepository(File);

export const FileController = {
  uploadFile: async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { filename, path, mimetype, size } = file;

    const fileData = fileRepository.create({
      filename,
      path,
      mimetype,
      size,
    });

    const saved = await fileRepository.save(fileData);

    res.status(201).json({ message: "File uploaded", file: saved });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
},
getAllFiles: async (req: Request, res: Response) => {
    try {
      const files = await fileRepository
        .createQueryBuilder("file")
        .orderBy("file.id", "ASC") // optional: latest files first
        .getMany();

      res.status(200).json({ files });
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ message: "Failed to fetch files" });
    }
  }
};
