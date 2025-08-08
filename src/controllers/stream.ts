import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Stream } from "../entities/stream";

const streamRepo = AppDataSource.getRepository(Stream);

export const StreamController = {
  create: async (req: Request, res: Response) => {
    try {
      const { episodeId, userId, time } = req.body;

      if (!episodeId || !userId || !time) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const stream = streamRepo.create({
        time,
        episode: { id: parseInt(episodeId) },
        user: { id: parseInt(userId) },
      });

      await streamRepo.save(stream);
      return res.status(201).json(stream);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const streams = await streamRepo.find({
        relations: ["episode", "user"],
      });
      return res.json(streams);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching streams" });
    }
  },
};
