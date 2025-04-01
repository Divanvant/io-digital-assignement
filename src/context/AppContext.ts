import { createContext } from "react";
import { IMDBMovie } from "../model/movie";

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: IMDBMovie[];
  addFavorite: (movie: IMDBMovie) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setFavorites: (favorites: IMDBMovie[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
