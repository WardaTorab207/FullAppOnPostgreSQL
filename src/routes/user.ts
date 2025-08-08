import "reflect-metadata";
import { Router } from "express";
import {userController} from "../controllers/user";

const router = Router();

router.get("/", userController.getAllUsers);           
router.get("/:id", userController.getUserById);        
router.post("/", userController.createUser);           
router.put("/:id", userController.updateUser);        
router.delete("/:id", userController.deleteUser);    
router.get('/:id/streams', userController.getUserStreams);
router.get('/:id/streams/episode', userController.getUserStreamEpisodes);  

export default router;
