import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";

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

type Props = {
  job: Job;
  loadJobData: (id: number) => void;
  promptDelete: (job: Job) => void;
};

export default function JobRow({ job, loadJobData, promptDelete }: Props) {
  return (
    <>
      <td className="px-6 py-4 text-sm text-slate-700">{job.id}</td>
      <td className="px-6 py-4 text-sm text-slate-700">{job.company}</td>
      <td className="px-6 py-4 text-sm text-slate-700">{job.jobRole}</td>
      <td className="px-6 py-4 text-sm text-slate-700 truncate max-w-xs">{job.jobDescription}</td>
      <td className="px-6 py-4 text-sm text-slate-700 font-medium">{job.appStage}</td>
      <td className="px-6 py-4 text-sm text-blue-600 hover:underline">
        <a href={job.url} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </td>
      <td className="px-6 py-4 text-sm text-slate-700">£{job.salary}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{new Date(job.createdAt).toLocaleDateString()}</td>
      <td className="px-6 py-4 flex justify-center items-center gap-3">
        <button
          className="p-2 rounded-md hover:bg-blue-100 transition"
          title="Edit"
          onClick={() => loadJobData(job.id)}
        >
          <BsPencilFill className="text-blue-600" />
        </button>
        <button
          className="p-2 rounded-md hover:bg-red-100 transition"
          title="Delete"
          onClick={() => promptDelete(job)}
        >
          <BsFillTrashFill className="text-red-600" />
        </button>
      </td>
    </>
  );
}
