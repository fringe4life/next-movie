export default function Loading(){
    return (
        <div  className="w-full flex flex-col space-x-4 items-center">
                <div className="animate-pulse bg-gray-200 h-37 w-25 rounded-xs"/>
                    <div>
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6 w-48"/>
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6 w-32"/>
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6 w-48"/>
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6 w-48"/>
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6 w-48"/>
                </div>
        </div>
    )
}