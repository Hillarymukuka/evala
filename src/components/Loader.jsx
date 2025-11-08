import React from 'react'
import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-[#3B0270] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 w-16 h-16 rounded-full border-4 border-[#FF4E00] border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-gradient-to-r from-[#3B0270] to-[#FF4E00]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
      
      <motion.p
        className="mt-6 text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Calculating your estimate...
      </motion.p>
      
      <motion.div
        className="flex gap-2 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-[#3B0270]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-[#3B0270]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-[#3B0270]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>
    </div>
  )
}
