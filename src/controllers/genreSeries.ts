import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { GenreSeries } from "../entities/genreSeries";
import { Genre } from "../entities/genre";
import { Series } from "../entities/series";

const genreSeriesRepository = AppDataSource.getRepository(GenreSeries);
const genreRepository = AppDataSource.getRepository(Genre);
const seriesRepository = AppDataSource.getRepository(Series);

export class GenreSeriesController {
   async create(req: Request, res: Response) {
    try {
      const { genreId, seriesId } = req.body;
      console.log(genreId,seriesId);
      const genre = await genreRepository.findOneBy({ id: genreId });
      const series = await seriesRepository.findOneBy({ id: seriesId });
      
      if (!genre ) {
        return res.status(404).json({ message: "Genre not found" });
      }
      if ( !series) {
        return res.status(404).json({ message: "Series not found" });
      }

      const genreSeries = new GenreSeries();
      genreSeries.genre = genre;
      genreSeries.series = series;

      const saved = await genreSeriesRepository.save(genreSeries);

      return res.status(201).json(saved);
    } catch (error : any) {
      return res.status(500).json({ message: error.message });
    }
  }

   async getAll(req: Request, res: Response) {
    try {
      const all = await genreSeriesRepository.find({
        relations: ["genre", "series"]
      });
      return res.status(200).json(all);
    } catch (error : any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
