import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API Handler for fetching movies based on year, page, and genre.
 * Only supports POST requests.
 */
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    let resp: Response | null = null; // To hold the response object for cleanup if needed
    try {
      // Destructure request body
      const { year, page, genre } = request.body;

      // Default to current year if no year is provided
      const date = new Date();

      // Construct the API endpoint URL
      const apiUrl = new URL("https://moviedatabase8.p.rapidapi.com/titles");
      apiUrl.searchParams.append("year", year || date.getFullYear().toString());
      apiUrl.searchParams.append("sort", "year.decr");
      apiUrl.searchParams.append("limit", "12");
      apiUrl.searchParams.append("page", page);
      if (genre) apiUrl.searchParams.append("genre", genre);

      // Fetch data from the external API
      resp = await fetch(apiUrl.toString(), {
        headers: {
          "x-rapidapi-host": "moviedatabase8.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`,
        },
      });

      // Handle non-OK responses
      if (!resp.ok) {
        const errorDetails = await resp.json();
        throw new Error(`Failed to fetch movies: ${errorDetails.message || resp.statusText}`);
      }

      // Parse and process the response
      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results;

      // Return the movies data
      return response.status(200).json({
        movies,
      });
    } catch (error: any) {
      // Handle any errors gracefully
      return response.status(500).json({
        error: error.message || "An unexpected error occurred",
      });
    } finally {
      // Cleanup or logging
      console.log("Request handled at:", new Date().toISOString());
      if (resp) {
        console.log(`API Response Status: ${resp.status}`);
      }
    }
  } else {
    // Handle unsupported HTTP methods
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed in this route`);
  }
};
