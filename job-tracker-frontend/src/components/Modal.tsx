import { createPortal } from "react-dom";
import JobForm from "./JobForm";
import { useState } from "react";
import { useNavigate } from "react-router";

type Job = {
  id: number;
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED";
  url: string;
  salary: number;
  createdAt: string;
};

type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

type Prop = {
  isActive: boolean;
  job: Job;
  onClose: () => (void);
  request: (id: number, jobData: jobData) => Promise<void>;
}

type HandleEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function Modal({ isActive, job, onClose, request }: Prop) {
  const [jobData, setJobData] = useState({
    company: job.company,
    jobRole: job.jobRole,
    jobDescription: job.jobDescription,
    appStage: job.appStage,
    url: job.url,
    salary: job.salary,
  });

  const navigate = useNavigate();

  const handleChange = (e: HandleEvent) => {
    // id identifies different fields
    const { id, value } = e.target;
    setJobData(prevState => ({ ...prevState, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await request(job.id, jobData);
    onClose();
    navigate("/jobs-table");
  }

  if (!isActive) return null;
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/60 ">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg opacity-100">
          <JobForm
            text="Edit Form"
            state={jobData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>,
    document.body
  );
}
