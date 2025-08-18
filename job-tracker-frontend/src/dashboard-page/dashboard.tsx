import AppliedJobsWidget from "./AppliedJobsWidget"

/* Add type for dashboard props
* Use prop as function as parameter.
* jobs.map to list the jobs and its properties in a list */

function Dashboard(){
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
