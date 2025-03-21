'use client'
import { useState, useEffect } from "react";
import { api } from "./constants";
import { Header } from "./components/header/header";
import { Nowplaying } from "./components/movies/nowplaying";
import { UpComing } from "./components/movies/upcoming";
import { Popular } from "./components/movies/popular";
import { TopRated } from "./components/movies/topRated";
import { Movie } from "./types";
import { Footer } from "./components/footer/footer";


export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [upComingMovies, setUpComingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])

// NowPlaying Movies Fetch 
useEffect(() => {
  const getNowPlayingMovies = async () => {
    try {
      const res = await api.get(`/movie/now_playing`);
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
      const res = await api.get(`/movie/upcoming`);
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
      const res = await api.get(`/movie/popular`);
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
      const res = await api.get(`/movie/top_rated`);
      setTopRatedMovies(res.data.results);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  };
  getTopRatedMovies();
}, []);



  return (
    <div className="w-full h-full">
      <Header></Header>
      <Nowplaying nowPlayingMovies={nowPlayingMovies} setNowPlayingMovies={setNowPlayingMovies}></Nowplaying>
      <div className="">
        <UpComing upComingMovies={upComingMovies} setUpComingMovies={setUpComingMovies}></UpComing>
        <Popular popularMovies={popularMovies} setPopularMovies={setPopularMovies}></Popular>
        <TopRated topRatedMovies={topRatedMovies} setTopRatedMovies={setTopRatedMovies}></TopRated>
      </div>
      <Footer></Footer>
    </div>
  )
}
// Category	Example API endpoint URL
// Top Rated	https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&page=1
// Upcoming	https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&page=1
// Now Playing	https://api.themoviedb.org/3/movie/now_playing?api_key=YOUR_API_KEY&page=1