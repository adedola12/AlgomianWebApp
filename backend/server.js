// ---------------------------------------------
//  backend/server.js
// ---------------------------------------------
import express      from "express";
import cors         from "cors";
import cookieParser from "cookie-parser";
import dotenv       from "dotenv";
import connectDB    from "./config/db.js";

import userRoutes                 from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const whitelist = ["http://localhost:5173", "https://algomian-web-app.vercel.app"];
app.use(
  cors({
    origin: whitelist,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
