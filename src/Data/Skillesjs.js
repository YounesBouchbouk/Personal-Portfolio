import React from "react"
import { TiHtml5 } from "react-icons/ti"
import { DiNodejsSmall } from "react-icons/di"
import { GrGatsbyjs } from "react-icons/gr"
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
import { DiPython } from "react-icons/di"

export const SkillesData = [
  {
    tech: "HTML5",
    AVG: 80,
    icon: <TiHtml5 className="text-5xl text-white" />,
  },
  {
    tech: "CSS3",
    AVG: 85,
    icon: <SiCsswizardry className="text-5xl text-white" />,
  },
  {
    tech: "TailwindCSS",
    AVG: 60,
    icon: <SiTailwindcss className="text-5xl text-white" />,
  },
  {
    tech: "Javascript ES6",
    AVG: 70,
    icon: <SiJavascript className="text-5xl text-white" />,
  },
  {
    tech: "TypeScript",
    AVG: 50,
    icon: <SiTypescript className="text-5xl text-white" />,
  },
  {
    tech: "Solidity Contract",
    AVG: 40,
    icon: <SiSolidity className="text-5xl text-white" />,
  },
  {
    tech: "ReactJS",
    AVG: 75,
    icon: <SiReact className="text-5xl text-white" />,
  },
  {
    tech: "GatsbyJS",
    AVG: 50,
    icon: <GrGatsbyjs className="text-5xl text-white" />,
  },
  {
    tech: "NextJS",
    AVG: 50,
    icon: <SiNextdotjs className="text-5xl text-white" />,
  },
  {
    tech: "ReactNative",
    AVG: 50,
    icon: <SiReact className="text-5xl text-white" />,
  },
  {
    tech: "NodeJs",
    AVG: 60,
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
    AVG: 70,
    icon: <SiOracle className="text-5xl text-white" />,
  },
  {
    tech: "Pythone",
    AVG: 50,
    icon: <DiPython className="text-5xl text-white" />,
  },
]
