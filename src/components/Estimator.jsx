import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import QuestionFlow from './QuestionFlow'
import ResultCard from './ResultCard'
import Loader from './Loader'

export default function Estimator({ onBack, onFinish, loading, result, error, onStartOver }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#3B0270] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
            Project Estimator
          </h1>
          <p className="text-gray-600">
            Answer a few questions to get your instant estimate
          </p>
        </motion.header>

        {/* Main Content Card */}
        <motion.div
          layout
          className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10"
        >
          {!result && !loading && (
            <QuestionFlow onFinish={onFinish} />
          )}

          {loading && <Loader />}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button onClick={onStartOver} className="btn-secondary">
                Try Again
              </button>
            </motion.div>
          )}

          {result && (
            <ResultCard answer={result} onBack={onStartOver} />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
