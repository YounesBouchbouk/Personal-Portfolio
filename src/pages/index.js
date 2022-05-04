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
import TimeLine from "../components/TimeLine"

const IndexPage = () => (
  <div className="bg-slate-50 dark:bg-black-p">
    <Seo title="Home" />
    <ThemeProvider>
      <Header />
      <SideBar />
      <HeroSection />
      <SectionTitle label={"Who   I'm   I   ?"} />
      <AboutMe />
      <SectionTitle label={"My Skilles"} />
      <Skilles />
      <SectionTitle label={"Career"} />
      <TimeLine />
      <SectionTitle label={"Projects List :"} />

      <SectionTitle label={"Funny Break :"} />

      <SectionTitle label={"I have build this landing page with : "} />
    </ThemeProvider>
  </div>
)

export default IndexPage
