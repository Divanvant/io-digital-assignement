import { FunctionComponent, useContext } from "react";
import { AppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";
import { NavLink } from "react-router-dom";

const Favorites: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error("Context must be used within a context provider");
  const { favorites, removeFavorite } = appContext;

  if (!favorites.length) {
    return (
      <div className="text-center">
        <p className="mb-4">You do not have any favorites yet</p>
        <NavLink to="/" className="underline">
          Search now
        </NavLink>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {favorites.map((favorite) => (
        <MovieCard key={favorite.imdbID} {...favorite}>
          <div className="flex flex-row flex-nowrap gap-8 items-center justify-center">
            <NavLink
              className="text-orange-400"
              to={`/edit/${favorite.imdbID}`}
            >
              Edit
            </NavLink>
            <button
              onClick={() => removeFavorite(favorite.imdbID)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </MovieCard>
      ))}
    </ul>
  );
};

export default Favorites;
