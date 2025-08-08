import "reflect-metadata";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Genre } from "../entities/genre";
import { GenreSeries } from "../entities/genreSeries";
import { Season } from "../entities/season";

const genreRepo = AppDataSource.getRepository(Genre);

// GET all genres
export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await genreRepo
      .createQueryBuilder("genre")
      .orderBy("genre.id", "ASC")
      .getMany();

    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: "Error fetching genres" });
  }
};

// GET genre by ID
export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const genre = await genreRepo
      .createQueryBuilder("genre")
      .where("genre.id = :id", { id })
      .getOne();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    res.status(500).json({ message: "Error fetching genre" });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    console.log("Creating genre:", name, description);

    const existing = await genreRepo
      .createQueryBuilder("genre")
      .where("genre.name = :name", { name })
      .getOne();

    if (existing) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const genre = genreRepo.create({ name, description });
    const saved = await genreRepo.save(genre);

    res.status(201).json(saved);
  } catch (err) {
    console.error("💥 Error creating genre:", err);
    res.status(500).json({ message: "Error creating genre", error: err });
  }
};

// UPDATE genre
export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const genre = await genreRepo
      .createQueryBuilder("genre")
      .where("genre.id = :id", { id })
      .getOne();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    genre.name = name ?? genre.name;
    genre.description = description ?? genre.description;

    const updated = await genreRepo.save(genre);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating genre" });
  }
};

// DELETE genre
export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const genre = await genreRepo
      .createQueryBuilder("genre")
      .where("genre.id = :id", { id })
      .getOne();

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    await genreRepo.remove(genre);
    res.json({ message: "Genre deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting genre" });
  }
};

export const getGenreSeries = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  if (isNaN(genreId))
    return res.status(400).json({ message: "Invalid genre ID" });

  try {
    const series = await AppDataSource.getRepository(GenreSeries)
      .createQueryBuilder("genreSeries")
      .leftJoinAndSelect("genreSeries.series", "series")
      .leftJoinAndSelect("series.thumbnail", "thumbnail")
      .where("genreSeries.genreId = :genreId", { genreId })
      .getMany();
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching genre series" });
  }
};

export const getGenreSeriesSeasons = async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  if (isNaN(genreId))
    return res.status(400).json({ message: "Invalid genre ID" });

  try {
    const seasons = await AppDataSource.getRepository(GenreSeries)
      .createQueryBuilder("genreSeries")
      .leftJoinAndSelect("genreSeries.series", "series")
      .leftJoinAndSelect("series.seasons", "season")
      .where("genreSeries.genreId = :genreId", { genreId})
      .getMany();
    res.json(seasons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching genre series seasons" });
  }
};
