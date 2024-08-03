import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbconfig.js";
import categoryRouter from "./Router/categoryRouter.js";

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware

app.use(cors());

app.use(express.json());

// Connect to database
connectToMongoDb();

// Routes

app.use("/api/category", categoryRouter);

// Start server
app.listen(PORT, (error) => {
  error
    ? console.log("Error", error)
    : console.log("Server is Running at http://localhost:" + PORT);
});
