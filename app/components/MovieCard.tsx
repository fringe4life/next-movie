"use client"
import Image from "next/image";
import starIcon from '../../public/star.svg'
import addToWatchList from '../../public/add.svg'
import removeFromWatchList from '../../public/removeFromWatchlist.svg'

export type MovieData = {
        Title: string;
        imdbID: string;
        Poster: string;
        imdbRating: string;
        Runtime: string
        Plot: string;
        Genre: string;
}

interface MovieCardProps {
    movie: MovieData,
    toggleMovies: (movie: MovieData) => void
}

export default function MovieCard({toggleMovies, movie:{imdbID, Title, Poster, Plot, imdbRating, Genre, Runtime}}: MovieCardProps){
    
    const titleToUse = Title.includes(":") ? Title.split(":")[1] : Title
    const iconToUse =  window?.localStorage.getItem("movies") ? 
    JSON.parse(window?.localStorage.getItem("movies") || "[]").some((m: MovieData) => m.imdbID === imdbID) ? 
    removeFromWatchList : 
    addToWatchList : 
    addToWatchList

    return (
        <section className="py-6 flex xs:gap-4 gap-2 dark:text-white">
            <Image className="object-cover w-25 rounded-xs" src={Poster} width={100} height={148} alt={Title} />
            <section className="xs:my-[0.625rem]">
                <header className="flex items-center"> 
                    <h2 className="dark:text-white font-medium whitespace-wrap shrink text-black text-lg  text-ellipses line-clamp-1">{titleToUse}</h2>
                    <Image className="ml-2" src={starIcon} alt='star icon to show rating' width={16} height={16} />
                    <p className="ml-1">{imdbRating}</p>
                </header>
                <div className="mt-[0.625rem] mb-[0.5rem] flex gap-1 xs:items-center flex-col xs:flex-row xs:gap-4">
                    <p className="text-xs">{Runtime}</p>
                    <p className="text-xs xs:max-w-[20ch]">{Genre}</p>
                    <button onClick={() => toggleMovies({imdbID, Title, Poster, Plot, imdbRating, Genre, Runtime})} className="flex items-center gap-1 text-xs hover:cursor-pointer" type="button"><Image className="dark:bg-white fill-white rounded-full" src={iconToUse} alt="add to watchlist icon" width={16} height={16} />Watchlist</button>
                </div>
                <p className="text-sm/5  text-gray-500 dark:text-neutral-400  xs:line-clamp-3 text-ellipses">{Plot}</p>
                
            </section>
        </section>
    )
}