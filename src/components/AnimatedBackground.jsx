import React from 'react'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(to right, #3B0270 1px, transparent 1px),
                         linear-gradient(to bottom, #3B0270 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
    </div>
  )
}
