import { useEffect, useState } from "react";
import JobRow from "./JobRow";
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";

// TODO: editJob -> Bring up Modal with pre-existing info to edit and save.
// TODO: The delete button should delete the job permanently (prompt user to make sure)

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

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadJobData = async (id: number) => {
    console.log("Loading Job Data!");
    try {
      const response = await fetch(
        `http://localhost:8080/api/jobs/${id}`,
      );

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const job = await response.json();
      setSelectedJob(job);
      setIsFormModalOpen(true);
      console.log(job);

    } catch (err) {
      console.error(`Failed to fetch job: ${id} ${err}`);
    }
  };

  const updateJob = async (id: number, jobdata: jobData) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobdata),
    }

    const response = await fetch(`http://localhost:8080/api/jobs/${id}`, requestOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
    const updatedJobs = jobs.map(j => (j.id === id ? { ...j, ...data } : j));
    setJobs(updatedJobs);

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      console.log(isJson, response.body);
      return Promise.reject(error);
    }
    console.log("Job Updated!");
  }

  const promptDelete = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  }

  const deleteJob = async (id: number) => {
    const requestOptions = {
      method: 'DELETE',
    }

    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}`, requestOptions);

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      console.log(response);
      // Update UI by filtering the list of jobs
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (err) {
      console.error("Failed to DELETE job due to: ", err);
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs");

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data: Job[] = await response.json();
        console.log(response);
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs: ", err);
      }
    };
    fetchJobs();
  }, []);

  const renderJobs = () => {
    if (jobs.length === 0) {
      return <p> No jobs to list.</p>;
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
              {jobs.map((job) => (
                <JobRow key={job.id} job={job} loadJobData={loadJobData} promptDelete={promptDelete} />
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };
  return <>
    {renderJobs()}
    {isFormModalOpen && selectedJob && (
      <>
        <FormModal
          isActive={isFormModalOpen}
          job={selectedJob}
          onClose={() => setIsFormModalOpen(false)}
          request={updateJob} />
      </>
    )}

    {isDeleteModalOpen && selectedJob && (
      <>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          jobId={selectedJob.id}
          request={deleteJob}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </>
    )}
  </>;
}
