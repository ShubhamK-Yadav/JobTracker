import { useState } from 'react';
import { useNavigate } from "react-router";
import JobForm from './JobForm';

type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

interface AddJob {
  request: (jobData: jobData) => Promise<void>;
}

type HandleEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function PostJobForm({ request }: AddJob) {
  const [jobData, setJobData] = useState({
    company: '',
    jobRole: '',
    jobDescription: '',
    appStage: 'APPLIED',
    url: '',
    salary: 0
  });

  const navigate = useNavigate();

  const handleChange = (e: HandleEvent) => {
    // id identifies different fields
    const { id, value } = e.target;
    setJobData(prevState => ({ ...prevState, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request(jobData);
    navigate("/");
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-400">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <JobForm
          text={"ADD JOB"}
          state={jobData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
