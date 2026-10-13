import { useForm, type SubmitHandler } from "react-hook-form";
import type { movieType } from "../types/movie.tsx";
import { useMovie } from "../store/Movies.tsx";

export default function Form({
  data,
  onDone,
}: {
  data?: movieType;
  onDone?: () => void;
}) {
  const { register, handleSubmit } = useForm<movieType>({
    defaultValues: data,
  });
  const addMovie = useMovie((state) => state.add);
  const updateMovie = useMovie((state) => state.update);
  const onSubmit: SubmitHandler<movieType> = async (formData) => {
    if (data?._id) {
      await updateMovie({ ...data, ...formData });
    } else {
      await addMovie(formData);
    }
    onDone?.();
  };

  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-5 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {data ? "Edit movie" : "Add a movie"}
      </h2>

      <label htmlFor="name">
        Name
        <input id="name" {...register("name")} />
      </label>
      <label htmlFor="year">
        Year
        <input id="year" {...register("year")} />
      </label>
      <label htmlFor="category">
        Category
        <select id="category" {...register("category")}>
          <option value="Action">Action</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="SciFi">SciFi</option>
        </select>
      </label>

      <input
        className="mt-2 bg-slate-900 py-2.5 text-white hover:bg-slate-700"
        type="Submit"
      />
    </form>
  );
}
