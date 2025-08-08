// src/controllers/file.controller.ts
import { Request, Response } from "express";
import path from "path";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
