import { FunctionComponent, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";

const Home: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error("Context must be used within a context provider");
  const { searchQuery } = appContext;

  const { movies, loading, error } = useMovies(searchQuery);

  if (loading) {
    <div>Loading movies</div>;
  }

  if (error) {
    return <div>Something went wrong fetching movies: {error}</div>;
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </ul>
  );
};

export default Home;
