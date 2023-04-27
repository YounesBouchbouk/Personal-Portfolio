import React from 'react'
import LiTimeLine from "./LiTimeLine"
import LiTimeLineOfEsp from './LiTimeLineOfEsp'

const TimeLineExp = ({ Data }) => {
  return (
    <div className="w-full  flex justify-center items-center">
      <div className="w-3/4 ">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {Data.map((item, index) => {
            return <LiTimeLineOfEsp item={item} index={index} />
          })}
        </ol>
      </div>
    </div>
  )
}

export default TimeLineExp