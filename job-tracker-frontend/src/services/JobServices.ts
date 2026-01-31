const BASEURL = 'http://localhost:8080/api/jobs';

type jobData = {
  company: string;
  jobRole: string;
  jobDescription: string;
  appStage: string;
  url: string;
  salary: number
}

export const JobService = {
  async getJobs() {
    const response = await fetch(BASEURL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  },

  async getJobByID(id: number) {
    const response = await fetch(`${BASEURL}/${id}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  },

  async postJob(jobData: jobData) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    }

    const response = await fetch(BASEURL, requestOptions);
    if (!response.ok) throw new Error(`Failed to update: ${response.status}`);
    return response.json();
  },

  async updateJob(id: number, jobdata: jobData) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobdata),
    };

    const response = await fetch(`${BASEURL}/${id}`, requestOptions);
    if (!response.ok) throw new Error(`Failed to update: ${response.status}`);
    return response.json();
  },

  async deleteJob(id: number) {
    const requestOptions = {
      method: "DELETE",
    }
    const response = await fetch(`${BASEURL}/${id}`, requestOptions);
    if (!response.ok) throw new Error(`Failed to delete: ${response.status}`);
  }
}
