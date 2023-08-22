import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 5 },
}
const LiTimeLineOfEsp = ({ index, item }) => {
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
      <div className="w-full flex items-center justify-start gap-3 mb-4">
        <div className="bg-white w-[100px] h-[100px] rounded-full overflow-hidden items-center justify-center flex">
          <img
            src={item.imageUrl}
            style={{
              width: "105px",
              height: "105px",
            }}
          />
        </div>

        <div>
          <time className="mb-1 text-sm font-normal leading-none  dark:text-gray-400">
            <span className="text-xl font-bold">{item.Company} </span>.{" "}
            {item.Contract}
          </time>
          <h3 className="text-lg uppercase font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
        </div>
      </div>

      <p className="mb-4 text-small font-extralight text-gray-500 dark:text-gray-400">
        {item.description}
      </p>
      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
        {item.localisation}
      </p>
      <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
        <span className="font-bold text-sm underline">
          Leveraged Knowledge :
        </span>
        {" " + item.Competences}
      </p>
    </motion.li>
  )
}

export default LiTimeLineOfEsp
