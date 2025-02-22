
interface EmptySectionProps extends React.ComponentPropsWithoutRef<"section"> {
    

}



export default function EmptySection({children}: EmptySectionProps){
    return (
        
            <section className=" max-w-[30ch] flex-1 w-full flex flex-col justify-center justify-items-center items-center gap-2">
                {children}
            </section>
    )
}