import React from "react"
import SectionTitle from "./SectionTitle"

const Contact = () => {
  return (
    <div className="w-full ">
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 m-6">
        <SectionTitle label={"Leave Me An Advice"} />

        <div className=" w-full shadow rounded p-8 sm:p-4">
          <form action="" method="post">
            <div className="md:flex items-center mt-8">
              <div className="w-full flex flex-col">
                <label className="font-semibold leading-none text-gray-300">
                  Name :
                </label>
                <input
                  type="text"
                  className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="font-semibold leading-none text-gray-300">
                  Message
                </label>
                <textarea
                  type="text"
                  className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-black-s rounded hover:bg-black-p-l focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
