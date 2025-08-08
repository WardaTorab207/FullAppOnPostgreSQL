import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Episode } from "../entities/episode";
import { File } from "../entities/file";
import { Season } from "../entities/season";
import {Stream } from "../entities/stream";

const episodeRepo = AppDataSource.getRepository(Episode);
const fileRepo = AppDataSource.getRepository(File);
const seasonRepo = AppDataSource.getRepository(Season);

const streamRepository = AppDataSource.getRepository(Stream);

export const EpisodeController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, seasonId, thumbnailId } = req.body;
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
        thumbnail: thumbnailId,
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

async getEpisodeById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const episode = await episodeRepo
        .createQueryBuilder("episode")
        .where("episode.id = :id", { id })
        .getOne();

      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }

      res.json({ episode });
    } catch (error) {
      res.status(500).json({ message: "Error fetching episode", error });
    }
  },

  // 2. GET /episodes/:id/streams
  async getStreamsByEpisodeId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const streams = await streamRepository
        .createQueryBuilder("stream")
        .where("stream.episode_id = :id", { id })
        .getMany();

      res.json({ streams });
    } catch (error) {
      res.status(500).json({ message: "Error fetching streams", error });
    }
  },

  // 3. PATCH /episodes/:id
  async updateEpisodeById(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      const episode = await episodeRepo.findOneBy({ id: Number(id) });

      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }

      await episodeRepo.update(id, data);
      const updated = await episodeRepo.findOneBy({ id: Number(id) });

      res.json({ message: "Episode updated", episode: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating episode", error });
    }
  },

  // 4. DELETE /episodes/:id
  async deleteEpisodeById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const episode = await episodeRepo.findOneBy({ id: Number(id) });

      if (!episode) {
        return res.status(404).json({ message: "Episode not found" });
      }

      await episodeRepo.remove(episode);
      res.json({ message: "Episode deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting episode", error });
    }
  },

};

