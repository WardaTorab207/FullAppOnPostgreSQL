import { Router } from "express";
import { SeasonController } from "../controllers/season";

const router = Router();

router.post("/",SeasonController.create);
router.get("/", SeasonController.getAll);

export default router;
