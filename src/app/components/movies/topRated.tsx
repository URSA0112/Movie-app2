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

type TopRatedMoviesProps = {
    topRatedMovies: Movie[],
    setTopRatedMovies: Dispatch<SetStateAction<Movie[]>>
}
export function TopRated({ topRatedMovies, setTopRatedMovies }: TopRatedMoviesProps) {
console.log(topRatedMovies)
    const [showAll, setShowAll] = useState(false)
    const displayedMovies = showAll ? topRatedMovies : topRatedMovies.slice(0, 10)

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
                            <Card className="h-full flex flex-col bg-blue-100 dark:bg-gray-800 shadow-md p-2">
                                <CardContent className="p-0">
                                    <img
                                        src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
                                        alt={movie.original_title}
                                        className="w-full h-60 object-cover rounded-t-md"
                                    />
                                </CardContent>
                                <CardHeader className="px-3 py-2">
                                    <CardTitle className="text-sm truncate" title={movie.title}>
                                        {movie.title}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-gray-500">
                                        Popularity: {Math.round(movie.popularity)}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="px-3 py-2">
                                    <p className="text-xs text-gray-400">{movie.release_date}</p>
                                </CardFooter>
                            </Card>
                        </li>
                    ))}

                {!showAll && topRatedMovies.length > 10 && (
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