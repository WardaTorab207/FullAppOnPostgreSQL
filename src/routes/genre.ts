import "reflect-metadata";
import { Router } from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  getGenreSeries,
  getGenreSeriesSeasons
} from "../controllers/genre";

const router = Router();

router.get("/", getAllGenres);
router.get("/:id", getGenreById);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);
router.get('/:id/series', getGenreSeries);
router.get('/:id/series/seasons', getGenreSeriesSeasons);

export default router;
