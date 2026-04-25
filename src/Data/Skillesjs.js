import React from "react"
import { TiHtml5 } from "react-icons/ti"
import { DiNodejsSmall, DiPython, DiJava } from "react-icons/di"
import { FaProjectDiagram } from "react-icons/fa"
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiRedis,
  SiPostgresql,
} from "react-icons/si"

export const SkillsData = [
  {
    tech: "Golang",
    AVG: 90,
    icon: <SiGo className="text-5xl text-white" />,
  },
  {
    tech: "gRPC & service APIs",
    AVG: 88,
    icon: <FaProjectDiagram className="text-5xl text-white" />,
  },
  {
    tech: "TypeScript",
    AVG: 84,
    icon: <SiTypescript className="text-5xl text-white" />,
  },
  {
    tech: "Javascript ES6+",
    AVG: 85,
    icon: <SiJavascript className="text-5xl text-white" />,
  },
  {
    tech: "React.js",
    AVG: 86,
    icon: <SiReact className="text-5xl text-white" />,
  },
  {
    tech: "Next.js",
    AVG: 85,
    icon: <SiNextdotjs className="text-5xl text-white" />,
  },
  {
    tech: "Node.js",
    AVG: 80,
    icon: <DiNodejsSmall className="text-5xl text-white" />,
  },
  {
    tech: "HTML5/CSS3",
    AVG: 82,
    icon: <TiHtml5 className="text-5xl text-white" />,
  },
  {
    tech: "TailwindCSS",
    AVG: 86,
    icon: <SiTailwindcss className="text-5xl text-white" />,
  },
  {
    tech: "PostgreSQL",
    AVG: 82,
    icon: <SiPostgresql className="text-5xl text-white" />,
  },
  {
    tech: "MongoDB",
    AVG: 78,
    icon: <SiMongodb className="text-5xl text-white" />,
  },
  {
    tech: "MySQL",
    AVG: 70,
    icon: <SiMysql className="text-5xl text-white" />,
  },
  {
    tech: "Redis",
    AVG: 74,
    icon: <SiRedis className="text-5xl text-white" />,
  },
  {
    tech: "Docker",
    AVG: 84,
    icon: <SiDocker className="text-5xl text-white" />,
  },
  {
    tech: "Kubernetes",
    AVG: 80,
    icon: <SiKubernetes className="text-5xl text-white" />,
  },
  {
    tech: "AWS",
    AVG: 65,
    icon: <SiAmazonaws className="text-5xl text-white" />,
  },
  {
    tech: "Python",
    AVG: 62,
    icon: <DiPython className="text-5xl text-white" />,
  },
  {
    tech: "Java",
    AVG: 55,
    icon: <DiJava className="text-5xl text-white" />,
  },
]
