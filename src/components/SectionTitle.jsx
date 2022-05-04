import React from "react"

const SectionTitle = ({ label }) => {
  return (
    <div className="w-full flex justify-center items-center  mb-4">
      <div className="w-1/2 p-2 ">
        <p className="text-2xl font-Monoton text-black dark:text-white mb-4 text-center">
          {label}
        </p>
        <div className="bg-orange-400 h-0.5  "></div>
      </div>
    </div>
  )
}

export default SectionTitle
