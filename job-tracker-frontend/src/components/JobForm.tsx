import {useState} from 'react';

export default function JobForm() {
    const [jobData, setJobData] = useState({
        company: '',
        jobRole: '',
        jobDescription: '',
        appStage: 'APPLIED',
        url: '',
        salary: ''
    });

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jobData)
    }

    const postJob = async () => {
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

    const handleChange = (e) =>{
        // name is used here mainly because html has `name` and `value`.
        const {id, value} = e.target;
        setJobData(prevState => ({...prevState, [id]: value}));
    } 

    return (
        <>
            <div>
                <form className="w-full max-w-lg">
                    <div className="w-full px-3 py-2">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="company">Company</label>
                        <input className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4" id="company" type="text" onChange={handleChange} />
                    </div>

                    <div className="w-full px-3 py-2">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="jobRole">Job Role</label>
                        <input className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4" id="jobRole" type="text" onChange={handleChange} />
                    </div>
                <div className="w-full px-3 py-2">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="jobDescription">Description</label>
                    <input className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4" id="jobDescription" type="text" onChange={handleChange} />
                </div>

                <div className="w-full px-3 py-2">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="appStage">Application Stage</label>
                    <select onChange={handleChange} id="appStage" defaultValue="APPLIED" className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4">
                        <option value="APPLIED"> Applied </option>
                        <option value="SCREENING"> Screening </option>
                        <option value="INTERVIEW"> Interview </option>
                        <option value="REJECTED"> Rejected </option>
                        <option value="ACCEPTED"> Accepted </option>
                    </select>
                </div>

                <div className="w-full px-3 py-2">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="url">URL</label>
                    <input className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4" id="url" type="text" onChange={handleChange} />
                </div>

                <div className="w-full px-3 py-2">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="salary">Salary</label>
                    <input className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4" id="salary" type="number" min="1000" step="1000" onChange={handleChange} />
                </div>
        </form>


            <button className="text-white font-semibold bg-sky-600 hover:bg-sky-700 rounded-full px-1 py-1.5" onClick={postJob}> Submit Job</button>

                <p>Selected App stage: {jobData.appStage}</p>
        </div>
        </>
    );
}
