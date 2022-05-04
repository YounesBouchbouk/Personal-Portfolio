import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import Me from "../images/Me2.png"
import react from "../images/React-icon.png"
import tailwind from "../images/Tailwind.png"
import node from "../images/node.png"
import SectionTitle from "./SectionTitle"
const HeroSection = () => {
  return (
    <div className="w-full transition-all duration-500 ease-out lg:h-screen dark:bg-black-p bg-slate-50 flex flex-col-reverse lg:flex-row items-center justify-center ">
      <div className="w-full px-12   lg:px-3  lg:w-1/2 p-4  ">
        <div className=" w-1/2 lg:w-1/3 flex flex-col justify-center items-center ">
          <p className="font-Ubuntu text-text-sm   lg:text-lg font-bold text-black-s">
            Full stack Developer
          </p>
        </div>

        <p className="text-4xl font-Monoton  text-black dark:text-white">
          YOUNES <span className="text-black-s text-6xl ">BOUCHBOUK</span>
        </p>

        <div className="text-left p-2 dark:text-slate-50 text-black-p  ">
          <p>
            I'm A passionate Full Stack Javascript Developer , Adapted with
            lastes Technologie And ready to learn any thing{" "}
          </p>
        </div>

        <p className="font-Merriweather text-xs font-bold text-black-s">
          // I code And I Know Things
        </p>
      </div>
      <div className="mt-16 p-4 lg:w-1/3  relative  flex items-center justify-center">
        <div
          className="w-full  rounded-full bg-white dark:bg-black-p-l "
          style={{
            width: 400,
            height: 400,
            overflow: "hidden",
          }}
        >
          <img
            src={Me}
            alt="Younes Bouchbouk Picture"
            style={{
              width: 500,
              height: 400,
            }}
          />
        </div>
        <div className="w-12 h-12 absolute  rounded-full top-5 left-14 flex flex-row items-center justify-center">
          <img
            className="h-10 w-14   mt-6 animate-pulse"
            src={react}
            alt="react Js"
          />
        </div>

        <div className="w-12 h-12 absolute rounded-full right-5 top-20 flex flex-row items-center justify-center">
          <img
            className="h-14 w-14 mt-6 animate-pulse"
            src={tailwind}
            alt="react Js"
          />
        </div>

        <div className="w-12 h-12 absolute  rounded-full bottom-8 left-14 flex flex-row items-center justify-center">
          <img
            className="h-16 w-14  mt-6 animate-pulse"
            src={node}
            alt="react Js"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
