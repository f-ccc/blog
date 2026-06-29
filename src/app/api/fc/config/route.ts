import { NextRequest, NextResponse } from 'next/server'
import { getConfig, updateConfig } from '@/lib/config'

export async function GET() {
  const config = getConfig()
  const { adminPassword, ...safeConfig } = config
  return NextResponse.json(safeConfig)
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const config = updateConfig(data)
    const { adminPassword, ...safeConfig } = config
    return NextResponse.json(safeConfig)
  } catch (error) {
    return NextResponse.json({ error: '保存失败' }, { status: 500 })
  }
}
