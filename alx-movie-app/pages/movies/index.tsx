import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";


interface MProps {
  movies: MoviesProps[] // Defines the type for the movies prop, which is an array of MoviesProps.
}

const Movies: React.FC<MProps> = () => {
  const [page, setPage] = useState<number>(1); // State to keep track of the current page number.
  const [year, setYear] = useState<number | null>(null); // State for the year filter, can be null or a number.
  const [genre, setGenre] = useState<string>("All"); // State for the genre filter, default is "All".
  const [movies, setMovies] = useState<MoviesProps[]>([]); // State to store the fetched movies.
  const [loading, setLoading] = useState<boolean>(false); // State to track if the data is being loaded.

  // Fetches movies based on filters like page, year, and genre.
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true); // Set loading state to true when fetching starts.

      // Fetch data from the API with the current filters (page, year, genre).
      const response = await fetch("/api/fetchmovies", {
        method: "POST",
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre, // If genre is "All", send an empty string, otherwise send the genre.
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8", // Set the content type for the request.
        },
      });

      // If the response is not ok, throw an error.
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      // Parse the response as JSON and extract the movies.
      const data = await response.json();
      const results = data.movies;

      console.log(results); // Log the fetched movies for debugging.
      setMovies(results); // Update the state with the fetched movies.
    } catch (error: any) {
      console.error("Error fetching movies:", error.message); // Log any errors that occur.
      alert("Failed to load movies. Please try again later."); // Show an alert if there's an error.
    } finally {
      setLoading(false); // Set loading state to false once the request is finished.
    }
  }, [page, year, genre]); // Depend on page, year, and genre, so the effect will rerun when they change.

  // Effect hook to fetch movies whenever the fetchMovies function changes.
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Only run the effect if fetchMovies has changed.




  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">

          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="" className="text-white bg-slate-500">Select Year</option>
            {
              [2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
                <option value={year} key={year} className="text-black bg-slate-500 rounded-md">{year}</option>
              ))
            }
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">{year} {genre} Movie List</h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {
              ['All', 'Animation', 'Comedy', 'Fantasy'].map((genre: string, key: number) => (
                <Button title={genre} key={key} action={() => setGenre(genre)} />
              ))
            }
          </div>
        </div>

        {/* Movies output */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {
            movies?.map((movie: MoviesProps, key: number) => (
              <MovieCard
                title={movie?.titleText.text}
                posterImage={movie?.primaryImage?.url}
                releaseYear={movie?.releaseYear.year}
                key={key}
              />
            ))
          }
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button title="Previous" action={() => setPage(prev => prev > 1 ? prev - 1 : 1)} />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {
        loading && <Loading />
      }
    </div>

  );
};


export default Movies;
