import React, { useEffect } from "react"
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsGithub,
} from "react-icons/bs"

import { AiOutlineFileText } from "react-icons/ai"

import { motion, useAnimation } from "framer-motion"
import { Link } from "gatsby"

const SideBar = () => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3 },
    }))
  }, [])
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  }

  const style = ``
  return (
    <motion.div
      initial="hidden"
      transition={{ duration: 1, ease: "easeInOut" }}
      animate="visible"
      variants={variants}
      className="fixed h-full w-[100px] px-2 flex flex-col cursor-pointer z-50  items-start justify-center transition-all duration-500 ease-in  "
    >
      <motion.div custom={0} animate={controls} className="flex relative group">
        <Link to="https://www.linkedin.com/in/younes-bouchbouk-71a355217/">
          <BsLinkedin className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        </Link>
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu shadow-sm  group-hover:inline transition-all duration-500 ease-in">
          LinkedIn
        </p>
      </motion.div>
      <motion.div custom={1} animate={controls} className="flex relative group">
        <Link to="https://github.com/YounesBouchbouk">
          <BsGithub className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        </Link>
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu  group-hover:inline transition-all duration-500 ease-in">
          Github
        </p>
      </motion.div>
      <motion.div custom={2} animate={controls} className="flex relative group">
        <Link to="https://twitter.com/BouchboukYounes">
          <BsTwitter className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        </Link>
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu   group-hover:inline transition-all duration-500 ease-in">
          Twitter
        </p>
      </motion.div>
      <div className="flex relative group">
        <Link to="https://www.facebook.com/younss.bouchbouk.3/">
          <BsFacebook className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        </Link>
        <p className="absolute left-8 hidden text-black-s  text-xs font-Ubuntu   group-hover:inline transition-all duration-500 ease-in">
          FACEBOOK
        </p>
      </div>

      <div className="flex relative group">
        <BsWhatsapp className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s   text-xs font-Ubuntu  group-hover:inline transition-all duration-500 ease-in">
          +212 680413729
        </p>
      </div>

      <div className="flex relative group">
        <a href="/CV_Younes_Bouchbouk.pdf" download>
          <AiOutlineFileText className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        </a>
        <p className="absolute left-8 hidden text-black-s   text-xs font-Ubuntu  group-hover:inline transition-all duration-500 ease-in">
          My Resume
        </p>
      </div>
    </motion.div>
  )
}

export default SideBar
