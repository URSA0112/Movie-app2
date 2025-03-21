'use client'
import { PageSwitch } from "../../components/sub-components/Pagination"
import { BASE_IMAGE_URL } from "../../../app/constants"
import { Movie } from "../../../app/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type MoviesSearchedProps = {
    moviesbySearch: Movie[]
}
export function MoviesSearched({ moviesbySearch }: MoviesSearchedProps) {

    return (
        <div>
            <div className="w-full flex justify-between items-center px-6 py-4 mb-6 
  bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-white/5 dark:to-white/10
  backdrop-blur-lg rounded-2xl shadow-xl border border-gray-300/40 dark:border-white/20
  hover:shadow-2xl transition-all duration-300 font-sans mt-5">

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white tracking-wide">
                 Search Results :
                </h2>

                <button
                    className="text-sm md:text-base px-5 py-2 rounded-full border border-gray-500/40 dark:border-white/30 
    bg-gray-100/70 dark:bg-white/10 text-gray-800 dark:text-white 
    hover:bg-gray-300/80 dark:hover:bg-white/20 hover:text-black transition-all duration-300 shadow-inner hover:shadow-xl"
                >
                    See More
                </button>
            </div>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 justify-items-center">
                {moviesbySearch.map((movie) =>
                    <li key={movie.id} className="flex-shrink-0 w-40 sm:w-48 list-none">
                        <Card className="h-full flex flex-col bg-neutral-100 dark:bg-gray-800 shadow-md p-2 ">
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
                )}

            </div>

        </div>
    )
}