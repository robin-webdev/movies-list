import { useEffect, useState } from "react";
import { useMovie } from "../store/Movies.tsx";
import Form from "./Form.tsx";
import type { movieType } from "../types/movie.tsx";

const colors = {
  Action: { row: "bg-rose-50 hover:bg-rose-100", dot: "bg-rose-400" },
  Fantasy: { row: "bg-violet-50 hover:bg-violet-100", dot: "bg-violet-400" },
  Horror: { row: "bg-slate-100 hover:bg-slate-200", dot: "bg-slate-500" },
  Thriller: { row: "bg-amber-50 hover:bg-amber-100", dot: "bg-amber-400" },
  SciFi: { row: "bg-sky-50 hover:bg-sky-100", dot: "bg-sky-400" },
};

export default function Table() {
  const movies = useMovie((state) => state.movies);
  const deleteMovie = useMovie((state) => state.delete);
  const fetchMovies = useMovie((state) => state.fetch);
  console.log(movies);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const [showForm, setShowForm] = useState(false);
  const [data, setdata] = useState<movieType>(); 

  return (
    <div className="flex flex-col gap-8">
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setShowForm(false)}
        >
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <Form data={data} onDone={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table>
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Category</th>
              <th scope="col" className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {movies.map((movie, id) => (
              <tr key={id} className={colors[movie.category].row}>
                <td className="font-medium text-slate-900">{movie.name}</td>
                <td className="text-slate-500">{movie.year}</td>
                <td className="text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full ${colors[movie.category].dot}`}
                    />
                    {movie.category}
                  </span>
                </td>

                <td className="text-right">
                  <button
                    type="button"
                    className="px-2 py-1 text-slate-600 hover:text-slate-900"
                    aria-label={`Edit ${movie.name}`}
                    onClick={() => {
                      setdata(movie);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 text-red-600 hover:text-red-800"
                    onClick={() => deleteMovie(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {movies.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400">
                  No movies yet. Click “Add movie” to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
