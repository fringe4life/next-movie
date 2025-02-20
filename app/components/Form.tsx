

interface FormProps extends React.ComponentProps<"form"> {
    formAction: (payload: FormData) => void
    title: string
}

export default function Form({children, formAction, title}: FormProps){
    return (
        <form className="flex max-w-112 w-full shadow-sm -translate-y-1/2 rounded-md overflow-hidden" defaultValue={title}  action={formAction}>
            {children}
        </form>
    )

}