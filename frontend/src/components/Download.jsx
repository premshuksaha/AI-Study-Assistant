import React from 'react'
import { FaFileDownload } from "react-icons/fa";


function Download() {
  return (
    <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-b border-white/50 bg-violet-500 px-4 py-2 text-sm text-white transition hover:bg-violet-600">
        <FaFileDownload />
        <span>Download PDF</span>
    </button>
  )
}

export default Download