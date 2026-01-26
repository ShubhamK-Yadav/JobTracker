import { createPortal } from "react-dom";
import JobForm from "./JobForm";
import { useState } from "react";

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

// NOTE: Should take input text, handleSubmit should close the modal
export default function Modal({ isActive, job, onClose, request }: Prop) {
  const [jobData, setJobData] = useState({
    company: job.company,
    jobRole: job.jobRole,
    jobDescription: job.jobDescription,
    appStage: job.appStage,
    url: job.url,
    salary: job.salary,
  });

  const handleChange = (e: HandleEvent) => {
    // id identifies different fields
    const { id, value } = e.target;
    setJobData(prevState => ({ ...prevState, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request(job.id, jobData);
    onClose();
  }

  if (!isActive) return null;

  return createPortal(
    <JobForm
      text="Edit Form"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />,
    document.body
  );
}
