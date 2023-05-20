import express from "express"
import { postEvents, deleteEvents, putEvents, getEvents, getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins)
router.get("/performance/:id", getUserPerformance);
router.get("/events/:id", getEvents);
router.post("/events/:id", postEvents);
router.delete("/events/:id", deleteEvents);
router.put("/events/:id", putEvents);

export default router;