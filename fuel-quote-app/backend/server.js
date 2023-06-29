import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5002;

connectDB();

const app = express();

// Parse raw JSON
app.use(express.json());
// Send form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User routes
app.use("/api/users", userRoutes);

// Quote routes
app.use("/api/quotes", quoteRoutes);

app.get("/", (req, res) => res.send("Server is ready!"));

// Handle errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));