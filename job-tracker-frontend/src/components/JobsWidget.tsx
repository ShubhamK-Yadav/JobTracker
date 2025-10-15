interface Job {
    id: number;
    company: string;
    jobRole: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
    url: string;
    salary: number;
    createdAt: string;
}

interface JobsWidgetProps{
    jobs: Job[];
    appStage: string;
}

export default function JobsWidget({jobs, appStage}: JobsWidgetProps){
    const mostRecentJobs = jobs.slice(0, 2)

    const recentJobs = () => {
        if (jobs.length === 0) {
            return (
                <p>No jobs to list</p>
            );
        } else {
            return (
                <>
                    <p>Most recent jobs:</p>
                    <ul>
                        {mostRecentJobs.map(jobs =>
                            <li key={jobs.id}>
                                Company: {jobs.company} <br/>
                                Job Role: {jobs.jobRole} <br/>
                            </li>
                        )}
                    </ul>
                </>
            );
        }
    }

    return (
        <div className="w-md h-1/7 bg-gray-100 text-sky-900 m-8">
           <h2>Jobs {appStage} Widget</h2>
           <p>{appStage}: {jobs.length}</p>
           {recentJobs()}
        </div>
    )
}
