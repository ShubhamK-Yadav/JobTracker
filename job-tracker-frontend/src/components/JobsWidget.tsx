type Job = {
  id: number;
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
  url: string;
  salary: number;
}

type JobsWidgetProps = {
  jobs: Job[];
  appStage: string;
}

export default function JobsWidget({ jobs, appStage }: JobsWidgetProps) {
  const mostRecentJobs = jobs.slice(0, 2)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          {appStage} Jobs
        </h2>
        <span className="bg-sky-100 text-sky-700 text-sm font-semibold px-3 py-1 rounded-full">
          {jobs.length}
        </span>
      </div>

      {jobs.length === 0 ? (
        <p className="text-slate-500 text-sm">No jobs in this stage yet.</p>
      ) : (
        <ul className="space-y-3">
          {mostRecentJobs.map(job => (
            <li
              key={job.id}
              className="p-3 bg-slate-50 rounded-lg border border-slate-100"
            >
              <p className="font-medium text-slate-700">{job.company}</p>
              <p className="text-sm text-slate-500">{job.jobRole}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
