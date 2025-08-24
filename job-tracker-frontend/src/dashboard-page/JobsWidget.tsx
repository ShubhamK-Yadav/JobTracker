interface Job {
    company: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
    url: string;
    salary: number;
}

interface JobsWidgetProps{
    jobs: Job[];
    appStage: string;
}


function JobsWidget({jobs, appStage}: JobsWidgetProps){
    return (
        <div className="w-md h-1/7 bg-gray-100 text-sky-900 m-8">
           <h2>Jobs {appStage} Widget</h2>
           <p>Applied to {jobs.length}</p>
           <ul>
               {jobs.map(jobs =>
                   <li key={jobs.id}>
                       Company: {jobs.company} <br/>
                       jobDescription: {jobs.jobDescription}
                   </li>
               )}
           </ul>
        </div>
    )
}

export default JobsWidget;
