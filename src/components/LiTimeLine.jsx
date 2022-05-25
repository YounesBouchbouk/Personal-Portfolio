import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 5 },
}
const LiTimeLine = ({ index, item }) => {
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
    <motion.li
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
      className="mb-10 ml-4"
      key={index}
    >
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {item.year} / {item?.city}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {item.title}
      </h3>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {item.description}
      </p>
      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
        {item.provider}
      </p>
      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
        {item.Link}
      </p>
    </motion.li>
  )
}

export default LiTimeLine
