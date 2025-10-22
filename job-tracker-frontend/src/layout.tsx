import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import "./index.css";

export default function Layout() {
    const [theme, setTheme] = useState(getThemePreferences());

    // useEffect to only run function when change to "theme" is detected.
    useEffect(() => {
    if (theme  === "dark") {
        setThemePreferences(theme);
    } else {
        setThemePreferences('light');
    }
    }, [theme]);

    return (
        <>
            {/* depending on const theme, insert "dark" or "" */}
            <div className={`${theme == "dark" ? "dark" : ""} flex h-screen dark:bg-zinc-800`}>
                <main className="flex-1 overflow-y-auto">
                    <NavBar setTheme={setTheme} />
                    <Outlet />
                </ main>
            </div>
        </>
    )
}

function getThemePreferences() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function setThemePreferences(newTheme: string) {
    localStorage.setItem('theme', newTheme);
}
