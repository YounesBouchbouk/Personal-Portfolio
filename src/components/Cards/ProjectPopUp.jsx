import Me from "../../images/Me2.png"
import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BsGithub } from "react-icons/bs"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

function useOutsideAlerter(ref, setPopUp) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setPopUp(false)
      }
    }
    if (window !== "undefined") {
      // your document or window manipulation
      document.addEventListener("mousedown", handleClickOutside)
    }
    // Bind the event listener
    return () => {
      if (window !== "undefined") {
        // your document or window manipulation
        document.removeEventListener("mousedown", handleClickOutside)
      }
      // Unbind the event listener on clean up
    }
  }, [ref])
}

const ProjectPopUp = ({ setPopUp, popup, item }) => {
  console.log(item)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setPopUp)

  const [i, setI] = useState(0)

  const next = () => {
    if (i === item.images.length - 1) {
      setI(0)
    } else {
      setI(i + 1)
    }
  }

  const back = () => {
    console.log(i)
    if (i === 0) {
      setI(item.images.length - 1)
    } else {
      setI(i - 1)
    }
  }

  return (
    <motion.div
      key="box"
      exit={{
        opacity: 0,
        y: 100,
      }}
      initial={{
        scale: 0.5,
        opacity: 0,
        y: -100,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
      }}
      className="top-0 left-0  w-full h-screen flex justify-center items-center fixed"
    >
      <div
        className="w-11/12  bg-slate-300 flex h-4/5 rounded-lg overflow-hidden shadow-md shadow-black  "
        ref={wrapperRef}
      >
        <div className=" w-3/5 relative ">
          <button
            onClick={() => {
              next()
            }}
            className="w-4 bg-white/60 hover:bg-white/40 h-full absolute top-0 left-0"
          >
            {`<`}
          </button>
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={item.images[i]}
              alt="Img"
              className={
                item.title ===
                  "AntySemsar , Full Stack Mobile Application with ReactNative" ||
                item.title === "JAYBY , mobile Application"
                  ? "h-[500px]"
                  : ""
              }
            />
          </div>
          <div className="w-4 bg-white/60 hover:bg-white/40 h-full absolute top-0 right-0">
            <button
              onClick={() => {
                back()
              }}
              className="w-4 bg-white/60 hover:bg-white/40 h-full absolute top-0 left-0"
            >
              {`>`}
            </button>
          </div>
        </div>
        <div className="w-2/5 bg-black p-4 flex items-center justify-center">
          <div className="w-full  flex flex-col items-center justify-center">
            <p className="text-xl text-center  text-orange-400 font-Ubuntu">
              {item.title}
            </p>

            <div className="w-2/4 h-0.5 bg-white"></div>

            <div className="mt-4">
              <p className="text-white text-xs px-4">{item.description}</p>
            </div>

            <div className="w-full  flex justify-center items-center flex-wrap ">
              {item.technologies.map(item => {
                return (
                  <div className="px-2 m-3 ml-2 bg-orange-400 rounded-md h-7 flex items-center justify-center">
                    <p className=" text-white text-sm mt-5">{item}</p>
                  </div>
                )
              })}
            </div>

            <div className="w-full h-0.5 bg-white  mb-4"></div>

            <div className="w-full flex item-center justify-center">
              <Link to={item.github} className="p-2 ">
                <BsGithub className=" text-6xl text-orange-400 hover:text-white  " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectPopUp
