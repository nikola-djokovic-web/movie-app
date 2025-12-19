import React from "react";

const MovieCard = ({
  movie: {
    title,
    id,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "./no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3 className="text-white text-xl">{title}</h3>

        <div className="content">
          <div className="rating">
            <img
              src="star.svg"
              alt="Star"
              className="w-4 h-4 inline-block mr-1"
            />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language.toUpperCase()}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
