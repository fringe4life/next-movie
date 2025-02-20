interface StyledLink {
    text: string
}

export default function StyledLink ({text}: StyledLink){
    return (
        <span className="relative z-2 text-white  text-sm/8 font-bold hover:cursor-pointer">{text}</span>
    )
}