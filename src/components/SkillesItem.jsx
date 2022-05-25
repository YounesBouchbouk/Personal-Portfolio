import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 5 },
}
const SkillesItem = ({ item }) => {
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
      className="lg:w-3/12 md:w-1/2 w-10/12 m-2 relative group transition-all duration-300 hover:bg-black lg:hover:w-1/3  bg-black-p-l rounded-md shadow-sm flex flex-row items-center justify-around p-4"
    >
      <div className="w-10/12 flex flex-col  p-2">
        <div className="w-full font-Ubuntu text-white text-sm mb-2 font-bold uppercase">
          {item.tech}
        </div>
        <div className="w-full bg-black-p rounded-md">
          <div
            className="w-full h-2 rounded-md bg-orange-400 shadow-sm shadow-black"
            style={{
              width: `${item.AVG}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="absolute top-0 hidden right-0 w-full h-full bg-white/50 rounded-md text-white group-hover:flex item-center justify-center">
        <p className="font-Merriweather  text-center text-xl font-bold flex items-center justify-centers ">
          {item.AVG} %
        </p>
      </div>
      <div className="w-auto">{item.icon}</div>
    </motion.div>
  )
}

export default SkillesItem
