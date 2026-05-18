'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_IMAGE_URL, BASE_URL } from "@/app/constants";
import { MovieDetail } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { Footer } from "@/app/components/footer/footer";
import { Header } from "@/app/components/header/header";

export default function MovieDetails() {
    const params = useParams();
    const slug = params?.slug as string;
    const movieId = slug.split("-").pop();

    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [moreLike, setMoreLike] = useState<MovieDetail[]>([]);
    const [credits, setCredits] = useState<{ director: string; writers: string; stars: string }>({ director: '', writers: '', stars: '' });
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [trailerOpen, setTrailerOpen] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        async function fetchMovie() {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }

        async function fetchMoreLike() {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
                setMoreLike(response.data.results);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        }

        async function fetchCredits() {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
                const director = response.data.crew.find((person: any) => person.job === "Director")?.name || "Unknown";
                const writers = response.data.crew.filter((person: any) => person.department === "Writing").map((writer: any) => writer.name).join(", ");
                const stars = response.data.cast.slice(0, 3).map((star: any) => star.name).join(", ");
                setCredits({ director, writers, stars });
            } catch (error) {
                console.error("Error fetching credits:", error);
            }
        }

        async function fetchTrailer() {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
                const trailer = response.data.results.find(
                    (v: { type: string; site: string; key: string }) => v.type === "Trailer" && v.site === "YouTube"
                );
                setTrailerKey(trailer?.key ?? null);
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        }

        fetchMovie();
        fetchCredits();
        fetchMoreLike();
        fetchTrailer();
    }, [slug]);

    if (!movie) return <p className="text-white p-6">Loading...</p>;

    return (
        <>
            <Header></Header>
            <div className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white">

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <h2 className="text-3xl lg:text-4xl font-bold drop-shadow">{movie.title}</h2>
                    {trailerKey && (
                        <button
                            onClick={() => setTrailerOpen(true)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition-colors w-fit shrink-0"
                        >
                            ▶ Watch Trailer
                        </button>
                    )}
                </div>

                <Dialog open={trailerOpen} onOpenChange={(open) => {
                    setTrailerOpen(open);
                }}>
                    <DialogContent className="max-w-3xl p-0 bg-black border-none">
                        <DialogTitle className="sr-only">{movie.title} Trailer</DialogTitle>
                        {trailerOpen && (
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                title={`${movie.title} Trailer`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="w-full aspect-video rounded-lg"
                            />
                        )}
                    </DialogContent>
                </Dialog>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <img
                        src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg w-full md:w-1/3 object-cover"
                    />
                    <img
                        src={`${BASE_IMAGE_URL}w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        className="rounded-lg w-full md:w-2/3 object-cover"
                    />
                </div>

                <p className="text-lg leading-relaxed mb-6 max-w-3xl">{movie.overview}</p>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-2">Director:</h3>
                    <p className="mb-2 text-gray-300">{credits.director}</p>
                    <h3 className="text-xl font-bold mb-2">Writers:</h3>
                    <p className="mb-2 text-gray-300">{credits.writers}</p>
                    <h3 className="text-xl font-bold mb-2">Stars:</h3>
                    <p className="text-gray-300">{credits.stars}</p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">More like this</h2>
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                        {moreLike.map((each) => (
                            <Link
                                href={`/movieDetails/${each.id}`}
                                key={each.id}
                            ><Card className="min-w-[180px] bg-neutral-100 dark:bg-gray-800 shadow-md">
                                    <CardContent className="p-0">
                                        <img
                                            src={`${BASE_IMAGE_URL}w500${each.poster_path}`}
                                            alt={each.title}
                                            className="w-full h-60 object-cover rounded-t-md"
                                        />
                                    </CardContent>
                                    <CardHeader className="px-3 py-2">
                                        <CardTitle className="text-sm truncate min-h-[20px]">
                                            <span className="bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm">
                                                ⭐ {each.vote_average.toFixed(1)} / 10
                                            </span>
                                        </CardTitle>
                                        <CardDescription className="text-sm font-bold truncate dark:text-neutral-200 text-black min-h-[40px]">
                                            {each.title}
                                        </CardDescription>
                                    </CardHeader>
                                </Card></Link>
                        ))}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}