import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Header from "../components/header.jsx"

import { ThemeProvider } from "../mode/modeContext"
import HeroSection from "../components/HeroSection"
import SideBar from "../components/SideBar"
import Skilles from "../components/Skilles"
import SectionTitle from "../components/SectionTitle"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects"
import TimeLine from "../components/TimeLine"
import { Certificat, Education, Professinal_experiences } from "../Data/Career"
import ProjectPopUp from "../components/Cards/ProjectPopUp"
import { motion, AnimatePresence } from "framer-motion"
import Contact from "../components/Contact"
import GitHubCalendar from "react-github-calendar"
import TimeLineExp from "../components/TimeLineExp"

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("current-theme")
    if (typeof storedPrefs === "string") {
      return storedPrefs
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
  }
  return "dark"
}

const Themeprovider2 = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const checkTheme = existing => {
    // your document or window manipulation
    const root = window.document.documentElement
    const isDark = existing === "dark"

    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(existing)

    localStorage.setItem("current-theme", existing)
  }

  if (initialTheme) {
    checkTheme(initialTheme)
  }

  React.useEffect(() => {
    checkTheme(theme)
  }, [theme])

  return (
    <div className="w-full">
      <Header setTheme={setTheme} theme={theme} />
      {children}
    </div>
  )
}

const IndexPage = () => {
  const [popup, setpopup] = React.useState(false)
  const [item, setItem] = React.useState({})

  return (
    <div className="bg-slate-50 dark:bg-black-p relative">
      <Seo
        title="Younes Bouchbouk - Home"
        description="Full stack javascript developer , ReactJs front end developer , nodejs backend developer , junior developer , Mern stack student developer , young software engineer "
      />
      <Themeprovider2>
        <div className={`${popup ? "blur-sm" : ""}`}>
          <SideBar />
          <HeroSection />
          <SectionTitle label={"Who   I'm   I   ?"} />
          <AboutMe />
          <SectionTitle label={"Professional Expériences : "} />
          <TimeLineExp Data={Professinal_experiences} />
          <SectionTitle label={"Education"} />
          <TimeLine Data={Education.reverse()} type={"education"} />
          <Projects setPopUp={setpopup} popUp={popup} setItem={setItem} />
          <SectionTitle label={"My Skilles"} />
          <Skilles />
          <SectionTitle label={"Online Courses"} />
          <TimeLine Data={Certificat.reverse()} type={"education"} />
        </div>

        <AnimatePresence>
          {popup && (
            <ProjectPopUp setPopUp={setpopup} popUp={popup} item={item} />
          )}
        </AnimatePresence>

        {/* <SectionTitle label={"Funny Break :"} /> */}
        <div className="my-4 flex items-center justify-center w-full py-3 bg-slate-100">
          <GitHubCalendar username="YounesBouchbouk" color="#3069ba" />
        </div>
      </Themeprovider2>
    </div>
  )
}

export default IndexPage
