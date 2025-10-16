import {CiDark, CiLight} from "react-icons/ci";

export default function NavBar() {
    return (
        <>
            <div className="bg-zinc-50 flex justify-between">
                <h1 className="flex-initial p-2 font-bold text-orange-400 text-xl"> Job Tracker </h1>
                
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
                    
                    <button className="flex p-1 hover:bg-zinc-200 rounded-md w-10 h-10 items-center justify-center">
                        <CiLight className="text-lg"/>
                    </button>
                    
                    <button className="flex p-1 hover:bg-zinc-200 rounded-md w-10 h-10 items-center justify-center">
                        <CiDark className="text-lg"/>
                    </button>
                </div>
            </div>
        </>
    )
}
