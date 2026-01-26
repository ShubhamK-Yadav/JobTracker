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
};

export default function JobRow({ job, loadJobData }: Props) {

  return (
    <tr>
      <td>{job.id}</td>
      <td>{job.company}</td>
      <td>{job.jobRole}</td>
      <td>{job.jobDescription}</td>
      <td>{job.appStage}</td>
      <td>{job.url}</td>
      <td>£{job.salary}</td>
      <td>{job.createdAt}</td>
      <td className="flex items-center justify-center gap-3">
        <button
          className="p-2 rounded-md hover:bg-gray-200 transition"
          title="Edit"
          onClick={() => loadJobData(job.id)}
        >
          <BsPencilFill className="text-gray-600 hover:text-blue-600" />
        </button>

        <button
          className="p-2 rounded-md hover:bg-gray-200 transition"
          title="Delete"
        >
          <BsFillTrashFill className="text-gray-600 hover:text-red-600" />
        </button>
      </td>
    </tr>
  )
}
