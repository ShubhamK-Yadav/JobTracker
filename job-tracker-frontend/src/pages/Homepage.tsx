import {useNavigate} from "react-router"; 
import Searchbar from "../components/SearchBar";
import Sidebar from "../components/SideBar";
import JobsWidget from "../components/JobsWidget";
import {useEffect, useState} from 'react'

/* Add type description for Job
* Add types to each variable too
* Look into the useEffect function */
type Job = {
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
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Searchbar/>
          <a href="/" className="text-blue-800 text-md bg-white">
            <button onClick={() => navigate("/")}>Add Job</button>
          </a>

          <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh ">
            <h1 className="text-center text-3xl font-Outlet, Navigation, pixelify-sans"> Dashboard </h1>
            <JobsWidget jobs={appliedJobs} appStage="Applied"/>
            <JobsWidget jobs={rejectedJobs} appStage="Rejected"/>
          </div>

        </main>
      </div>
    </>
  )
}
