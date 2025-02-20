// interface MainProps extends React.ComponentProps<"main"> {}
"use client"

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { Suspense, useActionState, useState } from "react";
import {  useSuspenseQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import { ErrorBoundary } from "react-error-boundary";



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
export default function Main(){
    const handleSubmit =  (prevState: string, formData: FormData): string => {
        const movie = formData.get("movie") as string
        return movie ? movie : prevState
    }
    const [movie, formAction, isPending ] = useActionState(handleSubmit, '')

    const { data, error} = useSuspenseQuery<MovieData[]>({
									queryKey: ["movie", movie],
									queryFn: async () => {
										return fetch(`/api?movie=${movie}`, {
                                            method: "GET",
                                        }).then((res) => res.json())
                                       
                                    },
                                        
	})
    console.log(data, "data")
    let contentToDisplay = null
    if(error || !data){
        throw error
    }
	if(Array.isArray(data)){
        console.log(data, "data")
        contentToDisplay = data.map((movie) => <MovieCard key={movie.imdbID} {...movie} />)
    }
    return (
        <main>
            <Form formAction={formAction} title={movie} >
                <Input  />
                <Button pending={isPending} />
            </Form>
            <ErrorBoundary fallback={<p>Please check your internet connection or spelling</p>}>
                <Suspense fallback={<p>loading...</p>}>
                    {contentToDisplay}
                </Suspense>
            </ErrorBoundary>
        </main>
    )

}