import "reflect-metadata";
import { Router } from "express";
import UserRouter from './user';
import GenreRoutes from'./genre';
import FileRoutes from './file';
import SeriesRoutes from './series';
import GenreSeriesRoutes from './genreSeries';
import SeasonRoutes from './season';
import EpisodeRoutes from './episode';
import StreamRoutes from './stream';


const router = Router();


router.use("/users",UserRouter);
router.use("/genres",GenreRoutes);
router.use("/files",FileRoutes);
router.use("/series",SeriesRoutes);
router.use("/genreSeries",GenreSeriesRoutes);
router.use("/seasons",SeasonRoutes);
router.use("/episodes",EpisodeRoutes);
router.use("/streams",StreamRoutes);

export default router;
