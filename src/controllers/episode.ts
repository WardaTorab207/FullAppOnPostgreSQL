import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Episode } from "../entities/episode";
import { File } from "../entities/file";
import { Season } from "../entities/season";

const episodeRepo = AppDataSource.getRepository(Episode);
const fileRepo = AppDataSource.getRepository(File);
const seasonRepo = AppDataSource.getRepository(Season);

export const EpisodeController = {
create: async (req: Request, res: Response) => {
  try {
    const { name, description, seasonId,thumbnailId } = req.body;
    console.log(req.body);
    const season = await seasonRepo.findOneBy({ id: parseInt(seasonId) });
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    const file = await fileRepo.findOneBy({ id: parseInt(thumbnailId) });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }


    // Episode create
    const episode = episodeRepo.create({
      name,
      description,
      season,
      thumbnail: thumbnailId
    });

    const savedEpisode = await episodeRepo.save(episode);
    res.status(201).json(savedEpisode);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
},


  getAll: async (req: Request, res: Response) => {
    try {
      const episodes = await episodeRepo.find({
        relations: ["season", "season.series", "thumbnail"],
      });
      res.status(200).json(episodes);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
