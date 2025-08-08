import { Router } from "express";
import { StreamController } from "../controllers/stream";

const router = Router();

router.post("/", StreamController.create);
router.get("/", StreamController.getAll);

export default router;
