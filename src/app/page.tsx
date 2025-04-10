'use client'
import { useState, useEffect } from "react";
import { api, API_KEY, BASE_URL } from "./constants";
import { Header } from "./components/header/header";
import { Nowplaying } from "./components/movies/nowplaying";
import { UpComing } from "./components/movies/upcoming";
import { Popular } from "./components/movies/popular";
import { TopRated } from "./components/movies/topRated";
import { Movie } from "./types";
import { Footer } from "./components/footer/footer";
import axios from "axios";
import { MoviesGenre } from "./components/movies/GenreMoviesPage";
import { MoviesSearched } from "./components/movies/SearchedMoviesPage";
import { PageSwitch } from "./components/sub-components/Pagination";



export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null)
  const [searchValue, setSearchValue] = useState<string | null>("")
  const [moviesbyInput, setmoviesbyInput] = useState<Movie[]>([])
  const [moviesbyGenre, setMoviesByGenre] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (selectedGenre) {
      setSearchValue("")
    }
    if (searchValue) {
      setSelectedGenre(null)
    }
  }, [selectedGenre, searchValue])

  // NowPlaying Movies Fetch 
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const res = await api.get(`/movie/now_playing`, {
          params: { page: currentPage },
        });
        setNowPlayingMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };
    getNowPlayingMovies();
  }, []);

  // Upcoming Movies Fetch
  useEffect(() => {
    const getUpComingMovies = async () => {
      try {
        const res = await api.get(`/movie/upcoming`, {
          params: { page: currentPage },
        });
        setUpComingMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    getUpComingMovies();
  }, []);

  // Popular Movies Fetch
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await api.get(`/movie/popular`, {
          params: { page: currentPage },
        });
        setPopularMovies(res.data.results);

      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    getPopularMovies();
  }, []);

  // Top Rated Movies Fetch
  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const res = await api.get(`/movie/top_rated`, {
          params: { page: currentPage },
        });
        setTopRatedMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };
    getTopRatedMovies();
  }, []);

  //GENRE FETCH
  useEffect(() => {
    const getMovieByGenre = async () => {
      if (!selectedGenre) return;
      const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre.id}`, {
        params: { page: currentPage },
      });
      setMoviesByGenre(res.data.results);
      setTotalPages(res.data.total_pages)
    };
    getMovieByGenre();
  }, [selectedGenre, currentPage]);

  //SEARCH FETCH
  useEffect(() => {
    const getMovieBySearch = async () => {
      if (!searchValue) return;
      const res = await axios.get(`${BASE_URL}/search/movie?query=${searchValue}&api_key=${API_KEY}`, {
        params: { page: currentPage },
      })
      setTotalPages(res.data.total_pages)
      setmoviesbyInput(res.data.results)
    }
    getMovieBySearch()
  }, [searchValue, currentPage])



  return (
    <div className="w-full h-full ">
      <Header
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        searchValue={searchValue}
        setSearchValue={setSearchValue}>
      </Header>

      <Nowplaying
        nowPlayingMovies={nowPlayingMovies}
        setNowPlayingMovies={setNowPlayingMovies}>
      </Nowplaying>

      {searchValue ?
        (<div className="w-full h-auto "><MoviesSearched moviesbySearch={moviesbyInput}></MoviesSearched></div>)
        : selectedGenre ? (<div className="w-full h-auto "><MoviesGenre moviesbyGenre={moviesbyGenre} selectedGenre={selectedGenre} ></MoviesGenre></div>)
          : (<div className="">
            <UpComing upComingMovies={upComingMovies} setUpComingMovies={setUpComingMovies}></UpComing>
            <Popular popularMovies={popularMovies} setPopularMovies={setPopularMovies}></Popular>
            <TopRated topRatedMovies={topRatedMovies} setTopRatedMovies={setTopRatedMovies}></TopRated>
          </div>)}

      {(selectedGenre || searchValue) && (
        <div className="mt-15">
          <PageSwitch currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      )}

      <Footer></Footer>
    </div>
  )
}
