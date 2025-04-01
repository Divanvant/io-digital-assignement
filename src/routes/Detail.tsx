import { FunctionComponent, useContext } from "react";
import Toggle from "../components/Toggle";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { AppContext } from "../context/AppContext";

const Detail: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) throw new Error("404: movie not found");

  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error("Context must be used within a context provider");
  const { addFavorite, removeFavorite, isFavorite } = appContext;

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      if (movieDetails) addFavorite(movieDetails);
    }
  };

  const { movieDetails, loading, error } = useMovieDetails(id);

  if (loading) {
    <div>Loading movies</div>;
  }

  if (error || !movieDetails) {
    return <div>Something went wrong fetching movies: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={movieDetails.Poster}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </div>
          </div>
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <Toggle
              isFavorite={isFavorite(id)}
              onToggleFavorite={toggleFavorite}
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {movieDetails.Title}
            </h1>
            <div className="mt-3">
              <p className="text-3xl text-gray-900">{movieDetails.Year}</p>
            </div>
            <div className="mt-3">
              <p className="text-xl text-gray-900">{movieDetails.Actors}</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">{movieDetails.Plot}</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{movieDetails.Plot}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                className="text-gray-600 text-sm"
                onClick={() => navigate(-1)}
              >
                Back to list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
