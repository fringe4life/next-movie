"server only"

import {type NextRequest, NextResponse } from "next/server"


type InitialMovieData = {
    Title: string;
    imdbID: string;
    Poster: string;
}




export type InitialResponse = {
    Search: InitialMovieData[]
    Response: boolean
}


export async function GET(request: NextRequest){
    console.log("hello from api")

    const searchParams = request.nextUrl.searchParams;

    const movieTitle = searchParams.get('movie');

    if(!movieTitle){
        return NextResponse.json({error: "Missing movie title"}, {status: 400})
    }

    const movieData = await fetch(`${process.env.BASE_URL}?apikey=${process.env.API_KEY}&s=${movieTitle}&type=movie`)

    if(!movieData.ok){
        return NextResponse.json(undefined, {status: 500})
    }
    const initialMovies = await movieData.json() as InitialResponse
    const fetchInParallel = initialMovies.Search.map(({imdbID}) => fetch(`${process.env.BASE_URL}?apikey=${process.env.API_KEY}&i=${imdbID}`))
    
    console.log(fetchInParallel)
    const jsonResponses = await Promise.all(fetchInParallel)

    // check jsonResponses for errors

    const successfulResponses = jsonResponses.filter(response => response.ok)

    if(successfulResponses.length === 0){
        return NextResponse.json(undefined, {status: 500})
    }

    const movies = await Promise.all(successfulResponses.map(response => response.json()))
    console.log(movies)
    return NextResponse.json(movies, {status: 200})
}
