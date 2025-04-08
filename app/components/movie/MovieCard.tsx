"use client"
import Image from "next/image";

import starIcon from '../../../public/star.svg'
import addToWatchList from '../../../public/add.svg'
// import removeFromWatchList from '../../public/removeFromWatchlist.svg'

export type InitialResponseObject = {
    overview: string;
    poster_path: string;
    title: string;
    original_language: string;
}

export type InitialResponse = {
    page: number;
    results: InitialResponseObject[];
    total_pages: number;
    total_results: number;
    id: number;
}


type Genres = {id: number, name: string}[]

export type MovieData = {
        title: string;
        id: number;
        imdbId: string
        poster_path: string;
        vote_average: number;
        runtime: number;
        overview: string;
        genres: Genres;
        release_date: string
}

interface MovieCardProps {
    movie: MovieData,
    // toggleMovies: (movie: MovieData) => void
}

export default function MovieCard({ movie:{ title, poster_path, overview, vote_average, genres, runtime}}: MovieCardProps){
    
    const titleToUse = title.includes(":") ? title.split(":")[1] : title
    const iconToUse =  addToWatchList

    const genresToDisplay = genres.flatMap(genre => genre.name).join(', ') || 'No genres'
    console.log()
    const imagePath = `https://image.tmdb.org/t/p/w500${poster_path}`
    return (
        <section className="py-6 flex xs:gap-4 gap-2 dark:text-white">
            <Image className="object-cover w-25 rounded-xs" src={imagePath} width={100} height={148} alt={title} />
            <section className="xs:my-[0.625rem]">
                <header className="flex items-center"> 
                    <h2 className="dark:text-white font-medium whitespace-wrap shrink text-black text-lg  text-ellipses line-clamp-1">{titleToUse}</h2>
                    <Image className="ml-2" src={starIcon} alt='star icon to show rating' width={16} height={16} />
                    <p className="ml-1">{vote_average}</p>
                </header>
                <div className="mt-[0.625rem] mb-[0.5rem] flex gap-1 xs:items-center flex-col xs:flex-row xs:gap-4">
                    <p className="text-xs">{runtime}</p>
                    <p className="text-xs xs:max-w-[20ch]">{genresToDisplay}</p>
                    <button onClick={() => {}} className="flex items-center gap-1 text-xs hover:cursor-pointer" type="button"><Image className="dark:bg-white fill-white rounded-full" src={iconToUse} alt="add to watchlist icon" width={16} height={16} />Watchlist</button>
                </div>
                <p className="text-sm/5  text-gray-500 dark:text-neutral-400  xs:line-clamp-3 text-ellipses">{overview}</p>
                
            </section>
        </section>
    )
}
// toggleMovies({imdbID, Title, Poster, Plot, imdbRating, Genre, Runtime})