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

type PopularMoviesProps = {
  popularMovies: Movie[],
  setPopularMovies: Dispatch<SetStateAction<Movie[]>>
}
export function Popular({ popularMovies, setPopularMovies }: PopularMoviesProps) {

  const [showAll, setShowAll] = useState(false)
  const displayedMovies = showAll ? popularMovies : popularMovies.slice(0, 10)

  return (
    <div className="w-full mt-5 overflow-hidden">
      <ul
        id="card-container"
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      >
        {displayedMovies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <li key={movie.id} className="flex-shrink-0 w-40 sm:w-48">
              <Card className="h-full flex flex-col bg-neutral-100 dark:bg-gray-800 shadow-md p-2">
                <CardContent className="p-0">
                  <img
                    src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-full h-60 object-cover rounded-t-md"
                  />
                </CardContent>
                <CardHeader className="px-3 py-2">
                  <CardTitle className="text-sm truncate" title={movie.title}>
                    <span className="bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm hover:bg-yellow-400 transition">
                      ⭐ {movie.vote_average.toFixed(1)} / 10
                    </span>
                  </CardTitle>
                  <CardDescription className=" text-sm font-bold dark:text-neutral-200 text-black mb-4 truncate">
                    {movie.title}
                  </CardDescription>
                </CardHeader>
             
              </Card>
            </li>
          ))}

        {!showAll && popularMovies.length > 10 && (
          <li className="flex-shrink-0 flex items-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition whitespace-nowrap"
            >
              See All
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}