import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Toggle from "./toggle"

const Header = () => {
  const [showbar, setShowbar] = useState(false)

  const HidDrawer = () => {
    setShowbar(!showbar)
  }

  const linkstyle = `p-2 py-4 md:p-2 md:mr-4 hover:bg-slate-150  uppercase text-xs  text-slate-700  dark:text-white font-Merriweather`
  return (
    <header
      className={`w-full z-30 justify-between transition-all duration-500 ease-in fixed  flex items-center shadow-sm border-b-2 bg-white/50 border-black-p dark:border-black-s  dark:bg-black/50`}
    >
      <div className="rounder-full  p-2 w-28 flex justify-center items-center ">
        <Toggle />
      </div>
      <div className=" p-2 md:flex-1">
        <div
          className={` w-full my-2 p-2 ${
            showbar
              ? "flex   bg-white/60 dark:bg-black/50 h-screen md:h-auto"
              : "hidden md:flex"
          }   px-4 rounded-md absolute top-0 left-0 mt-14 flex-col items-center   md:p-0 md:my-0     md:bg-transparent    md:mt-0  md:relative  md:flex-row md:justify-start  `}
        >
          <Link to="/" className={linkstyle}>
            Home
          </Link>
          <Link to="/" className={linkstyle}>
            About
          </Link>
          <Link to="/" className={linkstyle}>
            Skilles
          </Link>
          <Link to="/" className={linkstyle}>
            Projects
          </Link>
          <Link to="/" className={linkstyle}>
            Contact
          </Link>
        </div>
      </div>

      <div className="items-center flex md:hidden mr-4  ">
        <button
          className="p-2 bg-black-s text-black-p dark:text-white hover:bg-blue-600 rounded-lg text-xs  uppercase font-bold "
          onClick={() => {
            HidDrawer()
            console.log("clicked me")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
