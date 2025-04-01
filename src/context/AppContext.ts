import { createContext } from "react";
import { IMDBMovieListItem } from "../model/movie";

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: IMDBMovieListItem[];
  addFavorite: (movie: IMDBMovieListItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const AppContext = createContext<AppContextType | null>(null);
