
export default function Button({children, onClick}: React.ComponentPropsWithoutRef<"button">){

    return (
        <button 
        className="dark:bg-[#4b4b4b] dark:text-white px-8 xs:border-l-2  py-2 grow-1 basis-[20%] text-md font-semibold bg-gray-300 text-gray-700"
        onClick={onClick}
        type="submit">
            {children}
        </button>)
}
