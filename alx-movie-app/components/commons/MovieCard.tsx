import React from "react";
import { MoviesProps } from "@/interfaces";


const MovieCard: React.FC<MoviesProps> = ({ title, imageUrl, description, releaseDate, imdbUrl, rating }) => {
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-image" />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Release Date:</strong> {releaseDate}</p>
        <p><strong>Rating:</strong> {rating}</p>
        <a href={imdbUrl} target="_blank" rel="noopener noreferrer">View on IMDb</a>
      </div>
    </div>
  );
};

// Usage in the Movies component
<MovieCard
  title="The Shawshank Redemption"
  imageUrl="https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg"
  description="A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion."
  releaseDate="1994-10-14"
  imdbUrl="https://www.imdb.com/title/tt0111161/"
  rating="R"
/>
 export default MovieCard;