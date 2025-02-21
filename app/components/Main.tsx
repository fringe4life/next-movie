"use client"

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { type JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import Loading from "./Loading";


import type { MovieData } from "./MovieCard";
import { usePathname } from "next/navigation";



export default function Main(){
    // state for managing the movie search
    const [movie, setMovie] = useState('')

    /**
     * @abstract updates the state
     * @param e the event from the form submission
     */
    const handleSubmit: React.FormEventHandler<HTMLFormElement> =  (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const movie = formData.get("movie") as string
        setMovie(movie ? movie : "")
    }

    

    

    /**
     * @abstract adds or removes a movie from localStorage
     * @param movie the movie to add or remove from localStorage
     */
    const toggleMovieLocalStorage = (movie: MovieData) => {
        const existingMovies = JSON.parse(localStorage.getItem("movies") || "[]") as MovieData[]
        if(!existingMovies.some(m => m.imdbID === movie.imdbID)){
            existingMovies.push(movie)
            localStorage.setItem("movies", JSON.stringify(existingMovies))
        } else {
			const filteredMovies = existingMovies.filter(m => m.imdbID !== movie.imdbID)
            localStorage.setItem("movies", JSON.stringify(filteredMovies))
        }
    }

    /**
     * @abstract fetches the movie data from the server
     */
    const { data, error, isLoading} = useQuery<MovieData[]>({
									queryKey: ["movie", movie],
									queryFn: async () => {
                                        return  fetch(`/api?movie=${movie}`, {
                                            method: "GET",
                                        }).then(res => res.json())
                                    },
                                    enabled: !!movie,
	})
    /**
     * this is the content to display based on the state of the query
     */
    let contentToDisplay = null
    if(isLoading){
        contentToDisplay = <Loading />
    }
    else if(error ){
        contentToDisplay = <p>Please check your internet connection or spelling</p>
    }
	else if(Array.isArray(data)){
        console.log(data, "data")
        contentToDisplay = data.map((movie) => <MovieCard toggleMovies={toggleMovieLocalStorage} key={movie.imdbID} movie={movie} />)
    }


    const pathName = usePathname()
    console.log(pathName, " pathname")

    let displayForm: JSX.Element | null = <Form handleSubmit={handleSubmit} title={movie} >
                <Input  />
                <Button pending={isLoading} />
            </Form>

    if(pathName === '/watchlist'){
        displayForm = null
        contentToDisplay = localStorage.getItem("movies") ? 
            JSON.parse(localStorage.getItem("movies") || "[]").map((movie: MovieData) => <MovieCard toggleMovies={toggleMovieLocalStorage} key={movie.imdbID} movie={movie} />) : 
            <p>Your watchlist is empty</p>
    }

    return (
        <main className="mx-auto max-w-[34.375rem] flex flex-col items-center px-[2%]  xs:px-[5%] ">
            {displayForm}
            <section >{contentToDisplay}</section>        
        </main>
    )

}