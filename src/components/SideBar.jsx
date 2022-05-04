import React from "react"
import {
  BsLinkedin,
  BsTwitter,
  BsFacebook,
  BsWhatsapp,
  BsGithub,
} from "react-icons/bs"
const SideBar = () => {
  const style = ``
  return (
    <div className="fixed h-full px-2 flex flex-col cursor-pointer z-50  items-center justify-center transition-all duration-500 ease-in  ">
      <div className="flex relative group">
        <BsLinkedin className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu shadow-sm  group-hover:inline transition-all duration-500 ease-in">
          LinkedIn
        </p>
      </div>
      <div className="flex relative group">
        <BsGithub className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu  group-hover:inline transition-all duration-500 ease-in">
          Github
        </p>
      </div>
      <div className="flex relative group">
        <BsTwitter className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s text-xs font-Ubuntu   group-hover:inline transition-all duration-500 ease-in">
          Twitter
        </p>
      </div>
      <div className="flex relative group">
        <BsFacebook className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s  text-xs font-Ubuntu   group-hover:inline transition-all duration-500 ease-in">
          FACEBOOK
        </p>
      </div>
      <div className="flex relative group">
        <BsWhatsapp className="text-2xl text-black-p hover:text-black-s animate-pulse mb-6 dark:text-white-c  " />
        <p className="absolute left-8 hidden text-black-s   text-xs font-Ubuntu  group-hover:inline transition-all duration-500 ease-in">
          PHONE
        </p>
      </div>
    </div>
  )
}

export default SideBar
