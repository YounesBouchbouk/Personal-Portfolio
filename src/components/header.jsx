import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Toggle from "./toggle"
import { motion, useAnimation } from "framer-motion"
import { Link } from "react-scroll"
import Upbutton from "./UpButton"

const Header = () => {
  const [showbar, setShowbar] = useState(false)
  const controls = useAnimation()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const HidDrawer = () => {
    setShowbar(!showbar)
  }
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  }
  const linkstyle = `p-4 py-4 md:p-2 md:mr-4 cursor-pointer  hover:text-black-s  uppercase text-xs  text-slate-700  dark:text-white font-Ubuntu`
  return (
    <motion.header
      initial="hidden"
      transition={{ duration: 1 }}
      animate="visible"
      variants={variants}
      className={`w-full z-30 justify-between   transition-all duration-500 ease-in fixed  flex items-center shadow-sm border-b-2 bg-white/50 border-black-p dark:border-black-s  dark:bg-black/50`}
    >
      <div className={`p-2 hidden md:flex`}>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className={` w-full my-2 p-2 ${
            showbar
              ? "flex   bg-white/60 dark:bg-black/50 h-screen md:h-auto"
              : "hidden md:flex"
          }   px-4 rounded-md absolute top-0 left-0 mt-14 flex-col items-center   md:p-0 md:my-0     md:bg-transparent    md:mt-0  md:relative  md:flex-row md:justify-start  `}
        >
          <Link
            onClick={() => {
              HidDrawer()
              scrollToTop()
            }}
            to="Welcome"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Home
          </Link>

          <Link
            onClick={() => {
              HidDrawer()
            }}
            to="AboutMe"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            About
          </Link>
          <Link
            onClick={() => {
              HidDrawer()
            }}
            to="MySkilles"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Skilles
          </Link>
          <Link
            onClick={() => {
              HidDrawer()
            }}
            to="Projects"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Projects
          </Link>
          <Link
            onClick={() => {
              HidDrawer()
            }}
            to="Contact"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Contact
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="rounder-full  p-2 w-28 flex justify-center items-center "
      >
        <Toggle />
      </motion.div>
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
      <Upbutton scrollToTop={scrollToTop} />
    </motion.header>
  )
}

export default Header
