import { useEffect, useState } from 'react'
import { CgAdd } from "react-icons/cg";
import JobsWidget from "../components/JobsWidget";
import FormModal from "../components/FormModal";

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

type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

export default function Homepage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [refreshJobs, setRefreshJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postJob = async (jobData: jobData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    }

    const response = await fetch('http://localhost:8080/api/jobs/add', requestOptions);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    setRefreshJobs(prev => prev + 1)

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      console.log(isJson);
      console.log(response.body);
      return Promise.reject(error);
    }
    console.log("Data posted!")
  }

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
  }, [refreshJobs])

  const appliedJobs = jobs.filter(jobs => jobs.appStage === "APPLIED")
  const rejectedJobs = jobs.filter(jobs => jobs.appStage === "REJECTED")

  return (
    <>
      <div className="bg-zinc-100 dark:bg-gray-800 rounded-md mt-3 px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh">
        <div className="flex justify-between">
          <h1 className="text-black text-start text-3xl font-Outlet"> Dashboard </h1>
          <button className="flex gap-1 bg-emerald-700 text-white text-md rounded-lg px-2 py-1 justify-center items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <CgAdd className="text-lg" />
            Add Job
          </button>
        </div>
        <div>
          <JobsWidget jobs={appliedJobs} appStage="Applied" />
          <JobsWidget jobs={rejectedJobs} appStage="Rejected" />
        </div>
      </div>

      {isModalOpen && (
        <FormModal
          title={"NEW JOB"}
          isActive={isModalOpen}
          job={null}
          request={postJob}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
