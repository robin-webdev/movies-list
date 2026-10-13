import cors from "cors";
import express from "express";
import { moviesModel } from "./models/movies.model.js";

const app = express();

app.use(express.json());
app.use(cors());  

app.get("/api/movies", async (req, res) => {
  try {
    const data = await moviesModel.find();
    res.status(200).json({
      message: "Data recieved!",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.post("/api/movies", async (req, res) => {
  if (!req.body) {
    res.status(404).json({
      message: "No body Found!",
    });
    return;
  }
  const { name, year, category } = req.body;
  if (!name || !year || !category) {
    res.status(404).json({
      message: "Name, Year and Category must be send...",
    });
    return;
  }

  try {
    const movie = await moviesModel.create({
      name,
      year,
      category,
    });
    res.status(201).json({
      message: "Movie created successfully!",
      movie,
    });
        } catch (error) {
          res.status(404).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesModel.findByIdAndDelete(id);
    if (!movie) {
      res.status(404).json({
        message: "Movie not found!",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully deleted a movie",
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

app.patch("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, category } = req.body;
    const movie = await moviesModel.findByIdAndUpdate(
      id,
      { name, year, category },
      { new: true, runValidators: true },
    );
    if (!movie) {
      res.status(404).json({
        message: "Movie not found!",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully Updated a movie",
      movie,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request!",
      error,
    });
  }
});

export default app;
