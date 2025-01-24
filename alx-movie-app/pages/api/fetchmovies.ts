import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API Handler for fetching movies based on year, page, and genre.
 * Only supports POST requests.
 */
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    let resp: Response | null = null;

    try {
      // Validate environment variables
      if (!process.env.XRAPIDKEY || !process.env.XRAPIDAPHOST) {
        return response.status(500).json({ error: "Missing API credentials" });
      }

      // Validate and destructure request body
      const { year, page, genre }: { year?: string; page?: string; genre?: string } = request.body;

      if (!page || isNaN(Number(page)) || Number(page) < 1) {
        return response.status(400).json({ error: "Invalid page number provided" });
      }

      // Default year to current year if not provided
      const currentYear = new Date().getFullYear().toString();
      const apiUrl = new URL(`https://imdb236.p.rapidapi.com/imdb/most-popular-movies`);
      apiUrl.searchParams.append("year", year || currentYear);
      apiUrl.searchParams.append("sort", "year.decr");
      apiUrl.searchParams.append("limit", "12");
      apiUrl.searchParams.append("page", page);
      if (genre) apiUrl.searchParams.append("genre", genre);

      // Fetch data from the external API
      resp = await fetch(apiUrl.toString(), {
        headers: {
          "x-rapidapi-host": process.env.XRAPIDAPHOST,
          "x-rapidapi-key": process.env.XRAPIDKEY,
        },
      });

      if (!resp.ok) {
        const errorDetails = await resp.json();
        return response.status(resp.status).json({ error: errorDetails.message || resp.statusText });
      }

      // Parse the API response
      const moviesResponse = await resp.json();
      const movies: MoviesProps[] = moviesResponse.results;

      return response.status(200).json({ movies });
    } catch (error: any) {
      return response.status(500).json({ error: error.message || "An unexpected error occurred" });
    } finally {
      console.log("Request handled at:", new Date().toISOString());
      if (resp) {
        console.log(`API URL: ${resp.url}`);
        console.log(`API Response Status: ${resp.status}`);
      }
    }
  } else {
    // Handle unsupported methods
    response.setHeader("Allow", ["POST"]);
    return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
