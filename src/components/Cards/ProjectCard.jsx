import { motion, useAnimation } from "framer-motion"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const squareVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 15 },
}

const ProjectCard = ({ setPopUp, popup, item, setItem }) => {
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
      className="bg-white dark:bg-black-p-l w-full md:w-3/12 rounded-md overflow-hidden flex flex-col items-start relative m-4 border-y-2 border-black-s"
    >
      <img
        src={item.images[0]}
        alt="img1"
        className="rounded-md w-full h-56 "
      />

      <div className="px-2 w-full">
        <div className="w-full -mt-3 ">
          <p className="font-Ubuntu px-2 text-black text-base font-bold dark:text-white">
            {item.title}
          </p>
        </div>

        <div className="-mt-4 w-full flex items-center justify-start">
          <div className="w-full flex px-2  flex-wrap ">
            {item.technologies.map((item, index) => {
              return index < 3 ? (
                <p
                  key={index}
                  className="text-xs  font-serif uppercase dark:text-white"
                >
                  {item} ,
                </p>
              ) : null
            })}
          </div>
        </div>
        <div className="w-full  ">
          <button
            onClick={() => {
              setPopUp(true)
              setItem(item)
            }}
            className="w-full rounded-xl bg-orange-400 text-white text-lg font-Ubuntu my-2 h-10 hover:bg-orange-100 hover:text-black"
          >
            More Details ?
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
