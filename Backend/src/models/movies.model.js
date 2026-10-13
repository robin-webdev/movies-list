import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Action", "Fantasy", "Horror", "Thriller", "SciFi"],
    required: true,
  },
});

export const moviesModel = mongoose.model("movies", movieSchema);
