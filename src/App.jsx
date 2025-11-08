import React, { useState } from 'react'
import HomePage from './components/HomePage'
import Estimator from './components/Estimator'
import AnimatedBackground from './components/AnimatedBackground'
import { getEstimate } from './utils/api'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const [currentView, setCurrentView] = useState('home') // 'home' or 'estimator'
  const [answers, setAnswers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  function navigateToEstimator() {
    setCurrentView('estimator')
    // Reset state when navigating to estimator
    setResult(null)
    setError(null)
    setAnswers(null)
  }

  function navigateToHome() {
    setCurrentView('home')
    // Reset state when going back home
    setResult(null)
    setError(null)
    setAnswers(null)
    setLoading(false)
  }

  async function handleFinish(collected) {
    setAnswers(collected)
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await getEstimate(collected)
      setResult(res)
    } catch (e) {
      console.error(e)
      setError('Failed to fetch estimate. Please check your API configuration and network connection.')
    } finally {
      setLoading(false)
    }
  }

  function handleStartOver() {
    setResult(null)
    setError(null)
    setAnswers(null)
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <HomePage 
            key="home"
            onNavigateToEstimator={navigateToEstimator} 
          />
        ) : (
          <Estimator
            key="estimator"
            onBack={navigateToHome}
            onFinish={handleFinish}
            loading={loading}
            result={result}
            error={error}
            onStartOver={handleStartOver}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
