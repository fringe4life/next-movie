import type{ MovieData } from "./Main";
import Image from "next/image";
export default async function MovieCard({Title, Poster, Plot, imdbRating, Genre, Runtime}: MovieData){
    
    

    return (
        <section className="mt-4 flex gap-4">
            <Image className="h-37 w-25 rounded-sm" src={Poster} width={100} height={148} alt={Title} />
            <section className="">
                <header><h2 className="text-2xl font-medium text-black text-lg">{Title}</h2><p className="ml-2">{imdbRating}</p></header>
                <div className="my-[0.625rem]"><p className="text-xs">{Runtime}</p><p className="text-xs">{Genre}</p></div>
                <p className="text-sm/6 max-w-[30ch] text-gray-500 ">{Plot}</p>
                
            </section>
        </section>
    )
}