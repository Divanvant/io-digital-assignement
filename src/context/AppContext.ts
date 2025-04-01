import { createContext } from "react";

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
