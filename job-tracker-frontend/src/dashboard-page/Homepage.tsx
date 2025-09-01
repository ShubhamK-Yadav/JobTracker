import Dashboard from "./Dashboard";
import Searchbar from "./SearchBar";
import Sidebar from "./SideBar";
import {useEffect, useState} from 'react'

/* Add type description for Job
* Add types to each variable too
* Look into the useEffect function */
type Job = {
    company: string;
    jobRole: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
    url: string;
    salary: number;
}

export default function Homepage() {
    const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        async function fetchJobs(){
            try {
                const response = await fetch('http://localhost:8080/api/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data: Job[] = await response.json();
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs: ", err);
            }
        }

        fetchJobs();
    }, []);

    return (
        <>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <Searchbar/>
                    <a href="/" className="text-blue-800 text-md bg-white">
                        <button>Add Job</button>
                    </a>
                    //add jobs props to the Dashboard
                    <Dashboard jobs={jobs}/>
                </main>
            </div>
        </>
    )
}

