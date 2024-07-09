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
            🚀 I'm Younes Bouchbouk, Full Stack web developer with an engineering degree. I have a strong background in front-end and back-end development.
            <br />
            From a young age, I have been fascinated by technology and its ability to transform the way we live and work. As a Full-Stack  developer, I have had the opportunity to work on a wide range of projects, from building responsive websites to developing complex web applications. This experience has allowed me to develop a deep understanding of the entire development process, from concept to deployment.

            <br />
            I want to let you know that I have one year of experience as a React and Next.js developer at a startup located in the US. Additionally, I spent nine months as a Software Developer Intern at the Oracle Research and Development Center as back-end engineer.

            <br />
            I believe that my skills in HTML/CSS/JS , React.Js , Next.Js and TailwindCss for front-end and GO, Node.Js and JAVA and for back-end , combined with my ability to solve complex problems and adapt and learn quickly, make me a great fit for any role.
            
            <br />
            Let's connect and explore the possibilities together! 🌟
            #FullStackDevelopment #JavaScript #Golang #Concurrency #Javascript 
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
