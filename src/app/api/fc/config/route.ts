import { NextRequest, NextResponse } from 'next/server'
import { getConfig, updateConfig, getConfigTimestamp } from '@/lib/config'
import { revalidatePath, revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  const config = getConfig()
  const { adminPassword, ...safeConfig } = config
  return NextResponse.json({
    ...safeConfig,
    configUpdated: getConfigTimestamp(),
  })
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const config = updateConfig(data)
    // 🎯 双管齐下：路径 + 标签双重失效
    revalidatePath('/', 'layout')     // 刷新根布局缓存（标题、特效开关等）
    revalidateTag('config', { expire: 0 })
    const { adminPassword, ...safeConfig } = config
    return NextResponse.json({
      ...safeConfig,
      configUpdated: getConfigTimestamp(),
    })
  } catch (error) {
    return NextResponse.json({ error: '保存失败' }, { status: 500 })
  }
}
