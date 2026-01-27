type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

type FieldConfig = {
  id: keyof jobData;
  label: string;
  type: "text" | "number";
};

const fields: FieldConfig[] = [
  { id: "company", label: "Company", type: "text" },
  { id: "jobRole", label: "Job Role", type: "text" },
  { id: "jobDescription", label: "Description", type: "text" },
  { id: "url", label: "Job URL", type: "text" },
];

type Props = {
  title: string;
  state: jobData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function JobForm({ title, state, handleChange, handleSubmit, onCancel }: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
        {title}
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Input Template */}
        {fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={state[field.id]}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
          </div>
        ))}

        {/* Stage */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">
            Application Stage
          </label>
          <select
            id="appStage"
            value={state.appStage}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="REJECTED">Rejected</option>
            <option value="ACCEPTED">Accepted</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">
            Salary
          </label>
          <input
            id="salary"
            type="number"
            min="0"
            step="1000"
            value={state.salary}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 shadow-md transition"
          >
            Save Job
          </button>
        </div>
      </form>
    </>
  );
}
