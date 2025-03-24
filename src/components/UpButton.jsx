import React from "react"

function Upbutton(props) {
  return (
    <div className="z-50 fixed bottom-8 right-8 cursor-pointer animate-bounce bg-black-s dark:bg-black-s flex justify-between rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300">
      <button
        onClick={props.scrollToTop}
        aria-label="Scroll to top"
        className="p-2 focus:outline-none focus:ring-2 focus:ring-black-s"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            fillRule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Upbutton
