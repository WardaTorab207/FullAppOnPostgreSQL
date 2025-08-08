import "reflect-metadata";
import { Router } from "express";
import UserRouter from './user';
import GenreRoutes from'./genre';

const router = Router();

router.use("/users",UserRouter);
router.use("/genres",GenreRoutes);

export default router;
