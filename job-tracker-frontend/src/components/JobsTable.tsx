import { useEffect, useState } from 'react';
import JobRow from './JobRow';
// TODO: Change this component such that it can be page like the addJob form.

type Job = {
    id: number;
    company: string;
    jobRole: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED";
    url: string;
    salary: number;
    createdAt: string;
}

export default function JobsTable() {
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

        // Clicking the pencil icon should fetch the information about that job
        const editJobs = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                console.log(response);
            } catch (err) {
                console.error(`Failed to fetch job: ${id}`);
            }
        }
        editJobs(1);
        fetchJobs();
    }, []);

    const renderJobs = () => {
        if (jobs.length === 0) {
            return (
                <p> No jobs to list.</p>
            )
        } else {
            return (
                <>
                    <table className="w-4/5 mx-auto my-2 bg-slate-100 border-1 border-slate-400">
                        <thead>
                            <tr className="border-b-1 border-slate-400">
                                <th>ID</th>
                                <th>Company</th>
                                <th>Job Role</th>
                                <th>Job Description</th>
                                <th>Application Stage</th>
                                <th>URL</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <JobRow key={job.id} job={job} />
                            ))}
                        </tbody>
                    </table>
                </>
            )
        }
    }
    return (
        <>
            {renderJobs()}
        </>
    )
}

