"use client"

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { type JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const DynamicMovieCard = dynamic(() => import('./MovieCard'), { ssr: false })

import type { MovieData } from "./MovieCard";
import { usePathname } from "next/navigation";
import EmptySection from "./EmptySection";

import vhs from "@public/vhs.svg"
import addWatchlist from "@public/add.svg"

import notFound from "@public/not-found.svg"

import EmptyStateTitle from "./EmptyStateTitle";
import dynamic from "next/dynamic";

export default function Main() {
    // state for managing the movie search
    const [movie, setMovie] = useState<string>('')
    // state for managing the movie data
    const [movies, setMovies] = useState<MovieData[]>(window?.localStorage.getItem("movies") ? JSON.parse(window?.localStorage.getItem("movies") || "[]") : [])

    /**
     * this is the content to display based on the state of the query
     */
    let contentToDisplay: React.ReactNode = <EmptySection>
        <img className="-translate-y-2" src={vhs.src} alt="old fashioned vhs tape icon" />
        <EmptyStateTitle className="-translate-y-2" title="Start exploring" />
    </EmptySection>

    /**
     * @abstract updates the state
     * @param e the event from the form submission
     */
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
        if (!movies.some(m => m.imdbID === movie.imdbID)) {
            movies.push(movie)
            window?.localStorage.setItem("movies", JSON.stringify(movies))
        } else {
            const filteredMovies = movies.filter(m => m.imdbID !== movie.imdbID)
            window?.localStorage.setItem("movies", JSON.stringify(filteredMovies))
        }
        setMovies(window?.localStorage.getItem("movies") ? JSON.parse(window?.localStorage.getItem("movies") || "[]") : [])
        contentToDisplay = movies.map((movie) => <DynamicMovieCard toggleMovies={toggleMovieLocalStorage} key={movie.imdbID} movie={movie} />)
    }

    /**
     * @abstract fetches the movie data from the server
     */
    const { data, error, isLoading } = useQuery<MovieData[]>({
        queryKey: ["movie", movie],
        queryFn: async () => {
            return fetch(`/api?movie=${movie}`, {
                method: "GET",
            }).then(res => res.json())
        },
        enabled: !!movie,
    })

    if (isLoading) {
        contentToDisplay = <Loading />
    }
    else if (error) {
        contentToDisplay = <EmptySection>
            <img className="w-30 h-30" src={notFound.src} alt="Your movie wasn&apos;t found" />
            <EmptyStateTitle title="Unable to find what you&apos;re looking for. Please try another search." />
        </EmptySection>
    }
    else if (Array.isArray(data)) {
        contentToDisplay = data.map((movie) => <DynamicMovieCard toggleMovies={toggleMovieLocalStorage} key={movie.imdbID} movie={movie} />
        )
    }



    const pathName = usePathname()

    let displayForm: JSX.Element | null = <Form handleSubmit={handleSubmit} title={movie} >
        <Input />
        <Button pending={isLoading} />
    </Form>

    if (pathName === '/watchlist') {
        displayForm = null

        // fetch watchlist from local storage and map it to MovieCard component
        contentToDisplay = movies.map((movie) => <DynamicMovieCard toggleMovies={toggleMovieLocalStorage} key={movie.imdbID} movie={movie} />)

        if (movies.length === 0) contentToDisplay =
            <EmptySection  >
                <EmptyStateTitle title="Your watchlist is looking a little empty..." />


                <p className="text-sm text-[#363636]"><img src={addWatchlist.src} alt="add to watchlist" className="w-4 h-4 inline-block dark:fill-white" /> Let&apos;s add some movies!</p>

            </EmptySection>
    }

    return (
        <>

            <main aria-live="polite" className="bg-white flex-1 items-center  flex flex-col   dark:bg-[#121212]">
                {displayForm}
                {contentToDisplay}
            </main>
        </>
    )

}