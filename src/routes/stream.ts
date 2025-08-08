import { Router } from "express";
import { StreamController } from "../controllers/stream";

const router = Router();
router.post('/', StreamController.createStream);
router.get('/', StreamController.getAllStreams);
router.get('/:id', StreamController.getStreamById);
router.patch('/:id', StreamController.updateStream);
router.delete('/:id', StreamController.deleteStream);

// Deep nested relational routes
router.get('/:id/episode', StreamController.getStreamEpisode);
router.get('/:id/user', StreamController.getStreamUser);
router.get('/:id/episode/season', StreamController.getStreamEpisodeSeason);
router.get('/:id/episode/season/series', StreamController.getStreamEpisodeSeasonSeries);
router.get('/:id/episode/season/series/genre', StreamController.getStreamEpisodeSeasonSeriesGenre);


export default router;
