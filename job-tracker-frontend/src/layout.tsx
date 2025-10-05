// import './App.css'
// import Homepage from './pages/Homepage'
//
// function App() {
//
//   return (
//     <>
//       <Homepage/>
//     </>
//   )
// }
//
// export default App
//TODO: Change this to layout.tsx
import {Outlet} from "react-router";
import Sidebar from "./components/SideBar";
import "./index.css";

export default function Layout() {
  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </ main>
      </div>
    </>
  )
}
