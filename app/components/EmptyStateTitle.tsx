
type EmptyStateTitleProps = {
    title: string
} & React.ComponentPropsWithoutRef<'h2'>

export default function EmptyStateTitle({className, title }: EmptyStateTitleProps){ 
    return (
        <h2 className={`text-lg text-center font-bold text-[#dfdddd] ${className}`}>{title}</h2>
    )
}