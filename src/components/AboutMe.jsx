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
      <div className="w-3/4  text-black  dark:text-white text-center leading-6 font-mono">
        <p>
          Hi ! I'm{" "}
          <span className="px-2 text-xl text-orange-300 font-Ubuntu">
            Younes Bouchbouk
          </span>{" "}
          <span>
            <br /> i have 21 yeas old . Full-stack javascript developer adated
            with lastes technologie
            <br /> I created my first page whene i was 17 yeas old it was a
            login page
            <br />I entred this muzz after i get my Bachelor's degree
            <br />
            In my education career i have worked on a lote of school and
            personal project with defirent technologies <br />
            but i foond my self in javascipt , so i stated discavoring some
            libreries and frameworks like
            <br />
            <span className="text-xl  leading-8">
              React , NodeJs , NextJs , Gastby , NextJs ....
            </span>
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
