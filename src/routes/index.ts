import "reflect-metadata";
import { Router } from "express";
import UserRouter from './user';
import GenreRoutes from'./genre';
import FileRoutes from './file';


const router = Router();


router.use("/users",UserRouter);
router.use("/genres",GenreRoutes);
router.use("/files",FileRoutes);

export default router;
