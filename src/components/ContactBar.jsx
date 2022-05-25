import React, { useEffect } from "react"
import { GrTwitter } from "react-icons/gr"
import { MdAlternateEmail } from "react-icons/md"
import { motion, useAnimation } from "framer-motion"
import { AiTwotonePhone, AiOutlineMail } from "react-icons/ai"
import { GrFacebook } from "react-icons/gr"
import { GrLinkedinOption } from "react-icons/gr"

import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsGithub,
} from "react-icons/bs"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
}
const infovariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 0.5 } },
  hidden: { opacity: 0, scale: 1.5 },
}

function ContactBar() {
  const controls = useAnimation()

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  }
  return (
    <motion.div animate={controls} variants={infovariants} ref={ref}>
      <div className="flex flex-row justify-center ">
        <div className="mt-6  transition-all duration-150 w-full">
          <div className="flex flex-col justify-center items-center  ">
            <AiTwotonePhone className="text-6xl mr-4  text-black-s" />
            <p className="font-robot font-bold  text-xl text-white ">
              +212 680984938
            </p>
          </div>
        </div>

        <div className="mt-6  transition-all duration-150 w-full  ml-20">
          <div className="flex flex-col justify-center items-center  ">
            <AiOutlineMail className="text-6xl   text-black-s" />
            <p className="font-robot font-bold  text-xl text-white ">
              Younesbouchbouk.py@gmail.com
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactBar
