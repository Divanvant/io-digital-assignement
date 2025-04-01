import clsx from "clsx";
import { FunctionComponent } from "react";

const Toggle: FunctionComponent<{
  isFavorite: boolean;
  onToggleFavorite: () => void;
}> = ({ isFavorite, onToggleFavorite }) => {
  return (
    <div className="flex flex-row-reverse">
      <button
        type="button"
        role="switch"
        aria-checked="false"
        onClick={onToggleFavorite}
        className={clsx(
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200",
          isFavorite ? "bg-green-600" : "bg-gray-200"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
            isFavorite ? "translate-x-5" : "translate-x-0"
          )}
        ></span>
      </button>
      <b>Favorite: </b>
    </div>
  );
};

export default Toggle;
