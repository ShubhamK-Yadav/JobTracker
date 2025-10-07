//TODO: Change this to layout.tsx
import {Outlet} from "react-router";
import NavBar from "./components/NavBar";
// import Sidebar from "./components/SideBar";
import "./index.css";

export default function Layout() {
    return (
        <>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
               <main className="flex-1 overflow-y-auto">
                    <NavBar/>
                    <Outlet />
                </ main>
            </div>
        </>
    )
}
