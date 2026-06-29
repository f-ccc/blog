'use client'

import dynamic from 'next/dynamic'
import { useConfig } from '@/hooks/useConfig'

const SakuraEffect = dynamic(() => import('@/components/effects/SakuraEffect'), { ssr: false })
const WaveEffect = dynamic(() => import('@/components/effects/WaveEffect'), { ssr: false })
const FloatingControls = dynamic(() => import('@/components/effects/FloatingControls'), { ssr: false })

export default function ClientEffects() {
  const { config } = useConfig()

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
