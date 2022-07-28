import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Header from "../components/header.jsx"
import Foother from "../components/Foother.jsx"

import { ThemeProvider } from "../mode/modeContext"
import HeroSection from "../components/HeroSection"
import SideBar from "../components/SideBar"
import Skilles from "../components/Skilles"
import SectionTitle from "../components/SectionTitle"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects"
import TimeLine from "../components/TimeLine"
import { Certificat, Education } from "../Data/Career"
import ProjectPopUp from "../components/Cards/ProjectPopUp"
import ContactBar from "../components/ContactBar"
import { motion, AnimatePresence } from "framer-motion"
import Contact from "../components/Contact"
import { Helmet } from "react-helmet"
const IndexPage = () => {
  const [popup, setpopup] = React.useState(false)
  const [item, setItem] = React.useState({})
  return (
    <div className="bg-slate-50 dark:bg-black-p relative">
      <Seo
        title="Younes Bouchbouk - Home"
        description="Full stack javascript developer , ReactJs front end developer , nodejs backend developer , junior developer , Mern stack student developer , young software engineer "
      />
      <ThemeProvider>
        <div className={`${popup ? "blur-sm" : ""}`}>
          <Header />
          <SideBar />
          <HeroSection />
          <SectionTitle label={"Who   I'm   I   ?"} />
          <AboutMe />

          <SectionTitle label={"My Skilles"} />
          <Skilles />
          <SectionTitle label={"Education"} />
          <TimeLine Data={Education} type={"education"} />
          <SectionTitle label={"CERTIFICATE"} />
          <TimeLine Data={Certificat} type={"education"} />
          <Projects setPopUp={setpopup} popUp={popup} setItem={setItem} />
        </div>
        {/* <Contact /> */}

        <AnimatePresence>
          {popup && (
            <ProjectPopUp setPopUp={setpopup} popUp={popup} item={item} />
          )}
        </AnimatePresence>

        {/* <SectionTitle label={"Funny Break :"} /> */}
        <Foother />
      </ThemeProvider>
    </div>
  )
}

export default IndexPage
