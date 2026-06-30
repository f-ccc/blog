import type { Metadata } from 'next'
import AdminShell from './AdminShell'

export const metadata: Metadata = {
  title: '管理后台',
}

export default function FcLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
