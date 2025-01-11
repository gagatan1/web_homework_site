import express from "express";
import { RegistService } from "../controllers/register.control.js";
const router = express.Router();

const registService = new RegistService();
router.get("/", (req, res) => {
  res.render("pages/reg");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await registService.checkIfUserExists(username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await registService.createUser(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});
export default router;
