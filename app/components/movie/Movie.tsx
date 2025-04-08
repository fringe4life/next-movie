// "use client"
// import Image from "next/image";
// import starIcon from '../../../public/star.svg'
// import addToWatchList from '../../../public/add.svg'
// import removeFromWatchList from '../../../public/removeFromWatchlist.svg'
// import type React from "react";

// export type MovieData = {
//         Title: string;
//         imdbID: string;
//         Poster: string;
//         imdbRating: string;
//         Runtime: string
//         Plot: string;
//         Genre: string;
// }

// interface MovieCardProps {
//     movie: MovieData,
//     toggleMovies: (movie: MovieData) => void
// }

// export default function Movie({children}: React.ComponentPropsWithoutRef<"section">){
    
//     const titleToUse = (children as string).includes(":") ? (children as string).split(":")[1] : (children as string)
//     const iconToUse =  addToWatchList

//     return (
//         <section className="py-6 flex xs:gap-4 gap-2 dark:text-white">
//            {children}
//         </section>
//     )
// }

// function MovieContent({children}: React.ComponentPropsWithoutRef<"section">){
//     return <section className="xs:my-[0.625rem]">{children}</section>
// }

// function MovieImage({Poster, Title}: MovieData){
//     return <Image className="object-cover w-25 rounded-xs" src={Poster} width={100} height={148} alt={Title} />
// }

// function MovieHeader({children}: React.ComponentPropsWithoutRef<'header'>){
//     return (
//         <header className="flex items-center">
//             {children}
//         </header>
//     )
// }

// function MovieTitle({children}: React.ComponentPropsWithoutRef<"h2">){
//     return <h2 className="dark:text-white font-medium whitespace-wrap shrink text-black text-lg  text-ellipses line-clamp-1">{children}</h2>
// }

// function MovieStarRating(){
//     return <Image className="ml-2" src={starIcon} alt='star icon to show rating' width={16} height={16} />
// }

// function MovieRating({children}:React.ComponentPropsWithoutRef<'p'>){
//     return <p className="ml-1">{children}</p> // imdbRating
// }

// function MovieInformation({children}: React.ComponentPropsWithoutRef<'div'>){
//     return <div className="mt-[0.625rem] mb-[0.5rem] flex gap-1 xs:items-center flex-col xs:flex-row xs:gap-4">{children}</div>
// }

// function MovieParagraph({children}: React.ComponentPropsWithoutRef<'p'>){
//     <p className="text-xs">{children}</p> // Runtime or Genre
// }

// function MovieButton({children}:React.ComponentPropsWithoutRef<'button'>){
//     return <button onClick={() => {}} className="flex items-center gap-1 text-xs hover:cursor-pointer" type="button">{children}</button>
// }

// function MoviePlot({children}:React.ComponentPropsWithoutRef<'p'>){
//     <p className="text-sm/5  text-gray-500 dark:text-neutral-400  xs:line-clamp-3 text-ellipses">{children}</p> //Plot
// }
  // <Image className="dark:bg-white fill-white rounded-full" src={iconToUse} alt="add to watchlist icon" width={16} height={16} />Watchlist              
//                 
//                     
//                     <p className="text-xs xs:max-w-[20ch]">{Genre}</p>
//                     
//                 </div>
//                 
                
