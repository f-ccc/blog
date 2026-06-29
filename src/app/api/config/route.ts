import { NextResponse } from 'next/server'
import { getConfig, getConfigTimestamp } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function GET() {
  const config = getConfig()
  const { adminPassword, ...safeConfig } = config
  return NextResponse.json({
    ...safeConfig,
    configUpdated: getConfigTimestamp(),
  })
}
