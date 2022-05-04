import React from "react"
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
    <div className="w-full lg:h-screen  flex justify-center items-center">
      <div className="p-4  flex flex-wrap justify-around ">
        {SkillesData.map(item => {
          return (
            <div className="lg:w-3/12 md:w-1/2 w-10/12 m-2 relative group transition-all duration-300 hover:bg-black lg:hover:w-1/3  bg-black-p-l rounded-md shadow-sm flex flex-row items-center justify-around p-4">
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Skilles
