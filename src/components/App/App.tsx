import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);
    try {
      const result = await fetchMovies(query);
      if (result.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(result);
    } catch {
      setError("There was an error, please try again...");
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;

// import React, { useState } from "react";
// import SearchBar from "../SearchBar/SearchBar";
// import MovieGrid from "../MovieGrid/MovieGrid";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import MovieModal from "../MovieModal/MovieModal";
// import type { Movie } from "../../types/movie";
// import { fetchMovies, MoviesResponse } from "../../services/movieService";
// import toast from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";
// import css from "./App.module.css";

// const App: React.FC = () => {
//   const [query, setQuery] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

//   const { data, isLoading, isError, refetch, isFetching } = useQuery<
//     MoviesResponse,
//     Error
//   >(["movies", query, page], () => fetchMovies(query, page), {
//     enabled: !!query, // Запит відбувається тільки якщо є query
//     keepPreviousData: true, // Щоб не показувати порожні дані під час переходу сторінок
//     onError: () => {
//       toast.error("There was an error, please try again...");
//     },
//     onSuccess: (data) => {
//       if (data.results.length === 0) {
//         toast.error("No movies found for your request.");
//       }
//     },
//   });

//   const handleSearch = (searchQuery: string) => {
//     setQuery(searchQuery);
//     setPage(1); // При новому пошуку повертаємося на першу сторінку
//   };

//   const handlePageChange = ({ selected }: { selected: number }) => {
//     setPage(selected + 1);
//   };

//   const handleSelectMovie = (movie: Movie) => {
//     setSelectedMovie(movie);
//   };

//   const handleCloseModal = () => {
//     setSelectedMovie(null);
//   };

//   return (
//     <>
//       <SearchBar onSubmit={handleSearch} />

//       {(isLoading || isFetching) && <Loader />}
//       {isError && <ErrorMessage />}

//       {!isLoading && !isError && data && data.results.length > 0 && (
//         <>
//           <MovieGrid movies={data.results} onSelect={handleSelectMovie} />

//           {data.total_pages > 1 && (
//             <ReactPaginate
//               pageCount={data.total_pages}
//               pageRangeDisplayed={5}
//               marginPagesDisplayed={1}
//               onPageChange={handlePageChange}
//               forcePage={page - 1}
//               containerClassName={css.pagination}
//               activeClassName={css.active}
//               nextLabel="→"
//               previousLabel="←"
//             />
//           )}
//         </>
//       )}

//       {selectedMovie && (
//         <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
//       )}
//     </>
//   );
// };

// export default App;
