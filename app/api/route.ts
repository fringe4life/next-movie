'use server'

import { type NextRequest, NextResponse } from "next/server"

type InitialMovieData = {
    title: string;
    id: number;
    poster_path: string;
}
type InitialResponse = {
    results: InitialMovieData[]
    Response: boolean
}

/**
 * @abstract fetches the movie data from the server
 * @param request the request object
 * @returns it returns either the movies found in the search or an error message
 */
export async function POST(request: NextRequest) {

    // const searchParams = request.nextUrl.searchParams;

    // const movieTitle = searchParams.get('movie');

    // const pageNumber = searchParams.get('page')
    // console.log(pageNumber, " pageNumber")
    // console.log(movieTitle, ' movie' )

    const {movie:movieTitle, page: pageNumber} = await request.json()
    if (!movieTitle) {

        console.log("no movie title")
        return NextResponse.json(undefined, { status: 400 })
    }
    const OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTH}`
        }
    }
    const initialUrl = `${process.env.BASE_URL}search/movie?query=${movieTitle}&page=${pageNumber}`
  
    const movieData = await fetch(initialUrl, OPTIONS)
    
    if (!movieData.ok) {
        return NextResponse.json(undefined, { status: 404 })
    }
    const initialMovies = await movieData.json() as InitialResponse
    const secondURL = `${process.env.BASE_URL}movie/`
    console.log(secondURL, ' secondURL')
    const fetchInParallel = initialMovies.results.map(({ id }) => fetch(`${secondURL}${id}`, OPTIONS))

    const jsonResponses = await Promise.all(fetchInParallel)

    const successfulResponses = jsonResponses.filter(response => response.ok)

    if (successfulResponses.length === 0) {
        return NextResponse.json(undefined, { status: 500 })
    }

    const movies = await Promise.all(successfulResponses.map(response => response.json()))

    // remove movies without a poster
    const filteredMovies = movies.filter(movie => { console.log(movie.poster_path); return  movie.poster_path !== null  })
   
    return NextResponse.json(filteredMovies, { status: 200 })
}
