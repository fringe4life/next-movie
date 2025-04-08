import Image from "next/image"
import headerImage from '../../public/header.png'
interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    title: string
}
export default function Header({children, title}: HeaderProps){
    return (
        <header className="relative self-stretch   min-h-64  flex flex-col  justify-around   items-center xs:flex-row  ">
            
            <Image 
                src={headerImage} 
                alt="3 pictures of famous movies, Scarface, The Dark Night and The Godfather" 
                fill={true}
                placeholder="blur"
                quality={80}
                className="w-full h-inherit brightness-35 object-cover object-[55%_25%] "
            />
            <h1 className="z-1 font-extrabold text-[2.625rem] text-white">{title}</h1>
            {children}
        </header>
    )
}