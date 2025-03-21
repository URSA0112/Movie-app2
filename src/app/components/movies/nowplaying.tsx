import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "../../types";
import { BASE_IMAGE_URL } from "../../constants";
import { Dispatch, SetStateAction } from "react";

type NowPlayingProps = {
    nowPlayingMovies: Movie[];
    setNowPlayingMovies: Dispatch<SetStateAction<Movie[]>>;
};

export function Nowplaying({ nowPlayingMovies }: NowPlayingProps) {
    console.log(nowPlayingMovies)
    const carouselRef = useRef<HTMLDivElement>(null);

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
        <div className="relative w-full overflow-hidden">
            <button
                onClick={scrollLeft}
                className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white  dark:bg-black  shadow-xl rounded-full p-3 hover:bg-gray-200 transition"
            >
                <ChevronLeft size={28} />
            </button>

            <div
                ref={carouselRef}
                className="flex overflow-x-scroll scroll-smooth scrollbar-hide snap-x snap-mandatory"
            >
                {nowPlayingMovies.filter((movie) => movie.backdrop_path).map((movie) => (
                    <div
                        key={movie.id}
                        className="w-screen flex-shrink-0 snap-start relative"
                    >
                        <img
                            src={`${BASE_IMAGE_URL}w1280${movie.backdrop_path}`}
                            alt={movie.title}
                            onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                            className="w-full h-auto object-cover"
                        />

                        <div className="absolute top-[5%] w-full  p-6 text-white text-2xl ">
                            {movie.title}
                        </div>
                        <div className="absolute top-[0%] w-full bg-gradient-to-b from-black/80 to-transparent p-6 text-white text-[12px] ">
                            Now playing:
                        </div>
                        <div className="absolute bottom-[1%] p-6 text-auto w-full">{movie.overview}</div>
                    </div>
                ))}
            </div>

            <button
                onClick={scrollRight}
                className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-black shadow-xl rounded-full p-3 hover:bg-gray-200 transition"
            >
                <ChevronRight size={28} />
            </button>
        </div>
    );
}