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

  //NowPlaying Movies Fetch 
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const res = await api.get(`/movie/now_playing`)
      setNowPlayingMovies(res.data.results)
    }
    getNowPlayingMovies()
  }, [])

  return (
    <div className="w-full h-full">
      <Header></Header>
      <Nowplaying nowPlayingMovies={nowPlayingMovies} setNowPlayingMovies={setNowPlayingMovies}></Nowplaying>
      <div>
        <UpComing></UpComing>
        <Popular></Popular>
        <TopRated></TopRated>
      </div>
    </div>
  )
}
