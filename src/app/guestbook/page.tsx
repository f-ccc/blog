import type { Metadata } from 'next'
import GuestbookClient from './GuestbookClient'

export const metadata: Metadata = {
  title: '留言板',
  description: '留下你的想法和意见',
}

export default function GuestbookPage() {
  return <GuestbookClient />
}
