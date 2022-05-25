import React, { useEffect } from "react"
import {
  SiJavascript,
  SiCsswizardry,
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiOracle,
  SiSolidity,
  SiReact,
  SiNextdotjs,
  SiMongodb,
} from "react-icons/si"
import { TiHtml5 } from "react-icons/ti"
import { DiNodejsSmall } from "react-icons/di"
import { GrGatsbyjs } from "react-icons/gr"

import SectionTitle from "./SectionTitle"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SkillesItem from "./SkillesItem"

const SkillesData = [
  {
    tech: "HTML5",
    AVG: 80,
    icon: <TiHtml5 className="text-5xl text-white" />,
  },
  {
    tech: "CSS3",
    AVG: 75,
    icon: <SiCsswizardry className="text-5xl text-white" />,
  },
  {
    tech: "TailwindCSS",
    AVG: 70,
    icon: <SiTailwindcss className="text-5xl text-white" />,
  },
  {
    tech: "Javascript ES6",
    AVG: 90,
    icon: <SiJavascript className="text-5xl text-white" />,
  },
  {
    tech: "TypeScript",
    AVG: 70,
    icon: <SiTypescript className="text-5xl text-white" />,
  },
  {
    tech: "Solidity Contract",
    AVG: 50,
    icon: <SiSolidity className="text-5xl text-white" />,
  },
  {
    tech: "ReactJS",
    AVG: 75,
    icon: <SiReact className="text-5xl text-white" />,
  },
  {
    tech: "GatsbyJS",
    AVG: 75,
    icon: <GrGatsbyjs className="text-5xl text-white" />,
  },
  {
    tech: "NextJS",
    AVG: 75,
    icon: <SiNextdotjs className="text-5xl text-white" />,
  },
  {
    tech: "ReactNative",
    AVG: 60,
    icon: <SiReact className="text-5xl text-white" />,
  },
  {
    tech: "NodeJs",
    AVG: 70,
    icon: <DiNodejsSmall className="text-5xl text-white" />,
  },
  {
    tech: "MongoDB",
    AVG: 70,
    icon: <SiMongodb className="text-5xl text-white" />,
  },
  {
    tech: "MySql",
    AVG: 70,
    icon: <SiMysql className="text-5xl text-white" />,
  },
  {
    tech: "ORACLE",
    AVG: 80,
    icon: <SiOracle className="text-5xl text-white" />,
  },
]

const Skilles = () => {
  return (
    <div
      id="MySkilles"
      className="w-full lg:h-screen  flex justify-center items-center"
    >
      <div className="p-4  flex flex-wrap justify-around ">
        {SkillesData.map(item => {
          return <SkillesItem item={item} />
        })}
      </div>
    </div>
  )
}

export default Skilles
