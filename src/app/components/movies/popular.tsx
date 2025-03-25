'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Movie } from "@/app/types"
import { Dispatch, SetStateAction } from "react"
import { BASE_IMAGE_URL } from "@/app/constants"
import { useState } from "react"
import Link from "next/link"

type PopularMoviesProps = {
  popularMovies: Movie[],
  setPopularMovies: Dispatch<SetStateAction<Movie[]>>
}
export function Popular({ popularMovies, setPopularMovies }: PopularMoviesProps) {



  return (
    <div className="w-full mt-5 overflow-hidden">
      <div className="w-full flex justify-between items-center px-6 py-4 mb-6 
  bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-white/5 dark:to-white/10
  backdrop-blur-lg rounded-2xl shadow-xl border border-gray-300/40 dark:border-white/20
  hover:shadow-2xl transition-all duration-300 font-sans">

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white tracking-wide">
          Popular Movies
        </h2>
        <Link href={`/fullMoviesPage/popular`} className="text-sm md:text-base px-5 py-2 rounded-full border border-gray-500/40 dark:border-white/30
          bg-gray-100/70 dark:bg-white/10 text-gray-800 dark:text-white
          hover:bg-gray-300/80 dark:hover:bg-white/20 hover:text-black transition-all duration-300 shadow-inner hover:shadow-xl"
        > See More </Link>
      </div>
      <ul
        id="card-container"
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {popularMovies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link key={movie.id} href={`/movieDetails/${movie.id}`} className="flex-shrink-0 w-40 sm:w-48">
              <Card className="h-full flex flex-col bg-neutral-100 dark:bg-gray-800 shadow-md p-2">
                <CardContent className="p-0">
                  <img
                    src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
                    alt={movie.original_title}
                    width={500}
                    height={750}
                    className="w-full h-60 object-cover rounded-t-md"
                  />
                </CardContent>
                <CardHeader className="px-3 py-2 min-h-[80px]">
                  <CardTitle className="text-sm truncate min-h-[20px]" title={movie.title}>
                    <span className="bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm">
                      ⭐ {movie.vote_average.toFixed(1)} / 10
                    </span>
                  </CardTitle>
                  <CardDescription className="text-sm font-bold dark:text-neutral-200 text-black min-h-[40px] truncate">
                    {movie.title}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </ul>
    </div>
  )
}