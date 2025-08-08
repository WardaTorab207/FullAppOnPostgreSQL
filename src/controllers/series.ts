import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Series } from "../entities/series.js";
import { File } from "../entities/file.js";
import {Season} from "../entities/season";

const seriesRepo = AppDataSource.getRepository(Series);
const fileRepo = AppDataSource.getRepository(File);

export const SeriesController = {
  // POST /series
  async create(req: Request, res: Response) {
    try {
      const { name, description, trailer_id, thumbnail_id } = req.body;
     console.log(name, description, trailer_id, thumbnail_id);
      const trailer = trailer_id ? await fileRepo.findOneBy({ id: trailer_id }) : undefined;
      const thumbnail = thumbnail_id ? await fileRepo.findOneBy({ id: thumbnail_id }) : undefined;

      const series = new Series();
      series.name = name;
      series.description = description;
      if (trailer) series.trailer = trailer;
      if (thumbnail) series.thumbnail = thumbnail;

      const saved = await seriesRepo.save(series);
      res.status(201).json(saved);
    } catch (err) {
      console.error("Error creating series:", err);
      res.status(500).json({ message: "Failed to create series" });
    }
  },

  // GET /series
  async getAll(req: Request, res: Response) {
    try {
      const all = await seriesRepo.find({
        relations: ["trailer", "thumbnail"],
      });
      res.json(all);
    } catch (err) {
      console.error("Error fetching series:", err);
      res.status(500).json({ message: "Failed to fetch series" });
    }
  },

  // GET /series/:id
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const series = await seriesRepo.findOne({
        where: { id: parseInt(id) },
        relations: ["trailer", "thumbnail"],
      });

      if (!series) return res.status(404).json({ message: "Series not found" });

      res.json(series);
    } catch (err) {
      console.error("Error fetching series by ID:", err);
      res.status(500).json({ message: "Failed to fetch series" });
    }
  },

  // PATCH /series/:id
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, trailer_id, thumbnail_id } = req.body;

      const series = await seriesRepo.findOne({ where: { id: parseInt(id) } });
      if (!series) return res.status(404).json({ message: "Series not found" });

      if (name !== undefined) series.name = name;
      if (description !== undefined) series.description = description;

      if (trailer_id !== undefined) {
        const trailer = trailer_id ? await fileRepo.findOneBy({ id: trailer_id }) : undefined;
        series.trailer = trailer ?? null;
      }

      if (thumbnail_id !== undefined) {
        const thumbnail = thumbnail_id ? await fileRepo.findOneBy({ id: thumbnail_id }) : undefined;
        series.thumbnail = thumbnail ?? null;
      }

      const updated = await seriesRepo.save(series);
      res.json(updated);
    } catch (err) {
      console.error("Error updating series:", err);
      res.status(500).json({ message: "Failed to update series" });
    }
  },

  // DELETE /series/:id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const series = await seriesRepo.findOne({ where: { id: parseInt(id) } });

      if (!series) return res.status(404).json({ message: "Series not found" });

      await seriesRepo.remove(series);
      res.json({ message: "Series deleted successfully" });
    } catch (err) {
      console.error("Error deleting series:", err);
      res.status(500).json({ message: "Failed to delete series" });
    }
  },
async getSeasonsBySeriesId(req: Request, res: Response) {
  try {
    const seriesId = parseInt(req.params.id);

    const seasons = await AppDataSource
      .getRepository(Season)
      .createQueryBuilder("season")
      .where("season.seriesId = :seriesId", { seriesId })
      .getMany();

    return res.status(200).json({
      message: `Seasons for Series ID ${seriesId}`,
      data: seasons
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching seasons", error });
  }
},
 async getEpisodesOfSeasonsBySeriesId(req: Request, res: Response) {
  try {
    const seriesId = parseInt(req.params.id);

    const seasons = await AppDataSource
      .getRepository(Season)
      .createQueryBuilder("season")
      .leftJoinAndSelect("season.episodes", "episode")
      .where("season.seriesId = :seriesId", { seriesId })
      .getMany();

    return res.status(200).json({
      message: `Seasons and Episodes for Series ID ${seriesId}`,
      data: seasons
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching seasons and episodes", error });
  }
},
};