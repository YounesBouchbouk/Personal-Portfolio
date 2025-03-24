import React from "react"
import { motion } from "framer-motion"

const SkillItem = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black-p-l dark:bg-black-p rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="text-black dark:text-white font-Ubuntu text-sm md:text-base font-bold">
          {item.tech}
        </div>
        <div className="flex-shrink-0">{item.icon}</div>
      </div>
      
      <div className="px-4 pb-4 mt-auto">
        <div className="w-full bg-gray-200 dark:bg-black-p rounded-full h-2.5 mb-1">
          <div 
            className="h-2.5 rounded-full bg-orange-400"
            style={{ width: `${item.AVG}%` }}
            aria-valuenow={item.AVG}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
          ></div>
        </div>
        <div className="text-right text-xs text-gray-600 dark:text-gray-300">
          {item.AVG}%
        </div>
      </div>
    </motion.div>
  )
}

export default SkillItem