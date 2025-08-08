import express from "express";
import { EpisodeController } from "../controllers/episode";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("thumbnail"), EpisodeController.create);
router.get("/", EpisodeController.getAll);

export default router;
