"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageCircle, Send, RefreshCw, ChevronDown, ChevronUp } from "lucide-react"

interface Comment {
  id: string
  slug: string
  nickname: string
  email: string
  content: string
  avatar: string
  createdAt: string
}

const AVATARS = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
  "/avatars/avatar-5.png",
  "/avatars/avatar-6.png",
  "/avatars/avatar-7.png",
  "/avatars/avatar-8.png",
]

function getRandomAvatar(exclude?: string): string {
  const available = AVATARS.filter(a => a !== exclude)
  return available[Math.floor(Math.random() * available.length)]
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return "刚刚"
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} 天前`
  return new Date(dateStr).toLocaleDateString("zh-CN", { year: "numeric", month: "short", day: "numeric" })
}

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [currentAvatar, setCurrentAvatar] = useState(AVATARS[0])
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [showAll, setShowAll] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      if (res.ok) {
        const data = await res.json()
        setComments(data)
      }
    } catch {}
  }, [slug])

  useEffect(() => {
    fetchComments()
    // Restore nickname/email from memory
    try {
      const saved = localStorage.getItem(`comment-identity-${slug}`)
      if (saved) {
        const { nickname: n, email: e } = JSON.parse(saved)
        if (n) setNickname(n)
        if (e) setEmail(e)
      }
    } catch {}
    // Random initial avatar
    setCurrentAvatar(getRandomAvatar())
  }, [fetchComments, slug])

  const rollAvatar = () => {
    setCurrentAvatar(prev => getRandomAvatar(prev))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim() || !content.trim()) return
    setSubmitting(true)
    setMessage("")

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, nickname: nickname.trim(), email: email.trim(), content: content.trim() }),
      })
      if (res.ok) {
        const newComment = await res.json()
        setComments(prev => [...prev, newComment])
        setContent("")
        setMessage("评论发布成功！")
        // Save identity for next time
        try {
          localStorage.setItem(`comment-identity-${slug}`, JSON.stringify({ nickname, email }))
        } catch {}
        setTimeout(() => setMessage(""), 3000)
      } else {
        const data = await res.json()
        setMessage(data.error || "发布失败")
      }
    } catch {
      setMessage("网络错误，请稍后重试")
    }
    setSubmitting(false)
  }

  const displayedComments = showAll ? comments : comments.slice(-5)
  const hasMore = comments.length > 5

  return (
    <div className="mt-8 space-y-5">
      {/* Header */}
      <h3 className="flex items-center gap-2 text-base font-semibold text-on-surface">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <MessageCircle size={15} className="text-primary" />
        </span>
        评论 {comments.length > 0 && <span className="text-[13px] font-normal text-on-surface-variant">({comments.length})</span>}
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="glass-card-static p-5">
        <div className="flex items-start gap-4">
          {/* Avatar picker */}
          <div className="shrink-0 text-center">
            <button
              type="button"
              onClick={rollAvatar}
              className="group relative h-10 w-10 overflow-hidden rounded-full border border-outline-variant/30 transition-transform duration-300 hover:scale-105 cursor-pointer"
              title="点击随机切换头像"
            >
              <img src={currentAvatar} alt="avatar" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <RefreshCw size={14} className="text-white" />
              </div>
            </button>
            <p className="mt-1 text-[10px] text-on-surface-variant">随机头像</p>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            {/* Name + Email row */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="昵称 *"
                maxLength={20}
                required
                className="flex-1 rounded-xl border border-outline-variant/40 bg-surface/80 px-3 py-2 text-[13px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300 backdrop-blur-sm"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="邮箱（选填）"
                className="flex-1 rounded-xl border border-outline-variant/40 bg-surface/80 px-3 py-2 text-[13px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Content */}
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="写下你的想法..."
              maxLength={1000}
              required
              rows={3}
              className="w-full rounded-xl border border-outline-variant/40 bg-surface/80 px-3 py-2 text-[13px] text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300 resize-none backdrop-blur-sm"
            />

            {/* Submit row */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant">{content.length}/1000</span>
              <button
                type="submit"
                disabled={submitting || !nickname.trim() || !content.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-5 py-1.5 text-[13px] font-medium text-on-primary hover:bg-primary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                {submitting ? "发布中..." : "发布"}
              </button>
            </div>

            {message && (
              <p className={`text-[12px] ${message.includes("成功") ? "text-primary" : "text-tertiary"}`}>{message}</p>
            )}
          </div>
        </div>
      </form>

      {/* Comment List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[12px] text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <ChevronDown size={14} />
              查看全部 {comments.length} 条评论
            </button>
          )}
          {hasMore && showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[12px] text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              <ChevronUp size={14} />
              收起
            </button>
          )}

          {displayedComments.map(comment => (
            <div key={comment.id} className="glass-card-static p-4">
              <div className="flex items-start gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.nickname}
                  className="h-9 w-9 shrink-0 rounded-full border border-outline-variant/20 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-on-surface">{comment.nickname}</span>
                    <span className="text-[11px] text-on-surface-variant">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-on-surface/90 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {comments.length === 0 && (
        <div className="rounded-2xl border border-outline-variant/20 py-8 text-center">
          <MessageCircle size={24} className="mx-auto mb-2 text-on-surface-variant/40" />
          <p className="text-[13px] text-on-surface-variant">还没有评论，来说两句吧~</p>
        </div>
      )}
    </div>
  )
}
