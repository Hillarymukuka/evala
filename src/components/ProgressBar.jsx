import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {current} of {total}
        </span>
        <span className="text-sm font-semibold text-[#3B0270]">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
