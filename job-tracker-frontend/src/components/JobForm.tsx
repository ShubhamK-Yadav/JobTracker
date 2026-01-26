type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

type Props = {
  text: string;
  state: jobData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function JobForm({ text, state, handleChange, handleSubmit }: Props) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center tracking-tight uppercase leading-tight mb-4">
        {text}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="company"
          >
            Company
          </label>
          <input
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
            id="company"
            type="text"
            onChange={handleChange}
            value={state.company}
          />
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="jobRole"
          >
            Job Role
          </label>
          <input
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
            id="jobRole"
            type="text"
            onChange={handleChange}
            value={state.jobRole}
          />
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="jobDescription"
          >
            Description
          </label>
          <input
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
            id="jobDescription"
            type="text"
            onChange={handleChange}
            value={state.jobDescription}
          />
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="appStage"
          >
            Application Stage
          </label>
          <select
            onChange={handleChange}
            id="appStage"
            defaultValue={state.appStage}
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
          >
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACCEPTED">Accepted</option>
          </select>
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="url"
          >
            URL
          </label>
          <input
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
            id="url"
            type="text"
            onChange={handleChange}
            value={state.url}
          />
        </div>

        <div>
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="salary"
          >
            Salary
          </label>
          <input
            className="block w-full bg-zinc-100 border border-gray-200 rounded py-3 px-4"
            id="salary"
            type="number"
            min="1000"
            step="1000"
            onChange={handleChange}
            value={state.salary}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mx-auto text-white font-semibold bg-sky-600 hover:bg-sky-700 rounded-full px-1 py-1.5"
            type="submit"
          >
            Submit Job
          </button>
        </div>
      </form>
    </>
  );
}
