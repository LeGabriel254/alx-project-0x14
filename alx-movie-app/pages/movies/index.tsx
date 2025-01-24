import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import debounce from "lodash/debounce";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1); // Current page number
  const [year, setYear] = useState<number | null>(null); // Year filter
  const [genre, setGenre] = useState<string>("All"); // Genre filter
  const [movies, setMovies] = useState<MoviesProps[]>([]); // Fetched movies
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [cache, setCache] = useState<{ [key: string]: MoviesProps[] }>({}); // Cache for paginated data

  // Debounced search function
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset page when searching
  }, 500);

  // Fetch movies from API
  const fetchMovies = useCallback(async () => {
    const cacheKey = `${page}-${year}-${genre}-${searchQuery}`; // Unique key for cache

    if (cache[cacheKey]) {
      setMovies(cache[cacheKey]); // Use cached data if available
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/fetchmovies", {
        method: "POST",
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre,
          query: searchQuery,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      const data = await response.json();
      const results = data.movies;

      setMovies(results);
      setCache((prev) => ({ ...prev, [cacheKey]: results })); // Cache results
    } catch (error: any) {
      console.error("Error fetching movies:", error.message);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, year, genre, searchQuery, cache]);

  // Fetch movies when dependencies change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            onChange={(e) => handleSearch(e.target.value)}
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="" className="text-white bg-slate-500">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
              <option value={year} key={year} className="text-black bg-slate-500 rounded-md">
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || "All Years"} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g, key) => (
              <Button
                title={g}
                key={key}
                action={() => setGenre(g)}
                className={g === genre ? "bg-[#E2D609]" : ""}
              />
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-6">{error}</p>}

        {/* Empty State */}
        {movies.length === 0 && !loading && !error && (
          <p className="text-center text-gray-400 mt-6">No movies found. Try adjusting your filters.</p>
        )}

       {/* Movies Grid */}
<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
  {movies.map((movie, key) => (
    <MovieCard
      key={key} // key should always be on the outermost element
      title={movie.title} // Use primaryTitle or originalTitle for the movie's title
      imageUrl={movie.imageUrl} // movie.primaryImage contains the URL for the poster
      description={movie.description} // Provide a short description of the movie
      releaseDate={movie.releaseDate} // Release date to show when the movie was released
      imdbUrl={movie.imdbUrl} // Link to IMDb page for each movie
      rating={movie.rating} // Movie rating like "R", "PG-13", etc.
    />
  ))}
</div>


        {/* Pagination */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
            aria-label="Go to previous page"
          />
          <Button
            title="Next"
            action={() => setPage(page + 1)}
            aria-label="Go to next page"
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <Loading />}
    </div>
  );
};

export default Movies;
