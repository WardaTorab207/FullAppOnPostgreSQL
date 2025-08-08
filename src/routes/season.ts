import { Router } from "express";
import { SeasonController } from "../controllers/season";

const router = Router();

router.post("/",SeasonController.create);
router.get("/", SeasonController.getAll);
router.get("/:id", SeasonController.getSeasonById);
router.get("/:id/episodes", SeasonController.getEpisodesBySeasonId);
router.patch("/:id", SeasonController.updateSeason);
router.delete("/:id", SeasonController.deleteSeason);

export default router;
