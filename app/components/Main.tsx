"use client"

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useActionState } from "react";
import {  useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";



export type MovieData = {
		Title: string;
		imdbID: string;
		Poster: string;
		Response: boolean;
		Year: string;
		Ratings: Rating[];
		imdbId: string;
        imdbRating: string;
		Plot: string;
		Genre: string;
		Director: string;
		Writer: string;
		Actors: string;
        Language: string;
        Country: string;
        Metascore: string;
        Runtime: string
}


type Rating = {
    Source: string,
    Rating: string
}

const fetchMovies = async (movie: string) => {
    const response = await fetch(`/api?movie=${movie}`, {
                                            method: "GET",
                                        })
    if(!response.ok){
        throw new Error("An error occurred while fetching data")
    }
    const jsonResponse = await response.json()
    return jsonResponse

}
export default function Main(){
    const handleSubmit =  (prevState: string, formData: FormData): string => {
        const movie = formData.get("movie") as string
        return movie ? movie : prevState
    }
    const [movie, formAction, isPending ] = useActionState(handleSubmit, '')

    const { data, error, isLoading} = useQuery<MovieData[]>({
									queryKey: ["movie", movie],
									queryFn: async () => {
                                        const response = await fetch(`/api?movie=${movie}`, {
                                            method: "GET",
                                        })
                                        if(!response.ok){
                                            throw new Error("An error occurred while fetching data")
                                        }

                                        const jsonResponse = await response.json()
                                        return jsonResponse
                                    },
                                    enabled: !!movie
                                        
	})
    console.log(data, "data")
    let contentToDisplay = null
    if(isLoading){
        contentToDisplay = <p>loading...</p>
    }
    else if(error || !data){
        contentToDisplay = <p>Please check your internet connection or spelling</p>
    }
	else if(Array.isArray(data)){
        console.log(data, "data")
        contentToDisplay = data.map((movie) => <MovieCard key={movie.imdbID} {...movie} />)
    }
    return (
        <main>
            <Form formAction={formAction} title={movie} >
                <Input  />
                <Button pending={isPending} />
            </Form>
            {/* <ErrorBoundary fallback={<p>Please check your internet connection or spelling</p>}>
                <Suspense fallback={<p>loading...</p>}> */}
                    {contentToDisplay}
                {/* </Suspense>
            </ErrorBoundary> */}
        </main>
    )

}