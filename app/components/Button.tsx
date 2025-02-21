interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    pending: boolean
}

export default function Button({pending}: ButtonProps){

    return (
        <button 
        className="px-8 xs:border-l-2  py-2 grow-1 basis-[20%] bg-white text-md font-semibold bg-gray-300 text-gray-700" 
        disabled={pending} 
        type="submit">
            Search
        </button>)
}
