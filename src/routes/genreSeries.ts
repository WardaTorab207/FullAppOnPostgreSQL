import { Router } from "express";
import { GenreSeriesController } from "../controllers/genreSeries";

const router = Router();

router.post("/", GenreSeriesController.create);
router.get("/", GenreSeriesController.getAll);

export default router;
