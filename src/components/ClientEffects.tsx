'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const SakuraEffect = dynamic(() => import('@/components/effects/SakuraEffect'), { ssr: false })
const WaveEffect = dynamic(() => import('@/components/effects/WaveEffect'), { ssr: false })
const FloatingControls = dynamic(() => import('@/components/effects/FloatingControls'), { ssr: false })

export default function ClientEffects() {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(() => {})
  }, [])

  return (
    <>
      {config?.sakuraEnabled && <SakuraEffect count={config.sakuraCount || 50} />}
      {config?.waveEnabled && (
        <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
          <WaveEffect />
        </div>
      )}
      <FloatingControls />
    </>
  )
}
