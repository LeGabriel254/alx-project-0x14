// Importing the necessary types and interfaces
import { MoviesProps } from "@/interfaces"; // Interface for defining the structure of movie data
import { NextApiRequest, NextApiResponse } from "next"; // Types for API request and response

const apiKey = process.env.MOVIE_API_KEY || ""
// The API route handler function
export default async function handler(request: NextApiRequest, response: NextApiResponse) {

  // Check if the request method is POST
  if (request.method === "POST") {
    console.log(request)
    // Destructure the `year`, `page`, and `genre` parameters from the request body
    const { year, page, genre } = request.body;

    // Get the current date (used as a fallback if the year is not provided)
    const date = new Date();

    // Fetch movie data from the external API
    const resp = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles?year=${year || date.getFullYear() // Use the provided year or default to the current year
      }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`, // Add the genre filter if provided
      {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com", // RapidAPI host for the Movies Database API
          "x-rapidapi-key": apiKey, // API key retrieved from environment variables
        },
      }
    );
    console.log(apiKey)
    console.dir(resp)
    return response.json(
      { hello: "Random" }

    )

    // Check if the response from the API is not successful
    // if (!resp.ok) throw new Error("Failed to fetch movies");

    // // Parse the JSON response from the API
    // const moviesResponse = await resp.json();

    // // Extract the movie results and type them as an array of `MoviesProps`
    // const movies: MoviesProps[] = moviesResponse.results;

    // // Return the movies in the response with a 200 status code
    // return response.status(200).json({
    //   movies,
    // });

  } else if (request.method === "GET") {
    return response.json(
      { hello: "Random" }

    )

  } else {
    // If the request method is not POST, send a 405 (Method Not Allowed) response
    response.setHeader('Allow', ['POST']); // Specify allowed methods in the header
    response.status(405).end(`Method ${request.method} Not Allowed in here`);
  }
};
