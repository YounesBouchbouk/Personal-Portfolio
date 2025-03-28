import React, { useContext } from "react"
// import { ThemeContext } from "../mode/modeContext"

const Toggle = ({theme, setTheme}) => {
  // Handle the case when only theme is provided (static display)
  const isStatic = !setTheme;
  
  const handleToggle = () => {
    if (isStatic) return; // Do nothing if in static mode
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <div>
      {theme === "dark" ? (
        <button
          onClick={handleToggle}
          disabled={isStatic}
          className={`text-gray-400 dark:text-gray-400 bg-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent ${isStatic ? '' : 'cursor-pointer'}`}
          aria-label="Switch to light mode"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          onClick={handleToggle}
          disabled={isStatic}
          className={`text-gray-500 dark:text-gray-400 bg-white focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent ${isStatic ? '' : 'cursor-pointer'}`}
          aria-label="Switch to dark mode"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  )
}

export default Toggle
