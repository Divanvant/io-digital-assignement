import { FunctionComponent, useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Edit: FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error("Context must be used within a context provider");
  const { favorites, setFavorites } = appContext;

  const movie = favorites.find((movie) => movie.imdbID === id);

  const [title, setTitle] = useState(movie?.Title || "");
  const [year, setYear] = useState(movie?.Year || "");
  const [actors, setActors] = useState(movie?.Actors || "");

  const saveFavorite = () => {
    const updatedMovies = favorites.map((movie) =>
      movie.imdbID === id
        ? { ...movie, Title: title, Year: year, Actors: actors }
        : movie
    );
    setFavorites(updatedMovies);
    navigate("/favorites");
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={movie?.Poster}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>
          <form>
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    name="Title"
                    type="text"
                    className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <div className="mt-1">
                  <input
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    name="Year"
                    type="text"
                    className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  Actors
                </label>
                <div className="mt-1">
                  <input
                    value={actors}
                    onChange={(event) => setActors(event.target.value)}
                    name="Actors"
                    type="text"
                    className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  className="text-sm text-blue-500 hover:text-black"
                  type="submit"
                  onClick={saveFavorite}
                >
                  Save favorite
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
