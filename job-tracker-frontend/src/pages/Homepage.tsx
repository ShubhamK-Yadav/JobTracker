import { useNavigate } from "react-router";
import { useEffect, useState } from 'react'
import { CgAdd } from "react-icons/cg";
import JobsWidget from "../components/JobsWidget";

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
            <div className="bg-zinc-100 dark:bg-gray-800 rounded-md mt-3 px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh">
                <div className="flex justify-between">
                    <h1 className="text-black text-start text-3xl font-Outlet"> Dashboard </h1>
                    <button className="flex gap-1 bg-emerald-700 text-white text-md rounded-lg px-2 py-1 justify-center items-center"
                        onClick={() => navigate("/add-job")}>
                        <CgAdd className="text-lg"/> Add Job
                    </button>
                </div>
                <div>
                    <JobsWidget jobs={appliedJobs} appStage="Applied" />
                    <JobsWidget jobs={rejectedJobs} appStage="Rejected" />
                </div>
            </div>
        </>
    )
}
