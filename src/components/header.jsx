import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Toggle from "./toggle"
import { motion, useAnimation } from "framer-motion"
import { Link as ScrollLink } from "react-scroll"
import { Link as GatsbyLink } from "gatsby"
import Upbutton from "./UpButton"

const Header = ({ theme, setTheme }) => {
  // Use default theme if none provided (for static display in blog pages)
  const currentTheme = theme || "dark";
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
      className={`w-full z-50  justify-between transition-all duration-500 ease-in fixed flex items-center shadow-sm border-b-2 bg-white/90 border-black-p dark:border-black-s dark:bg-black/90 backdrop-blur-sm`}
    >
      {/* Desktop Navigation */}
      <div className={`p-2 hidden md:flex`}>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="flex px-4 md:p-0 md:my-0 md:relative md:flex-row md:justify-start"
        >
          <ScrollLink
            onClick={scrollToTop}
            to="Welcome"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="AboutMe"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            About
          </ScrollLink>
          <ScrollLink
            to="MySkilles"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Skills
          </ScrollLink>
          <ScrollLink
            to="Projects"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Projects
          </ScrollLink>
          <GatsbyLink
            to="/blog"
            className={`p-4 py-4 md:p-2 md:mr-4 cursor-pointer hover:text-black-s uppercase text-xs text-slate-700 dark:text-white font-Ubuntu`}
          >
            Blog
          </GatsbyLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            duration={1500}
            className={linkstyle}
          >
            Contact
          </ScrollLink>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu (Visible when showbar is true) */}
      {showbar && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-14 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-lg z-40 py-4 px-2 flex flex-col items-center md:hidden"
        >
          <ScrollLink
            onClick={() => {
              HidDrawer()
              scrollToTop()
            }}
            to="Welcome"
            spy={true}
            smooth={true}
            duration={1500}
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white"
          >
            Home
          </ScrollLink>

          <ScrollLink
            onClick={HidDrawer}
            to="AboutMe"
            spy={true}
            smooth={true}
            duration={1500}
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white"
          >
            About
          </ScrollLink>
          <ScrollLink
            onClick={HidDrawer}
            to="MySkilles"
            spy={true}
            smooth={true}
            duration={1500}
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white"
          >
            Skills
          </ScrollLink>
          <ScrollLink
            onClick={HidDrawer}
            to="Projects"
            spy={true}
            smooth={true}
            duration={1500}
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white"
          >
            Projects
          </ScrollLink>
          <GatsbyLink
            onClick={HidDrawer}
            to="/blog"
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white hover:text-black-s"
          >
            Blog
          </GatsbyLink>
          <ScrollLink
            onClick={HidDrawer}
            to="contact"
            spy={true}
            smooth={true}
            duration={1500}
            className="p-3 w-full text-center font-Ubuntu uppercase text-sm text-slate-700 dark:text-white"
          >
            Contact
          </ScrollLink>
        </motion.div>
      )}

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="rounder-full p-2 w-28 flex justify-center items-center"
      >
        <Toggle theme={currentTheme} setTheme={setTheme} />
      </motion.div>
      
      {/* Mobile Menu Toggle Button */}
      <div className="items-center flex md:hidden mr-4">
        <button
          className="p-2 bg-black-s text-black-p dark:text-white hover:bg-blue-600 rounded-lg text-xs uppercase font-bold transition-all duration-300"
          onClick={HidDrawer}
          aria-label={showbar ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {showbar ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </motion.header>
  )
}

export default Header
