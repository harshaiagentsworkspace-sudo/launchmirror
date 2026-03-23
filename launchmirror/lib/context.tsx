'use client'

import React, { createContext, useContext, useState } from 'react'
import type { FormData, MirrorOutput, RoadmapOutput } from '@/types'

interface AnalysisContextType {
  formData: FormData | null
  mirrorOutput: MirrorOutput | null
  roadmapOutput: RoadmapOutput | null
  setFormData: (data: FormData) => void
  setMirrorOutput: (data: MirrorOutput) => void
  setRoadmapOutput: (data: RoadmapOutput) => void
}

const AnalysisContext = createContext<AnalysisContextType | null>(null)

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [mirrorOutput, setMirrorOutput] = useState<MirrorOutput | null>(null)
  const [roadmapOutput, setRoadmapOutput] = useState<RoadmapOutput | null>(null)

  return (
    <AnalysisContext.Provider
      value={{
        formData,
        mirrorOutput,
        roadmapOutput,
        setFormData,
        setMirrorOutput,
        setRoadmapOutput,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis(): AnalysisContextType {
  const ctx = useContext(AnalysisContext)
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider')
  return ctx
}
