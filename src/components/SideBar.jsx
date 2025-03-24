import React, { useEffect, useState } from "react"
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsGithub,
  BsList,
  BsX,
} from "react-icons/bs"
import { AiOutlineFileText } from "react-icons/ai"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"

const SideBar = () => {
  const controls = useAnimation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768)
      }
      checkIfMobile()
      window.addEventListener("resize", checkIfMobile)
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3 },
    }))
  }, [controls])

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <BsLinkedin className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "https://www.linkedin.com/in/younes-bouchbouk-71a355217/",
    },
    {
      name: "Github",
      icon: <BsGithub className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "https://github.com/YounesBouchbouk",
    },
    {
      name: "Twitter",
      icon: <BsTwitter className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "https://twitter.com/BouchboukYounes",
    },
    {
      name: "Facebook",
      icon: <BsFacebook className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "https://www.facebook.com/younss.bouchbouk.3/",
    },
    {
      name: "+212 708204919",
      icon: <BsWhatsapp className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "https://wa.me/212708204919",
    },
    {
      name: "My Resume",
      icon: <AiOutlineFileText className="text-2xl text-black-p hover:text-black-s dark:text-white-c" />,
      url: "/BouchboukYounesResumeGO_JS.pdf",
      download: true,
    },
  ]

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed left-0 h-full w-[90px] px-2 flex flex-col z-50 items-start justify-center transition-all duration-500 ease-in"
    >
      {socialLinks.map((link, index) => (
        <motion.div 
          key={index} 
          custom={index} 
          animate={controls} 
          className="flex relative group mb-6"
        >
          {link.download ? (
            <a href={link.url} download aria-label={link.name}>
              {link.icon}
            </a>
          ) : (
            <Link to={link.url} aria-label={link.name}>
              {link.icon}
            </Link>
          )}
          <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu shadow-sm group-hover:inline transition-all duration-500 ease-in dark:text-white">
            {link.name}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )

  // Mobile Menu Toggle
  const MobileMenuToggle = () => (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="fixed bottom-6 right-6 z-50 bg-black-p dark:bg-orange-400 text-white p-3 rounded-full shadow-lg"
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {mobileMenuOpen ? (
        <BsX className="text-2xl" />
      ) : (
        <BsList className="text-2xl" />
      )}
    </motion.button>
  )

  // Mobile Menu
  const MobileMenu = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-6 z-50 bg-white dark:bg-black-p rounded-lg shadow-xl p-4 flex flex-col gap-4"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.download ? (
                <a 
                  href={link.url} 
                  download 
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                  <span className="text-black-s dark:text-white text-sm">{link.name}</span>
                </a>
              ) : (
                <Link 
                  to={link.url}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                  <span className="text-black-s dark:text-white text-sm">{link.name}</span>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {!isMobile && <DesktopSidebar />}
      {isMobile && (
        <>
          <MobileMenuToggle />
          <MobileMenu />
        </>
      )}
    </>
  )
}

export default SideBar