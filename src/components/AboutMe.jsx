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
          — a software engineer who ships backend-heavy, cloud-native systems and honest UIs on top of them.
        </p>

        <p className="mt-4 text-black-p dark:text-gray-200">
          I work at <span className="font-bold">OmniLab by 21Factory</span> in Casablanca, where I own features end to end: from <span className="font-bold">event-driven</span> Go services and <span className="font-bold">gRPC</span> contracts to <span className="font-bold">React/Next.js</span> when the product needs a face.
        </p>

        <div className="mt-5">
          <p className="font-bold text-black-s">What I do</p>
          <ul className="list-disc ml-6 mt-2 text-black-p dark:text-gray-200">
            <li>Move systems toward <span className="font-bold">EDA</span> using patterns like <span className="font-bold">outbox</span>, <span className="font-bold">Debezium CDC</span>, <span className="font-bold">NATS JetStream</span>, and async workflows — not just “a message queue.”</li>
            <li>Model domains with <span className="font-bold">DDD</span> and <span className="font-bold">hexagonal architecture</span>; design APIs with <span className="font-bold">gRPC</span> and <span className="font-bold">Google AIP</span> where it helps.</li>
            <li>Run <span className="font-bold">OpenTelemetry</span>, <span className="font-bold">Prometheus</span>, and <span className="font-bold">DataDog</span> so production stays observable under load.</li>
            <li>Ship and operate on <span className="font-bold">Kubernetes</span>, <span className="font-bold">Docker</span>, and <span className="font-bold">GitLab CI</span>, with <span className="font-bold">TDD</span> and solid QA habits.</li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="font-bold text-black-s">Before this</p>
          <ul className="list-disc ml-6 mt-2 text-black-p dark:text-gray-200">
            <li><span className="font-bold">Oracle</span> (internship): testing for Graal Cloud Native guides; backend and Jupyter integration on a notebook data-science platform.</li>
            <li><span className="font-bold">ISPApp</span> (remote): a router-management dashboard and <span className="font-bold">Plotly</span>-driven real-time network metrics.</li>
          </ul>
        </div>

        <div className="mt-5">
          <p className="font-bold text-black-s">Core stack</p>
          <p className="mt-2 text-black-p dark:text-gray-200">
            Go, gRPC, NATS, Kubernetes, Docker, MongoDB, PostgreSQL, OpenTelemetry, DataDog, React, Next.js, TypeScript.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutMe
