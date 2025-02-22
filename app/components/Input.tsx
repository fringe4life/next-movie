import searchIcon from "../../public/searchIcon.svg"
import Image from "next/image"
export default function Input(){
    return <div className="grow-3 shrink width-[70%]">
        <Image src={searchIcon} alt="search icon" width={20} height={20} className="absolute translate-1/2"  />
        <input aria-label="This input is for entering the movie you would like to search for" className="pl-12 placeholder-text-center text-gray-500 w-full  bg-gray-100 dark:text-neutral-400  dark:bg-[#2E2E2F] p-2 "type="text" name="movie"  placeholder="Blade Runner"/>
    </div>
}