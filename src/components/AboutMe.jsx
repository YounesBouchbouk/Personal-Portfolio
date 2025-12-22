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
      <div className="w-3/4 text-black dark:text-white text-start leading-7 font-mono">
        <p>
          Hi, I'm{" "}
          <span className="px-2 text-xl text-orange-300 font-Ubuntu">
            Younes Bouchbouk
          </span>
          — a Software Engineer focused on building scalable, cloud-native systems.
        </p>

        <p className="mt-4 text-black-p dark:text-gray-200">
          I currently work at <span className="font-bold">OmniLab by 21Factory</span>, where I build Go microservices and modern web experiences. I care about clean architecture, resilience, and delivering features that perform under real production constraints.
        </p>

        <div className="mt-5">
          <p className="font-bold text-black-s">What I do</p>
          <ul className="list-disc ml-6 mt-2 text-black-p dark:text-gray-200">
            <li>Design and implement <span className="font-bold">Golang microservices</span> using <span className="font-bold">DDD</span> and <span className="font-bold">Hexagonal/Clean Architecture</span>.</li>
            <li>Build efficient APIs with <span className="font-bold">gRPC</span> and production-grade observability with <span className="font-bold">Datadog</span>, <span className="font-bold">OpenTelemetry</span>, and <span className="font-bold">ClickStack</span>.</li>
            <li>Deploy and operate services on <span className="font-bold">Kubernetes</span> with Docker and CI/CD (GitLab).</li>
            <li>On the frontend, ship React/Next.js apps; recently I built immersive <span className="font-bold">AR experiences with Three.js</span>.</li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="font-bold text-black-s">Highlights</p>
          <ul className="list-disc ml-6 mt-2 text-black-p dark:text-gray-200">
            <li>Domain expert for two microservices: the <span className="font-bold">Event Booking</span> microservice and the <span className="font-bold">SmartLink</span> microservice.</li>
            <li>Integrated <span className="font-bold">Datadog</span> for monitoring, logging, and performance insights.</li>
            <li>Applied <span className="font-bold">TDD</span> to improve reliability and maintainability.</li>
            <li>At <span className="font-bold">Oracle</span>, worked on a notebook-based data science platform: Jupyter integration (themes + system file access) and embedding Jupyter via iframes.</li>
            <li>At <span className="font-bold">ISPApp</span>, built a router-management dashboard and visualized real-time metrics using <span className="font-bold">Plotly</span>.</li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="font-bold text-black-s">Core stack</p>
          <p className="mt-2 text-black-p dark:text-gray-200">
            Go, gRPC, Kubernetes, Docker, Datadog, React, Next.js, TypeScript, Node.js.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutMe
