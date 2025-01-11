import express from "express";
import twitRoutes from "./twit.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/twit", (req, res) => {
  res.render("pages/twit");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

export default router;
