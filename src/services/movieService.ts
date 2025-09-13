import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
}

// import axios from "axios";
// import type { Movie } from "../types/movie";

// export interface MoviesResponse {
//   results: Movie[];
//   page: number;
//   total_pages: number;
// }

// export async function fetchMovies(
//   query: string,
//   page: number = 1
// ): Promise<MoviesResponse> {
//   const response = await axios.get<MoviesResponse>(
//     "https://api.themoviedb.org/3/search/movie",
//     {
//       params: { query, page },
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
//       },
//     }
//   );
//   return response.data;
// }
