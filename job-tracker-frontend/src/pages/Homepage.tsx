import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { CgAdd } from "react-icons/cg";
import { FaSuitcase } from "react-icons/fa6";
import JobsWidget from "../components/JobsWidget";
import FormModal from "../components/FormModal";
import { JobService } from '../services/JobServices';

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
    await JobService.postJob(jobData);
    setRefreshJobs(prev => prev + 1)
    console.log("Data posted!")
  }

  useEffect(() => {
    const fetchJobs = async () => {
      const data: Job[] = await JobService.getJobs();
      setJobs(data);
    }
    fetchJobs();
  }, [refreshJobs])

  const navigate = useNavigate();
  const appliedJobs = jobs.filter(jobs => jobs.appStage === "APPLIED")
  const rejectedJobs = jobs.filter(jobs => jobs.appStage === "REJECTED")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Job Tracker Dashboard
          </h1>

          {/* Buttons container */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-xl shadow-md transition"
            >
              <CgAdd className="text-xl" />
              Add Job
            </button>

            <button
              onClick={() => navigate("/jobs-table")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md transition"
            >
              <FaSuitcase className="text-lg" />
              Jobs
            </button>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <JobsWidget jobs={appliedJobs} appStage="Applied" />
          <JobsWidget jobs={rejectedJobs} appStage="Rejected" />
        </div>
      </div>

      {isModalOpen && (
        <FormModal
          title="New Job"
          isActive={isModalOpen}
          job={null}
          request={postJob}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
