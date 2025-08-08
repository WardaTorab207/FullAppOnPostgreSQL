import express from "express";
import { EpisodeController } from "../controllers/episode";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("thumbnail"), EpisodeController.create);
router.get("/", EpisodeController.getAll);
router.get("/:id", EpisodeController.getEpisodeById);
router.get("/:id/streams", EpisodeController.getStreamsByEpisodeId);
router.patch("/:id", EpisodeController.updateEpisodeById);
router.delete("/:id", EpisodeController.deleteEpisodeById);

export default router;
