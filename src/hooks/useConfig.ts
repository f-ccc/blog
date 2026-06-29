'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SysConfig } from '@/lib/config'

const CONFIG_CACHE_KEY = 'fc-config-cache'
const POLL_INTERVAL = 10000 // 10s

export interface ConfigSnapshot extends Partial<SysConfig> {
  configUpdated?: number
}

/** 
 * Reactive config hook for client components.
 * - Fetches on mount
 * - Re-fetches when `configUpdated` timestamp changes (polling)
 * - Clears local cache when admin saves
 */
export function useConfig(): {
  config: ConfigSnapshot | null
  loading: boolean
  refresh: () => Promise<void>
} {
  const [config, setConfig] = useState<ConfigSnapshot | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/config', {
        next: { tags: ['config'] }, // ← ties into revalidateTag
        cache: 'no-store',
      })
      if (!res.ok) return
      const data: ConfigSnapshot = await res.json()
      setConfig(prev => {
        // Only force re-render if timestamp actually changed
        if (prev?.configUpdated && prev.configUpdated === data.configUpdated) {
          return prev // identical — skip re-render
        }
        return data
      })
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  // Mount fetch
  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  // Poll for changes (catches admin saves from other tabs too)
  useEffect(() => {
    const timer = setInterval(fetchConfig, POLL_INTERVAL)
    return () => clearInterval(timer)
  }, [fetchConfig])

  return { config, loading, refresh: fetchConfig }
}
