'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const messages = [
  'Searching the market...',
  'Analyzing your idea...',
  'Preparing your mirror...',
]

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 65%), #200c1c',
      }}
    >
      {/* Spinning ring */}
      <div className="relative mb-10">
        <div
          className="w-20 h-20 rounded-full border-4 border-transparent animate-spin"
          style={{
            borderTopColor: '#7c3aed',
            borderRightColor: 'rgba(124,58,237,0.3)',
            filter: '0 0 20px rgba(124,58,237,0.4)',
          }}
        />
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'rgba(124,58,237,0.1)',
            boxShadow: '0 0 20px rgba(124,58,237,0.3)',
          }}
        />
      </div>

      {/* Cycling message */}
      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-lg text-[#ccc3d8]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-3 text-sm text-[rgba(204,195,216,0.5)]" style={{ fontFamily: 'var(--font-body)' }}>
        This usually takes 15–30 seconds
      </p>
    </div>
  )
}
