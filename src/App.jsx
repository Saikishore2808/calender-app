import Calendar from "./Calendar";
import { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen p-4 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center w-full">Calendar</h1>
        <button
          className="absolute right-4 top-4 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <Calendar />
    </div>
  );
}

export default App;
