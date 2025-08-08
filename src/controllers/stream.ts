import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Stream } from "../entities/stream";

export const StreamController = {
  // POST /streams
  async createStream(req: Request, res: Response) {
    try {
      const { episodeId, userId, time } = req.body;

      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder()
        .insert()
        .into(Stream)
        .values({
          time,
          episode: { id: episodeId },
          user: { id: userId },
        })
        .execute();

      res.status(201).json({ message: "Stream created", stream });
    } catch (error) {
      res.status(500).json({ message: "Error creating stream", error });
    }
  },

  // GET /streams
  async getAllStreams(req: Request, res: Response) {
    try {
      const streams = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.user", "user")
        .leftJoinAndSelect("stream.episode", "episode")
        .getMany();

      res.json(streams);
    } catch (error) {
      res.status(500).json({ message: "Error fetching streams", error });
    }
  },

  // GET /streams/:id
  async getStreamById(req: Request, res: Response) {
    try {
      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.user", "user")
        .leftJoinAndSelect("stream.episode", "episode")
        .where("stream.id = :id", { id: req.params.id })
        .getOne();

      res.json(stream);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stream", error });
    }
  },

  // GET /streams/:id/episode
  async getStreamEpisode(req: Request, res: Response) {
    try {
      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.episode", "episode")
        .where("stream.id = :id", { id: req.params.id })
        .getOne();

      res.json(stream?.episode);
    } catch (error) {
      res.status(500).json({ message: "Error fetching episode", error });
    }
  },

  // GET /streams/:id/user
  async getStreamUser(req: Request, res: Response) {
    try {
      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.user", "user")
        .where("stream.id = :id", { id: req.params.id })
        .getMany();

      res.json(stream);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  // GET /streams/:id/episode/season
  async getStreamEpisodeSeason(req: Request, res: Response) {
    try {
      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.episode", "episode")
        .leftJoinAndSelect("episode.season", "season")
        .where("stream.id = :id", { id: req.params.id })
        .getMany();

      res.json(stream);
    } catch (error) {
      res.status(500).json({ message: "Error fetching season", error });
    }
  },

  // GET /streams/:id/episode/season/series
  async getStreamEpisodeSeasonSeries(req: Request, res: Response) {
    try {
      const stream = await AppDataSource.getRepository(Stream)
        .createQueryBuilder("stream")
        .leftJoinAndSelect("stream.episode", "episode")
        .leftJoinAndSelect("episode.season", "season")
        .leftJoinAndSelect("season.series", "series")
        .where("stream.id = :id", { id: req.params.id })
        .getMany();

      res.json(stream);
    } catch (error) {
      res.status(500).json({ message: "Error fetching series", error });
    }
  },

 async getStreamEpisodeSeasonSeriesGenre(req: Request, res: Response) {
  try {
    const stream = await AppDataSource.getRepository(Stream)
      .createQueryBuilder("stream")
      .leftJoinAndSelect("stream.episode", "episode")
      .leftJoinAndSelect("episode.season", "season")
      .leftJoinAndSelect("season.series", "series")
      .leftJoinAndSelect("series.genreSeries", "genreSeries")
      .leftJoinAndSelect("genreSeries.genre", "genre")
      .where("stream.id = :id", { id: req.params.id })
      .getMany();

    res.json(stream);
  } catch (error) {
    res.status(500).json({ message: "Error fetching genre from stream", error });
  }
},

  // PATCH /streams/:id
  async updateStream(req: Request, res: Response) {
    try {
      const { time, episodeId, userId } = req.body;

      const result = await AppDataSource.getRepository(Stream)
        .createQueryBuilder()
        .update(Stream)
        .set({
          time,
          episode: episodeId ? { id: episodeId } : undefined,
          user: userId ? { id: userId } : undefined,
        })
        .where("id = :id", { id: req.params.id })
        .execute();

      res.json({ message: "Stream updated", result });
    } catch (error) {
      res.status(500).json({ message: "Error updating stream", error });
    }
  },

  // DELETE /streams/:id
  async deleteStream(req: Request, res: Response) {
    try {
      const result = await AppDataSource.getRepository(Stream)
        .createQueryBuilder()
        .delete()
        .from(Stream)
        .where("id = :id", { id: req.params.id })
        .execute();

      res.json({ message: "Stream deleted", result });
    } catch (error) {
      res.status(500).json({ message: "Error deleting stream", error });
    }
  },
};
