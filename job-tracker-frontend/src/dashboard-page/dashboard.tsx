import AppliedJobsWidget from "./AppliedJobsWidget"

/* Add type for dashboard props
* Use prop as function as parameter.
* jobs.map to list the jobs and its properties in a list */

interface Job {
    company: string;
    jobDescription: string;
    appStage: "APPLIED" | "SCREENING" | "INTERVIEW" | "REJECTED" | "ACCEPTED"
    url: string;
    salary: number;
}

interface DashboardProps {
    jobs: Job[];
}

function Dashboard({jobs}: DashboardProps){
   return(
       <>
           <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-8 ring shadow-xl ring-gray-900/5 text-white h-lvh ">
               <h1 className="text-center text-3xl font-pixelify-sans"> Dashboard </h1>
               <AppliedJobsWidget/>
           </div>

       </>
   )
}

export default Dashboard
