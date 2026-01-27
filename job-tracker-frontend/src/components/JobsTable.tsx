import { useEffect, useState } from "react";
import JobRow from "./JobRow";
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";

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
  salary: number;
};

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadJobData = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const job = await response.json();
      setSelectedJob(job);
      setIsFormModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const updateJob = async (jobdata: jobData, id: number) => {
    const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobdata),
    });

    const data = await response.json();
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...data } : j)));

    if (!response.ok) return Promise.reject(data?.message || response.status);
  };

  const handleRequest = async (jobData: jobData, id?: number) => {
    if (!id) return;
    await updateJob(jobData, id);
  };

  const promptDelete = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const deleteJob = async (id: number) => {
    const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Failed to delete: ${response.status}`);
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:8080/api/jobs");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data: Job[] = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Jobs Dashboard</h1>
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
          onClick={() => setIsFormModalOpen(true)}
        >
          Add Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No jobs to list.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-200">
              <tr>
                {["ID", "Company", "Job Role", "Description", "Stage", "URL", "Salary", "Date", "Actions"].map(header => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-slate-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {jobs.map((job, idx) => (
                <tr
                  key={job.id}
                  className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-slate-50 hover:bg-slate-100"}
                >
                  <JobRow job={job} loadJobData={loadJobData} promptDelete={promptDelete} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormModalOpen && selectedJob && (
        <FormModal
          title="Edit Job"
          isActive={isFormModalOpen}
          job={selectedJob}
          request={handleRequest}
          onClose={() => setIsFormModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && selectedJob && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          jobId={selectedJob.id}
          request={deleteJob}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
