import React from "react"
import { Link } from "gatsby"
import { HiOutlineBriefcase } from "react-icons/hi"
import { AiOutlineDownload } from "react-icons/ai"

const AvailabilityBar = () => {
  return (
    <div
      role="region"
      aria-label="Availability"
      className="fixed top-0 left-0 right-0 z-[10001] flex min-h-[2.5rem] items-center justify-center gap-2 border-b border-black-s/30 bg-gradient-to-r from-black-p via-black-p-l to-black-p px-3 py-2 text-center text-xs shadow-md sm:text-sm md:gap-4"
    >
      <span className="inline-flex items-center gap-1.5 font-Ubuntu font-semibold text-black-s">
        <HiOutlineBriefcase className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline">
          Open to full-time roles and meaningful project collaborations
        </span>
        <span className="sm:hidden">Available for work &amp; projects</span>
      </span>
      <span className="hidden h-4 w-px bg-white/20 md:inline" aria-hidden />
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        
        <a
          href="/YounesBouchboukResume.pdf"
          download="YounesBouchboukResume.pdf"
          className="inline-flex items-center gap-1 rounded-md border border-black-s/50 bg-white/5 px-2.5 py-1 font-Ubuntu text-xs font-semibold text-white transition hover:border-black-s hover:text-black-s sm:text-sm"
        >
          <AiOutlineDownload className="h-4 w-4" aria-hidden />
          Resume
        </a>
      </div>
    </div>
  )
}

export default AvailabilityBar
