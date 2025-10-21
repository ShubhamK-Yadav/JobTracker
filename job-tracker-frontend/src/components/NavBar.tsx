import {CiDark, CiLight} from "react-icons/ci";

interface navBarProps {
    theme: string;
    setTheme: (theme: string) => void;
}

//TODO: Theme change throughout the app and make it persist after reload.
export default function NavBar({theme, setTheme}: navBarProps) {

    return (
        <>
            <div className={`${theme ? "dark": ""} bg-zinc-100 flex justify-between dark:bg-zinc-400`}>
                <h1 className="flex-initial p-2 font-bold text-emerald-700 text-xl"> Job Tracker </h1>
                
                <div className="flex rounded-md items-center ml-auto">
                    <section className="items-center justify-end">
                        <form >
                            <input className="bg-white rounded-2xl w-md p-2 m-1 border border-zinc-200"
                                name="search_jobs" 
                                id="search_jobs" 
                                placeholder="Search Jobs">
                            </input>
                        </form>
                    </section>
                    
                    <button className="flex p-1 hover:bg-zinc-200 rounded-md w-10 h-10 items-center justify-center"
                    onClick={() => {setTheme("");}}>
                        <CiLight className="text-lg"/>
                    </button>
                    
                    <button className="flex p-1 hover:bg-zinc-200 rounded-md w-10 h-10 items-center justify-center"
                    onClick={() => {setTheme("dark");}}>
                        <CiDark className="text-lg"/>
                    </button>
                </div>
            </div>
        </>
    )
}
