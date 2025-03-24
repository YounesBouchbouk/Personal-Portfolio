import React, { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SkillItem from "./SkillesItem"
import { SkillsData } from "../Data/Skillesjs"

const Skills = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div
      id="MySkills"
      className="w-full py-16 flex flex-col justify-center items-center"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl"
      >
        {SkillsData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SkillItem item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Skills