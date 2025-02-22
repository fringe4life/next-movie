"server only"

import { type NextRequest, NextResponse } from "next/server"


type InitialMovieData = {
    Title: string;
    imdbID: string;
    Poster: string;
}
type InitialResponse = {
    Search: InitialMovieData[]
    Response: boolean
}

/**
 * @abstract fetches the movie data from the server
 * @param request the request object
 * @returns it returns either the movies found in the search or an error message
 */
export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;

    const movieTitle = searchParams.get('movie');

    if (!movieTitle) {
        return NextResponse.json(undefined, { status: 400 })
    }

    const movieData = await fetch(`${process.env.BASE_URL}?apikey=${process.env.API_KEY}&s=${movieTitle}&type=movie`)

    if (!movieData.ok) {
        return NextResponse.json(undefined, { status: 404 })
    }
    const initialMovies = await movieData.json() as InitialResponse
    const fetchInParallel = initialMovies.Search.map(({ imdbID }) => fetch(`${process.env.BASE_URL}?apikey=${process.env.API_KEY}&i=${imdbID}`))

    const jsonResponses = await Promise.all(fetchInParallel)

    const successfulResponses = jsonResponses.filter(response => response.ok)

    if (successfulResponses.length === 0) {
        return NextResponse.json(undefined, { status: 500 })
    }

    const movies = await Promise.all(successfulResponses.map(response => response.json()))

    // remove movies without a poster
    const filteredMovies = movies.filter(movie => movie.Poster !== "N/A" || movie.Plot !== "N/A")
    console.log(filteredMovies)
    return NextResponse.json(filteredMovies, { status: 200 })
}
