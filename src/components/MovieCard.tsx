import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import { IMDBMovieListItem } from "../model/movie";

const MovieCard: FunctionComponent<
  IMDBMovieListItem & { children: React.ReactNode }
> = ({ Title, Poster, Year, imdbID, children }) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow pb-4">
      <NavLink to={`/movie/${imdbID}`} className="flex-1 flex flex-col">
        <img src={Poster} className="h-48 mx-auto mt-4" />
        <div className="p-4">
          <h3 className="mt-6 text-gray-900 text-sm font-medium">{Title}</h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dd className="text-gray-500 text-sm">{Year}</dd>
          </dl>
        </div>
      </NavLink>
      {children}
    </li>
  );
};

export default MovieCard;
