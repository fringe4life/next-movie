import { useSearchParams, useRouter } from "next/navigation"
import type{ Maybe } from "../Main"


export default function Form({children}: React.ComponentProps<"form">){
    const searchParams = useSearchParams()
    const router= useRouter();
    // const pathname = usePathname()
    /**
         * @abstract updates the state
         * @param e the event from the form submission
         */
        const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault()
            console.log("in handlesubmit")
            const params = new URLSearchParams(searchParams.toString());
            const formData = new FormData(e.currentTarget)
            const movie = formData.get("movie") as Maybe<string>
            const page = Number?.parseInt(params.get("page") as string || '1' )
            

            router.push(`?movie=${movie}&page=${page}`)
        }

    return (
        <form className="min-w-[85%] flex flex-col xs:flex-row border-2 border-gray-300    drop-shadow-lg xs:shadow-sm -translate-y-1/2 rounded-md overflow-hidden" defaultValue={searchParams.get('query') || ''}  onSubmit={handleSubmit}>
            {children}
        </form>
    )

}