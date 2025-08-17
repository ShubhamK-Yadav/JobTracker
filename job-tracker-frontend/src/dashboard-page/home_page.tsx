import Dashboard from "./dashboard";
import Sidebar from "./sidebar";

function Homepage() {
    return (
        <>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <Dashboard />
                </main>
            </div>
        </>
    )
}

export default Homepage
