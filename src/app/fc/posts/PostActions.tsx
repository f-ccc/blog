'use client'

import Link from 'next/link'
import { Edit3, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PostActions({ slug }: { slug: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`确定删除 "${slug}"？此操作不可恢复！`)) return
    
    const res = await fetch(`/api/fc/posts/${slug}`, { method: 'DELETE' })
    if (res.ok) {
      router.refresh()
    } else {
      alert('删除失败')
    }
  }

  return (
    <div className="flex items-center gap-2 shrink-0 ml-4">
      <Link
        href={`/fc/posts/${slug}/edit`}
        className="inline-flex items-center gap-1 rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-container-higher transition-colors no-underline"
      >
        <Edit3 size={14} />
        编辑
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-error hover:bg-error-container transition-colors cursor-pointer"
      >
        <Trash2 size={14} />
        删除
      </button>
    </div>
  )
}
