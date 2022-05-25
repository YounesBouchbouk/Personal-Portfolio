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
      <div className="w-3/4  text-black  dark:text-white">
        <p>
          Hi ! I'm <span>Younes</span>{" "}
          <span>
            Bouchbouk , i'm 22 yeas old .<br /> I 'm full-stack developer with a
            feature that i can learn and be adated with any technologie in the
            future <br />I created my first page whene i was 17 yeas old it was
            a login page
            <br />I entred this muzz after i get my Bachelor's degree and never
            find a way and get out ,<span>" Once you in nerver out "</span>
            <br />
            in my education career i have worked on a lote of school and
            personal project with defirent technologies <br />
            but i foond my self in javascipt , so i stated discavoring some
            libreries and frameworks like
            <span>
              ExpressJS and ExpressJS , NestJS , ReactJS , Gatsby ,Next ...
            </span>
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
