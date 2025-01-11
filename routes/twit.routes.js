import express from "express";
import { TwitService } from "../controllers/twit.control.js";

const router = express.Router();

const twistService = new TwitService();
router.post("/", (req, res) => {
  const twit = twistService.createTwit(req.body);
  res.status(201).json(twit);
});
router.get("/", (req, res) => {
  const twit = twistService.createTwit(req.body);
  res.status(201).json(twit);
});

export default router;
