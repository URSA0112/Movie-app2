'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/app/constants";
import { MovieDetail } from "@/app/types";


export default function MovieDetails() {
    const params = useParams();
    const slug = params?.slug as string;
    const movieId = slug.split("-").pop();
    console.log(movieId)

    const [movie, setMovie] = useState<MovieDetail | null>(null);


    useEffect(() => {
        if (!movieId) return;

        async function fetchMovie() {
            try {
                const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
                setMovie(response.data);
                // console.log(response)
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }
        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        const getMovieInfo = async () => {
            const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
            const info = response.data.crew; 
            console.log(info)
        }
        getMovieInfo()
    }, [])

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-lg my-4">{movie.overview}</p>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
            />
        </div>
    );
}