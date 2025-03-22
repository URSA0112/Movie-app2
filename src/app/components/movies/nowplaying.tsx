import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../../types";
import { BASE_IMAGE_URL } from "../../constants";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type NowPlayingProps = {
  nowPlayingMovies: Movie[];
  setNowPlayingMovies: Dispatch<SetStateAction<Movie[]>>;
};

export function Nowplaying({ nowPlayingMovies }: NowPlayingProps) {
  const carouselRef = useRef<HTMLDivElement>(null);  

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getPopularityBadge = (popularity: number) => {
    if (popularity > 1000) {
      return (
        <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-sm hover:opacity-90 transition">
          🔥 Trending
        </span>
      );
    } else if (popularity > 300) {
      return (
        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-sm hover:opacity-90 transition">
          ⭐ Popular
        </span>
      );
    } else {
      return (
        <span className="bg-gradient-to-r font-semibold from-green-600 to-green-400 text-white text-xs px-2 py-1 rounded-full shadow-sm hover:opacity-90 transition">
          🟢 New
        </span>
      );
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        const atEnd = carouselRef.current.scrollLeft >= maxScroll;

        if (atEnd) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-stone-100 dark:bg-gray-900 min-h-[400px]">
      <button
        onClick={scrollLeft}
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-full p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <ChevronLeft size={15} className="text-black dark:text-white" />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-scroll scroll-smooth scrollbar-hide snap-x snap-mandatory pb-5"
      >
        {nowPlayingMovies
          .filter((movie) => movie.backdrop_path)
          .map((movie) => (
            <Link
              key={movie.id} href={`/movieDetails/${movie.id}`}
              className="w-screen flex-shrink-0 snap-start relative p-4"
            >
              <div className="mx-auto max-w-[1280px] relative">
                <img
                  src={`${BASE_IMAGE_URL}w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1280}
                  height={720}
                  className="w-full h-auto object-cover rounded-md aspect-video"
                />


                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-md">
                  <h2 className="text-xl font-bold text-white mb-4">{movie.title}</h2>
                  <div className="flex flex-wrap gap-3 items-center">
                    {getPopularityBadge(movie.popularity)}
                    <span className="bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm hover:bg-yellow-400 transition">
                      ⭐ {movie.vote_average.toFixed(1)} / 10
                    </span>
                    <span className="bg-purple-600 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm hover:bg-purple-500 transition">
                      {formatDate(movie.release_date)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm text-center dark:text-gray-300 line-clamp-3 min-h-[60px]">
                {movie.overview}
              </div>

            </Link>
          ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-full p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <ChevronRight size={15} className="text-black dark:text-white" />
      </button>
    </div>
  );
}
