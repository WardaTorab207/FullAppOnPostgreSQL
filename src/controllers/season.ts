import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Season } from "../entities/season";
import { Series } from "../entities/series";

const seasonRepo = AppDataSource.getRepository(Season);
const seriesRepo = AppDataSource.getRepository(Series);

export const SeasonController = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, seriesId } = req.body;
      console.log(req.body);
      const series = await seriesRepo.findOneBy({ id: seriesId });
      if (!series) return res.status(404).json({ message: "Series not found" });

      const season = new Season();
      season.title = title;
      season.description = description;
      season.series = series;

      const saved = await seasonRepo.save(season);
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const seasons = await seasonRepo.find({ relations: ["series"] });
      res.status(200).json(seasons);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
};

