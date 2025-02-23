

interface FormProps extends React.ComponentProps<"form"> {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    title: string
}

export default function Form({children, handleSubmit, title}: FormProps){
    return (
        <form className="min-w-[85%] flex flex-col xs:flex-row border-2 border-gray-300    drop-shadow-lg xs:shadow-sm -translate-y-1/2 rounded-md overflow-hidden"defaultValue={title}  onSubmit={handleSubmit}>
            {children}
        </form>
    )

}