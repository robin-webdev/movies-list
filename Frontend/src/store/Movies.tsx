import { create } from "zustand";
import axios from "axios";
import type { movieType } from "../types/movie.tsx";

const API_URL = "http://localhost:3000/api/movies";

interface useMovieTypes {
  movies: movieType[];
  fetch: () => Promise<void>;
  add: (movie: movieType) => Promise<void>;
  update: (movie: movieType) => Promise<void>;
  delete: (movie: movieType) => Promise<void>;
}

export const useMovie = create<useMovieTypes>((set, get) => ({
  movies: [],
  fetch: async () => {
    const res = await axios.get(API_URL);
    set({ movies: res.data.data });
  },

  add: async (movie) => {
    await axios.post(API_URL, movie);
    await get().fetch();
  },

  update: async (movie) => {
    await axios.patch(`${API_URL}/${movie._id}`, movie);
    await get().fetch();
  },

  delete: async (movie) => {
    await axios.delete(`${API_URL}/${movie._id}`);
    await get().fetch();
  },
}));
