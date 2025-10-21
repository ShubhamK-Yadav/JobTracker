import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import { useState } from "react";
import "./index.css";
//TODO: Make the theme change from "light" mode to "dark" mode throughout the web app.
//INFO: Use the localStorage to make the theme persist even after reload.
//Decide how I want to change the theme, either using "Context" or props.
export default function Layout() {
    const [theme, setTheme] = useState("");

    return (
        <>
            <div className={`${theme ? "dark" : ""} flex h-screen dark:bg-zinc-800`}>
                <main className="flex-1 overflow-y-auto">
                    <NavBar theme={theme} setTheme={setTheme} />
                    <Outlet />
                </ main>
            </div>
        </>
    )
}
