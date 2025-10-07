import {useNavigate} from "react-router"; 
import JobsWidget from "../components/JobsWidget";
import {useEffect, useState} from 'react'

// type definition
type Job = {
    id: number;
    company: string;
    jobRole: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"; 
    url: string;
    salary: number;
}

export default function Homepage() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([])
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/jobs');
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

                const data: Job[] = await response.json();
                console.log(response);
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs: ", err);
            }
        } 

        fetchJobs();
    }, []);

    const appliedJobs = jobs.filter(jobs => jobs.appStage === "APPLIED")
    const rejectedJobs = jobs.filter(jobs => jobs.appStage === "REJECTED") 

    return (
        <>
            <button className="bg-blue-800 text-white text-md" onClick={() => navigate("/add-job")}>Add Job</button>

            <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh ">
                <h1 className="text-center text-3xl font-Outlet, Navigation, pixelify-sans"> Dashboard </h1>
                <JobsWidget jobs={appliedJobs} appStage="Applied"/>
                <JobsWidget jobs={rejectedJobs} appStage="Rejected"/>
            </div>

        </>
    )
}
