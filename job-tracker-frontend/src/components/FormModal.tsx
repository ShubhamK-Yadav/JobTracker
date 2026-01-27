import { createPortal } from "react-dom";
import JobForm from "./JobForm";
import { useEffect, useState } from "react";

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
  title: string;
  isActive: boolean;
  job: Job | null;
  request: (jobData: jobData, id?: number) => Promise<void>;
  onClose: () => (void);
}

type HandleEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function FormModal({ title, isActive, job, request, onClose }: Prop) {
  const [jobData, setJobData] = useState({
    company: '',
    jobRole: '',
    jobDescription: '',
    appStage: "APPLIED",
    url: '',
    salary: 0,
  });

  useEffect(() => {
    if (job) {
      setJobData({
        company: job.company,
        jobRole: job.jobRole,
        jobDescription: job.jobDescription,
        appStage: job.appStage,
        url: job.url,
        salary: job.salary,
      })
    } else {
      setJobData({
        company: '',
        jobRole: '',
        jobDescription: '',
        appStage: "APPLIED",
        url: '',
        salary: 0,
      })
    }
  }, [job])

  const handleChange = (e: HandleEvent) => {
    // id identifies different fields
    const { id, value } = e.target;
    setJobData(prevState => ({ ...prevState, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (job) {
      await request(job, job.id);
    } else {
      await request(jobData);
    }
    onClose();
  }

  if (!isActive) return null;
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/60 ">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg opacity-100">
          <JobForm
            title={title}
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
