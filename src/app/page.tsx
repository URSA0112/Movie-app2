'use client'
import { useState, useEffect } from "react";
import { api } from "./constants";
import { Header } from "./components/header/header";
import { Nowplaying } from "./components/movies/nowplaying";
import { UpComing } from "./components/movies/upcoming";
import { Popular } from "./components/movies/popular";
import { TopRated } from "./components/movies/topRated";
import { Movie } from "./types";


export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [upComingMovies, setUpComingMovies]=useState<Movie[]>([])
  const [popularMovies, setPopularMovies]=useState<Movie[]>([])

  //NowPlaying Movies Fetch 
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const res = await api.get(`/movie/now_playing`)
      setNowPlayingMovies(res.data.results)
    }
    getNowPlayingMovies()
  }, [])

  // Upcoming Movies Fetch
  useEffect(() => {
    const getUpComingMovies = async () => {
      const res = await api.get(`/movie/upcoming`)
      setUpComingMovies(res.data.results) 
    }
    getUpComingMovies()
  }, [])

  //Popular Movies Fetch
  useEffect(() => {
    const getPopularMovies = async () => {
      const res = await api.get(`/movie/popular`)
      setPopularMovies(res.data.results) 
    }
    getPopularMovies()
  }, [])


  return (
    <div className="w-full h-full">
      <Header></Header>
      <Nowplaying nowPlayingMovies={nowPlayingMovies} setNowPlayingMovies={setNowPlayingMovies}></Nowplaying>
      <div className="">
        <UpComing upComingMovies={upComingMovies} setUpComingMovies={setUpComingMovies}></UpComing>
        <Popular popularMovies={popularMovies} setPopularMovies={setPopularMovies}></Popular>
        <TopRated></TopRated>
      </div>
    </div>
  )
}
