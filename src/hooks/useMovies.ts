import { useState, useEffect } from "react";
import { IMDBMovieListItem } from "../model/movie";
import { useLocation, useNavigate } from "react-router-dom";

export const useMovies = (searchQuery: string, delay = 500) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<IMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${debouncedQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        if (data.Error) throw new Error(data.Error);
        setMovies(data.Search || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        if (location.pathname !== "/") {
          navigate("/");
        }

        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return { movies, loading, error };
};
