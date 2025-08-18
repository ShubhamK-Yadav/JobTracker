import AppliedJobsWidget from "./AppliedJobsWidget"

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
