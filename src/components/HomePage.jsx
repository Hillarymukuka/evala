import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Award
} from 'lucide-react'

export default function HomePage({ onNavigateToEstimator }) {
  const features = [
    {
      icon: Globe,
      title: 'African Market Expertise',
      description: 'Accurate pricing based on real-time data from Zambia and across Africa'
    },
    {
      icon: Zap,
      title: 'Instant Estimates',
      description: 'Get detailed project cost breakdowns in seconds, not hours'
    },
    {
      icon: Shield,
      title: 'Industry Specialized',
      description: 'Covers creative, construction, technology, and more industries'
    },
    {
      icon: Calculator,
      title: 'Detailed Breakdowns',
      description: 'Labor, materials, logistics, and all cost components clearly itemized'
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Describe Your Project',
      description: 'Tell us about your project type, industry, and requirements'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI analyzes market rates and project complexity'
    },
    {
      step: '03',
      title: 'Get Your Estimate',
      description: 'Receive a detailed breakdown with actionable insights'
    }
  ]

  const stats = [
    { label: 'Projects Estimated', value: '2,500+' },
    { label: 'Industries Covered', value: '15+' },
    { label: 'Average Accuracy', value: '94%' },
    { label: 'Countries Supported', value: '10+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#3B0270] to-[#FF4E00] flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold gradient-text">Evala</h1>
                <p className="text-sm text-gray-600">by Nestro</p>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Project Cost Estimates<br />
              <span className="gradient-text">Made Simple</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Get instant, accurate project cost estimates powered by AI and African market expertise. 
              From creative campaigns to construction projects, we've got you covered.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button
                onClick={onNavigateToEstimator}
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              >
                Start Estimating
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                <Target className="w-5 h-5" />
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Evala?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for African markets with AI-powered accuracy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B0270] to-[#FF4E00] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to accurate project estimates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 text-center h-full">
                  <div className="text-6xl font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-[#FF4E00] transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={onNavigateToEstimator}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 mx-auto"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized pricing models for diverse African industries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Creative & Design',
              'Construction',
              'Technology',
              'Marketing',
              'Event Planning',
              'Manufacturing',
              'Agriculture',
              'Consulting',
              'Education',
              'Healthcare'
            ].map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="glass-card rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300"
              >
                <CheckCircle2 className="w-6 h-6 text-[#3B0270] mx-auto mb-2" />
                <p className="font-semibold text-gray-800 text-sm">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-12 text-center"
        >
          <Award className="w-16 h-16 text-[#FF4E00] mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and professionals using Evala to make informed project decisions.
          </p>
          <button
            onClick={onNavigateToEstimator}
            className="btn-primary flex items-center gap-2 text-lg px-10 py-5 mx-auto"
          >
            Create Your First Estimate
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 border-t border-gray-200">
        <p className="text-sm">
          © 2025 Evala by Nestro. Powered by AI • African Market Expertise
        </p>
      </footer>
    </div>
  )
}
