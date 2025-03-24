import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Header from "../components/header.jsx"

import { ThemeProvider } from "../mode/modeContext"
import HeroSection from "../components/HeroSection"
import SideBar from "../components/SideBar"
import Skills from "../components/Skilles"
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
import Annonce from "../components/Annonce"
import Upbutton from "../components/UpButton"

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  
  return (
    <div className="bg-slate-50 dark:bg-black-p relative">
      <Seo
        title="Younes Bouchbouk - Full Stack Engineer"
        description="Full stack engineer specializing in Go, JavaScript, React, Next.js, and microservices. Experienced in building scalable and maintainable applications."
        type="website"
        pathname="/"
      />
      {/* <Annonce /> */}

      <Themeprovider2>
        <div className={`${popup ? "blur-sm" : ""}`}>
          <SideBar />
          <HeroSection />
          <SectionTitle label={"Who I Am"} />
          <AboutMe />
          <SectionTitle label={"Professional Experiences"} />
          <TimeLineExp Data={Professinal_experiences} />
          <SectionTitle label={"Online Courses & Certifications"} />
          <TimeLine Data={Certificat.reverse()} type={"education"} />
          <SectionTitle label={"Education"} />
          <TimeLine Data={Education.reverse()} type={"education"} />
          <Projects setPopUp={setpopup} popUp={popup} setItem={setItem} />
          <SectionTitle label={"My Skills"} />
          <Skills />
          <Contact />
        </div>

        <AnimatePresence>
          {popup && (
            <ProjectPopUp setPopUp={setpopup} popUp={popup} item={item} />
          )}
        </AnimatePresence>
        
        <Upbutton scrollToTop={scrollToTop} />

        <div className="my-4 flex items-center justify-center w-full py-6 bg-slate-100 dark:bg-black-p-l">
          <div className="max-w-full overflow-x-auto px-4">
            <GitHubCalendar 
              username="YounesBouchbouk" 
              colorScheme="dark"
              fontSize={14}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </div>

        <footer className="w-full py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Younes Bouchbouk. All rights reserved.
        </footer>
      </Themeprovider2>
    </div>
  )
}

export default IndexPage