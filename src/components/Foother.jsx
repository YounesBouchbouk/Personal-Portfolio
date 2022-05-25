import React from "react"
import tailwindimg from "../images/Tailwind.png"
import motion from "../images/motion.png"
import gatsby from "../images/gatsby.png"

import Reacticon from "../images/React-icon.png"
import ContactBar from "./ContactBar.jsx"
const Foother = () => {
  return (
    <div className="bg-white dark:bg-black-p-l w-full p-4 flex flex-col justify-center items-center">
      <ContactBar />

      <div className="w-full flex-col md:flex-row  flex items-center justify-center py-2 px-8">
        <img src={Reacticon} alt="ReactJs" className="w-3/12 h-52 p-5" />
        <img src={tailwindimg} alt="TailwindCss" className="w-3/12 h-52 p-5" />
        <img src={gatsby} alt="gatsbyJS" className="w-3/12 h-52 p-5" />
        <img src={motion} alt="FramerMotion" className="w-3/12 h-52 p-5" />
      </div>
      <div className="w-full flex text-center border-t-2 border-black-s items-center justify-center">
        <p className="text-xs  text-black dark:text-white font-Merriweather mt-2">
          Powred by @YounesBouchbouk , All right reserved
        </p>
      </div>
    </div>
  )
}

export default Foother
