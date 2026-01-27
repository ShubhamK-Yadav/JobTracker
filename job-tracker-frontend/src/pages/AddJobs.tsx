import JobForm from "../components/PostJobForm";

type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

export default function AddJobs() {
  const postJob = async (jobData: jobData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    }

    const response = await fetch('http://localhost:8080/api/jobs/add', requestOptions);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();

    if (!response.ok) {
      const error = (data && data.message) || response.status;
      console.log(isJson);
      console.log(response.body);
      return Promise.reject(error);
    }
    console.log("Data posted!")
  }

  return (
    <>
      <JobForm request={postJob} />
    </>
  )
}
