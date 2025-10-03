import JobsWidget from "./JobsWidget"

/* Add type for dashboard props
* Use prop as function as parameter.
* jobs.map to list the jobs and its properties in a list */

interface Job {
    company: string;
    jobRole: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
    url: string;
    salary: number;
}

interface DashboardProps {
    jobs: Job[];
}

function Dashboard({jobs}: DashboardProps){
    const appliedJobs = jobs.filter(jobs => jobs.appStage === "APPLIED")
    const rejectedJobs = jobs.filter(jobs => jobs.appStage === "REJECTED")
    return(
       <>
           <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh ">
               <h1 className="text-center text-3xl font-pixelify-sans"> Dashboard </h1>
               <JobsWidget jobs={appliedJobs} appStage="Applied"/>
               <JobsWidget jobs={rejectedJobs} appStage="Rejected"/>
           </div>

       </>
   )
}

export default Dashboard
