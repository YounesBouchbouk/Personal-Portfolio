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
            <br /> i have 21 yeas old . I'm a  Full-stack javascript developer adated
            with lastes technologie .
            <br /> I created my first page when I was 17 years old. It was a login page with HTML and CSS.
            <br />I entered this maze after getting my bachelor's degree.
            <br />
            In my educational career, I have worked on a lot of school
             and personal projects with different technologies : <br />
            <br />
              React , NodeJs , NextJs , Gastby , NextJs ....
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
