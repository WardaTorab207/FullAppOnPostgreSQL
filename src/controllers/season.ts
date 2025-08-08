import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Season } from "../entities/season";
import { Series } from "../entities/series";
import {Episode} from "../entities/episode";

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
  },
 getSeasonById : async (req: Request, res: Response) => {
  try {
    const seasonId = parseInt(req.params.id);

    const season = await AppDataSource
      .getRepository(Season)
      .createQueryBuilder("season")
      .where("season.id = :seasonId", { seasonId })
      .getOne();

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    return res.status(200).json({
      message: `Season found for ID ${seasonId}`,
      data: season
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching season", error });
  }
},
 getEpisodesBySeasonId : async (req: Request, res: Response) => {
  try {
    const seasonId = parseInt(req.params.id);

    const episodes = await AppDataSource
      .getRepository(Episode)
      .createQueryBuilder("episode")
      .where("episode.season_id = :seasonId", { seasonId })
      .getMany();

    return res.status(200).json({
      message: `Episodes of Season ID ${seasonId}`,
      data: episodes
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching episodes", error });
  }
},
updateSeason : async (req: Request, res: Response) => {
  try {
    const seasonId = parseInt(req.params.id);
    const updateData = req.body;

    const result = await AppDataSource
      .getRepository(Season)
      .createQueryBuilder()
      .update()
      .set(updateData)
      .where("id = :seasonId", { seasonId })
      .execute();

    if (result.affected === 0) {
      return res.status(404).json({ message: "Season not found or no change" });
    }

    return res.status(200).json({
      message: `Season ID ${seasonId} updated`,
      data: updateData
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating season", error });
  }
},
deleteSeason : async (req: Request, res: Response) => {
  try {
    const seasonId = parseInt(req.params.id);

    const result = await AppDataSource
      .getRepository(Season)
      .createQueryBuilder()
      .delete()
      .where("id = :seasonId", { seasonId })
      .execute();

    if (result.affected === 0) {
      return res.status(404).json({ message: "Season not found" });
    }

    return res.status(200).json({
      message: `Season ID ${seasonId} deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting season", error });
  }
},
};

