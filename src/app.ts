import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/", fileRoutes);

app.use(errorHandler);

export default app;
