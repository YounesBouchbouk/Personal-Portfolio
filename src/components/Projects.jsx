import React, { useState } from "react"
import ProjectCard from "./Cards/ProjectCard"
import ProjectPopUp from "./Cards/ProjectPopUp"
import SectionTitle from "./SectionTitle"
import { ProjectsData } from "../Data/Projects"

const Projects = ({ setPopUp, popup, setItem }) => {
  const [filter, setFiltred] = useState(ProjectsData)
  const [selected, setSelected] = useState("all")

  const letsFilter = name => {
    const newData = ProjectsData.filter(item => item.context === name)
    setFiltred(newData)
    setSelected(name)
  }

  return (
    <div id="Projects" className="w-full   relative">
      <SectionTitle label={"My Projects :"} />

      <div className="w-full   flex justify-center items-center">
        <div className="w-1/2 flex justify-around">
          <button
            className={`p-2 ${
              selected === "all"
                ? "bg-black-s text-white "
                : "bg-white text-black hover:bg-black-s hover:text-white"
            }   font-Ubuntu font-bold rounded-md shadow-md shadow-black`}
            onClick={() => {
              setFiltred(ProjectsData)
              setSelected("all")
            }}
          >
            All
          </button>
          <button
            className={`p-2 ${
              selected === "Internships"
                ? "bg-black-s text-white "
                : "bg-white text-black hover:bg-black-s hover:text-white"
            }   font-Ubuntu font-bold rounded-md shadow-md shadow-black`}
            onClick={() => {
              letsFilter("Internships")
            }}
          >
            Internships
          </button>
          <button
            className={`p-2 ${
              selected === "University"
                ? "bg-black-s text-white "
                : "bg-white text-black hover:bg-black-s hover:text-white"
            }   font-Ubuntu font-bold rounded-md shadow-md shadow-black`}
            onClick={() => {
              letsFilter("University")
            }}
          >
            University
          </button>
          <button
            className={`p-2 ${
              selected === "Self-Learning"
                ? "bg-black-s text-white "
                : "bg-white text-black hover:bg-black-s hover:text-white"
            }   font-Ubuntu font-bold rounded-md shadow-md shadow-black`}
            onClick={() => {
              letsFilter("Self-Learning")
            }}
          >
            Self-Learning
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center p-4">
        <div className="w-full flex flex-wrap justify-center items-center ">
          {filter.map(item => {
            return (
              <ProjectCard
                setPopUp={setPopUp}
                popup={popup}
                setItem={setItem}
                item={item}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects
