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
          Hi! I'm{" "}
          <span className="px-2 text-xl text-orange-300 font-Ubuntu">
            Younes Bouchbouk
          </span>{" "}
          <span>
            <br />
            🚀 I'm a Full Stack Engineer with an engineering degree and over 2 years of professional experience building modern web applications. My expertise spans both frontend and backend development, with a particular focus on JavaScript/TypeScript and Golang ecosystems.
            <br />
            <br />
            I currently work as a Full Stack Engineer at 21Factory, where I develop and maintain a SaaS platform built with Go microservices and React. I've built an event booking system using Domain-Driven Design principles and Hexagonal Architecture, which has deepened my expertise in Go while maintaining my React skills.
            <br />
            <br />
            Previously, I worked as a Full Stack Developer at ispapp.co (2022-2024), where I developed and maintained a cloud-based network management system for Internet Service Providers. I built reactive user interfaces with Next.js and developed scalable backend services using NestJS and Go.
            <br />
            <br />
            I also completed a 6-month internship at Oracle Labs, where I worked on the GraalVM and Graal Cloud Native ecosystem as a Software Developer. This experience strengthened my backend development skills and gave me valuable experience with Java and cloud technologies.
            <br />
            <br />
            My technical toolkit includes:
            • Frontend: React.js, Next.js, TypeScript, Tailwind CSS
            • Backend: Golang, Node.js, NestJS, Express.js, Java (Spring Boot)
            • Databases: MongoDB, PostgreSQL, MySQL, Redis
            • DevOps: Docker, Kubernetes, AWS
            <br />
            <br />
            I'm passionate about building efficient, maintainable, and user-friendly applications. I enjoy solving complex problems and continuously learning new technologies and approaches. I'm particularly interested in microservices architecture, cloud-native applications, and real-time systems.
            <br />
            <br />
            Let's connect and explore opportunities to create impactful software solutions together!
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default AboutMe
