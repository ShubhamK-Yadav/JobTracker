import {useState} from 'react';

export default function JobForm() {
    const [jobData, setJobData] = useState({
        company: '',
        jobRole: '',
        jobDescription: '',
        appStage: '',
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
            console.log(response);
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
                <form className="text-white">
                    <label htmlFor="company">Company</label>
                    <input id="company" type="text" onChange={handleChange} />

                    <label htmlFor="jobRole">Job Role</label>
                    <input id="jobRole" type="text" onChange={handleChange} />

                    <label htmlFor="jobDescription">Description</label>
                    <input id="jobDescription" type="text" onChange={handleChange} />

                    <label htmlFor="appStage">Stage</label>
                    <input id="appStage" type="text" onChange={handleChange} />

                    <label htmlFor="url">URL</label>
                    <input id="url" type="text" onChange={handleChange} />

                    <label htmlFor="salary">Salary</label>
                    <input id="salary" type="text" onChange={handleChange} />
                </form>

                <button className="text-white bg-black" onClick={postJob}> Submit Job</button>
            </div>
        </>
    );
}
