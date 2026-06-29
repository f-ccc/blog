import { NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'

export async function GET() {
  const config = getConfig()
  // Don't expose password
  const { adminPassword, ...safeConfig } = config
  return NextResponse.json(safeConfig)
}
