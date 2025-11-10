import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'
import { 
  Briefcase, 
  Building2, 
  Globe, 
  FileText, 
  Clock, 
  ListChecks,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Building,
  Store
} from 'lucide-react'

export default function QuestionFlow({ onFinish }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    type: '',
    industry: '',
    businessType: '',
    country: 'Zambia',
    scope: '',
    duration: '',
    details: ''
  })

  const steps = [
    { 
      key: 'type', 
      label: 'What type of work do you need?', 
      placeholder: 'E.g., Logo design, house build, mobile app',
      icon: Briefcase,
      hint: 'Be specific about the service or product you need'
    },
    { 
      key: 'industry', 
      label: 'Which industry does this belong to?', 
      placeholder: 'Creative, Construction, Technology...',
      icon: Building2,
      hint: 'This helps us apply the right pricing model'
    },
    { 
      key: 'businessType', 
      label: 'What type of business is this for?', 
      placeholder: 'Select business type',
      icon: Building,
      hint: 'Pricing scales based on business size and budget',
      isSelect: true,
      options: [
        { value: 'sme', label: 'SME / Small Business', description: 'Small to medium enterprises, startups, freelancers' },
        { value: 'corporate', label: 'Corporate / Large Company', description: 'Established corporations, large organizations' }
      ]
    },
    { 
      key: 'country', 
      label: 'Which country is this project for?', 
      placeholder: 'Country (Zambia recommended)',
      icon: Globe,
      hint: 'We\'ll use local market rates for accuracy'
    },
    { 
      key: 'scope', 
      label: 'What\'s the scope of your project?', 
      placeholder: 'Brief description of campaign or project scope',
      icon: FileText,
      hint: 'Include key deliverables or milestones'
    },
    { 
      key: 'duration', 
      label: 'How long will this project take?', 
      placeholder: 'E.g., 2 weeks, 3 months',
      icon: Clock,
      hint: 'Estimate the timeline or deadline'
    },
    { 
      key: 'details', 
      label: 'Any additional details or requirements?', 
      placeholder: 'Specific deliverables, materials, or special requirements',
      icon: ListChecks,
      hint: 'The more detail, the more accurate your estimate',
      isTextarea: true
    }
  ]

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function next() {
    if (step < steps.length - 1) {
      setStep(s => s + 1)
    } else {
      onFinish(form)
    }
  }

  function prev() {
    if (step > 0) setStep(s => s - 1)
  }

  const currentStep = steps[step]
  const canProceed = form[currentStep.key]?.trim().length > 0
  const IconComponent = currentStep.icon

  return (
    <div>
      <ProgressBar current={step + 1} total={steps.length} />

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Question Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B0270] to-[#FF4E00] flex items-center justify-center shadow-lg"
            >
              <IconComponent className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {currentStep.label}
              </h3>
              <p className="text-sm text-gray-500">{currentStep.hint}</p>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-8">
          {currentStep.isSelect ? (
            <div className="space-y-3">
              {currentStep.options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => update(currentStep.key, option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    form[currentStep.key] === option.value
                      ? 'border-[#3B0270] bg-purple-50'
                      : 'border-gray-200 hover:border-[#3B0270] hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      form[currentStep.key] === option.value
                        ? 'border-[#3B0270] bg-[#3B0270]'
                        : 'border-gray-300'
                    }`}>
                      {form[currentStep.key] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : currentStep.key === 'country' ? (
            <select
              value={form.country}
              onChange={e => update('country', e.target.value)}
              className="modern-select"
            >
              <option value="Zambia">Zambia</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              <option value="Ghana">Ghana</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Uganda">Uganda</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Botswana">Botswana</option>
              <option value="Zimbabwe">Zimbabwe</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Other">Other</option>
            </select>
          ) : currentStep.isTextarea ? (
            <textarea
              value={form[currentStep.key]}
              onChange={e => update(currentStep.key, e.target.value)}
              placeholder={currentStep.placeholder}
              className="modern-input min-h-[140px] resize-none"
              rows={6}
            />
          ) : (
            <input
              type="text"
              value={form[currentStep.key]}
              onChange={e => update(currentStep.key, e.target.value)}
              placeholder={currentStep.placeholder}
              className="modern-input"
              autoFocus
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={prev}
            disabled={step === 0}
            className="btn-ghost flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <motion.button
            onClick={next}
            disabled={!canProceed}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: canProceed ? 1.02 : 1 }}
            whileTap={{ scale: canProceed ? 0.98 : 1 }}
          >
            {step < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Get My Estimate
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>

        {/* Quick Tips */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-5 bg-purple-50 rounded-xl border border-purple-100"
          >
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-purple-900 mb-1">Pro Tip</p>
                <p className="text-sm text-purple-700 leading-relaxed">
                  Our AI specializes in African markets with up-to-date pricing across creative, construction, and tech industries. The more detail you provide, the more accurate your estimate will be.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
