import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Copy, 
  Check, 
  Printer, 
  Mail, 
  Plus, 
  Info,
  TrendingUp
} from 'lucide-react'

export default function ResultCard({ answer, onBack }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handlePrint() {
    window.print()
  }

  // Parse the answer to identify sections if possible
  function formatAnswer(text) {
    if (typeof text !== 'string') {
      text = JSON.stringify(text, null, 2)
    }

    console.log('=== FORMATTING ANSWER ===');
    console.log('Input length:', text.length);
    console.log('First 200 chars:', text.substring(0, 200));
    console.log('Last 200 chars:', text.substring(Math.max(0, text.length - 200)));

    // Simple approach: just preserve formatting and return as-is with markdown styling
    return (
      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
        {text}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8 pb-6 border-b-2 border-gray-100">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B0270] to-[#FF4E00] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text">
              Your Project Estimate
            </h2>
          </motion.div>
          <motion.p 
            className="text-gray-600 ml-13"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Based on current African market rates
          </motion.p>
        </div>
        
        <div className="flex gap-2">
          <motion.button 
            onClick={handleCopy}
            className="btn-ghost flex items-center gap-2 px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </motion.button>
          
          <motion.button 
            onClick={handlePrint}
            className="btn-ghost flex items-center gap-2 px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Printer className="w-4 h-4" />
            Print
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="prose prose-gray max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-6 mb-6">
          {formatAnswer(answer)}
        </div>
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        className="flex flex-wrap gap-4 mt-8 pt-6 border-t-2 border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button 
          onClick={onBack}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Estimate
        </button>
        
        <a 
          href={`mailto:?subject=Project Estimate from Evala&body=${encodeURIComponent(answer)}`}
          className="btn-secondary flex items-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Email Estimate
        </a>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> This is an AI-generated estimate based on current market data. 
            Actual costs may vary depending on specific requirements, vendor selection, and market conditions. 
            We recommend getting quotes from multiple providers for the most accurate pricing.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
