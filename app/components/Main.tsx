"use client"

import Form from "./form/Form";
import Input from "./form/Input";
import Button from "./form/Button";
import { Suspense} from "react";
import {  useSuspenseQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Image from "next/image";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"

import type { MovieData } from "./movie/MovieCard";
import EmptySection from "./EmptySection";

import vhs from "@public/vhs.svg"

import EmptyStateTitle from "./EmptyStateTitle";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieCard from "./movie/MovieCard";
import { useSearchParams, useRouter } from "next/navigation";


const  queryClient = new QueryClient()


export default function Home() {
    return (
        <QueryClientProvider client={queryClient} >
            <Suspense fallback={<p>loading...</p>}>
                <Main />
            </Suspense>
        </QueryClientProvider>
    )
}

export type Maybe<T> = T | null

function useMovie(movie: Maybe<string>, page: number){
    return useSuspenseQuery<MovieData[]>({
        queryKey: ["movie", movie, page],
        queryFn: async () => {
            return fetch('/api', {
                method: "POST",
                body: JSON.stringify({movie, page})
            }).then(res => res.json())
        },
        staleTime: Number.POSITIVE_INFINITY,
        gcTime: 1000 * 60 * 60 * 24 * 3
    })
}

 function Main() {
    const router = useRouter()
    const searchParams = useSearchParams();
    // state for managing the movie search
    const movie = searchParams.get('movie')
    const page = Number?.parseInt(searchParams.get("page") as string || '1'  ) 
    /**
     * this is the content to display based on the state of the query
     */
    const contentToDisplay = <EmptySection>
        <Image width='70' height='62' className="-translate-y-2" src={vhs.src} alt="old fashioned vhs tape icon" />
        <EmptyStateTitle className="-translate-y-2" title="Start exploring" />
    </EmptySection>

    function  handlePage() {
        const movie = searchParams.get('movie')
        const page = Number?.parseInt(searchParams.get("page") as string || '1'  ) 
        router.push(`?movie=${movie}&page=${page+1}`)
    }

    console.log(page)
    return (
        <main aria-live="polite" className="bg-white flex-1 items-center flex flex-col dark:bg-[#121212]">
            <Form  >
                <Input />
                <Button  >Search</Button>
            </Form>
                <Suspense fallback={<Loading />}>
                    {movie ? <Movies movie={movie} page={page} /> : contentToDisplay}
                    {movie ? <Button onClick={handlePage}>Next Page</Button> : null}
                </Suspense>
        </main>
    )

}

type MoviesProps = {
    movie: string;
    page: number;
}
function Movies({movie, page}: MoviesProps){
    const { data } = useMovie(movie, page)
    console.log(data)
    return data.filter(movie => movie.poster_path !== null).map((movie) => {
        console.log(movie)
    return <MovieCard key={movie.id} movie={movie} />
})
  

}