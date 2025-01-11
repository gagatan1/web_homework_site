import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import registerRoutes from "./routes/register.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/register", registerRoutes);

app.listen(PORT, () =>
  console.log(`server started on port http://localhost:${PORT}`)
);
