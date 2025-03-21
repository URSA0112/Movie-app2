'use client'
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
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 justify-items-center">
            {moviesbySearch.map((movie) =>
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
            )}
        </div>
    )
}