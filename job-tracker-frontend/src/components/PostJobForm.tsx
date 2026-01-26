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
        <JobForm
            text={"ADD JOB"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}
