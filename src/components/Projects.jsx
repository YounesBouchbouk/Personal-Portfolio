import React, { useState, useEffect } from "react"
import ProjectCard from "./Cards/ProjectCard"
import ProjectPopUp from "./Cards/ProjectPopUp"
import SectionTitle from "./SectionTitle"
import { ProjectsData } from "../Data/Projects"
import { motion, AnimatePresence } from "framer-motion"

const Projects = ({ setPopUp, popup, setItem }) => {
  const [filter, setFiltred] = useState(
    ProjectsData.filter(item => item.context.includes("top"))
  )
  const [selected, setSelected] = useState("top")
  const [showTechFilters, setShowTechFilters] = useState(false)
  const [techFilter, setTechFilter] = useState("")
  
  // Get unique technologies from all projects
  const allTechnologies = [...new Set(ProjectsData.flatMap(project => project.technologies))]
    .sort((a, b) => a.localeCompare(b))

  // Apply both context and tech filters
  useEffect(() => {
    let filteredProjects = ProjectsData;
    
    // Apply context filter if not "all"
    if (selected !== "all") {
      filteredProjects = filteredProjects.filter(item => 
        item.context.includes(selected)
      );
    }
    
    // Apply tech filter if one is selected
    if (techFilter) {
      filteredProjects = filteredProjects.filter(item =>
        item.technologies.includes(techFilter)
      );
    }
    
    setFiltred(filteredProjects);
  }, [selected, techFilter]);

  const letsFilter = name => {
    setSelected(name)
  }
  
  // Reset tech filter
  const clearTechFilter = () => {
    setTechFilter("")
  }

  return (
    <div id="Projects" className="w-full relative">
      <SectionTitle label={"My Projects"} />

      {/* Context filters */}
      <div className="w-full flex justify-center items-center mb-4">
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-wrap justify-center gap-2">
          <button
            className={`p-2 text-xs md:text-sm ${
              selected === "all"
                ? "bg-black-s text-white "
                : "bg-white dark:bg-black-p text-black dark:text-white hover:bg-black-s hover:text-white"
            } font-Ubuntu font-bold rounded-md shadow-md`}
            onClick={() => {
              setSelected("all")
            }}
          >
            All
            {` (${ProjectsData.length})`}
          </button>

          <button
            className={`p-2 text-xs md:text-sm ${
              selected === "top"
                ? "bg-black-s text-white "
                : "bg-white dark:bg-black-p text-black dark:text-white hover:bg-black-s hover:text-white"
            } font-Ubuntu font-bold rounded-md shadow-md`}
            onClick={() => {
              letsFilter("top")
            }}
          >
            Top{" "}
            {`(${
              ProjectsData.filter(item => item.context.includes("top")).length
            })`}
          </button>
          <button
            className={`p-2 text-xs md:text-sm ${
              selected === "Internships"
                ? "bg-black-s text-white "
                : "bg-white dark:bg-black-p text-black dark:text-white hover:bg-black-s hover:text-white"
            } font-Ubuntu font-bold rounded-md shadow-md`}
            onClick={() => {
              letsFilter("Internships")
            }}
          >
            Internships{" "}
            {`(${
              ProjectsData.filter(item => item.context.includes("Internships"))
                .length
            })`}
          </button>
          <button
            className={`p-2 text-xs md:text-sm ${
              selected === "University"
                ? "bg-black-s text-white "
                : "bg-white dark:bg-black-p text-black dark:text-white hover:bg-black-s hover:text-white"
            } font-Ubuntu font-bold rounded-md shadow-md`}
            onClick={() => {
              letsFilter("University")
            }}
          >
            University{" "}
            {`(${
              ProjectsData.filter(item => item.context.includes("University"))
                .length
            })`}
          </button>
          <button
            className={`p-2 text-xs md:text-sm ${
              selected === "Self-Learning"
                ? "bg-black-s text-white "
                : "bg-white dark:bg-black-p text-black dark:text-white hover:bg-black-s hover:text-white"
            } font-Ubuntu font-bold rounded-md shadow-md`}
            onClick={() => {
              letsFilter("Self-Learning")
            }}
          >
            Self-Learning{" "}
            {`(${
              ProjectsData.filter(item =>
                item.context.includes("Self-Learning")
              ).length
            })`}
          </button>
        </div>
      </div>

      {/* Tech filter toggle button */}
      <div className="w-full flex justify-center my-4">
        <button
          onClick={() => setShowTechFilters(!showTechFilters)}
          className="font-sans py-2 px-4 text-sm font-medium rounded-md border-2 transition-all duration-300 text-white bg-black-p dark:bg-black-s hover:bg-black-s dark:hover:bg-black-p-l"
        >
          {showTechFilters ? "Hide Tech Filters" : "Filter by Technology Stack"}
        </button>
      </div>
      
      {/* Tech filters */}
      <AnimatePresence>
        {showTechFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-wrap justify-center py-2 px-3 gap-2 overflow-hidden mb-4"
          >
            {allTechnologies.map((tech, index) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setTechFilter(tech === techFilter ? "" : tech)}
                key={index}
                className={`font-sans py-1 px-3 text-xs font-medium rounded-md border transition-all ${
                  tech === techFilter
                    ? "text-white bg-black-s border-black-s"
                    : "text-black-p dark:text-white border-gray-300 bg-white dark:bg-black-p dark:border-gray-700"
                }`}
              >
                {tech}
              </motion.button>
            ))}
            {techFilter && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={clearTechFilter}
                className="font-sans py-1 px-3 text-xs font-medium rounded-md border-2 text-red-500 border-red-500 bg-white dark:bg-black-p"
              >
                Clear Tech Filter
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active filters display */}
      {techFilter && (
        <div className="w-full flex justify-center items-center mt-2 mb-4">
          <div className="px-4 py-2 bg-gray-100 dark:bg-black-p-l rounded-lg text-sm flex items-center gap-2">
            <span>Tech filter:</span>
            <span className="bg-black-s text-white px-2 py-1 rounded text-xs">
              {techFilter}
            </span>
          </div>
        </div>
      )}
      
      {/* Projects display */}
      <div className="w-full flex items-center justify-center p-4">
        <div className="w-full flex flex-wrap justify-center items-center gap-4">
          {filter.length > 0 ? (
            filter.map((item, index) => {
              return (
                <ProjectCard
                  key={index}
                  setPopUp={setPopUp}
                  popup={popup}
                  setItem={setItem}
                  item={item}
                />
              )
            })
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <p className="text-2xl font-semibold mb-2">No projects found</p>
              <p>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects
