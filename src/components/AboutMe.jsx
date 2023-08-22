import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import SectionTitle from "./SectionTitle"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
}

const AboutMe = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="w-full  flex justify-center items-center my-16"
      id="AboutMe"
    >
      <div className="w-3/4  text-black  dark:text-white text-start leading-6 font-mono space-x-5">
        <p>
          Hi ! I'm{" "}
          <span className="px-2 text-xl text-orange-300 font-Ubuntu">
            Younes Bouchbouk
          </span>{" "}
          <span>
            <br />
            🚀 Currently, I'm on an exciting journey, delving deep into Golang
            and the intricacies of concurrency. My fascination with gRPC API is
            leading me to explore new horizons in the world of backend
            development.
            <br />
            <br />
            🛠️ Throughout my journey, I've successfully contributed to a diverse
            range of projects, both as an independent freelancer and in
            collaborative educational endeavors. With over a year of hands-on
            experience under my belt, I've honed my skills and insights to
            consistently deliver high-quality solutions.
            <br />
            <br />
            Let's connect and explore the possibilities together! 🌟
            #FullStackDevelopment #JavaScript #Golang #Concurrency #React #gRPC
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
