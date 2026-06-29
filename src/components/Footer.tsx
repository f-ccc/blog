export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-medium text-on-surface">
              © {new Date().getFullYear()} 我的博客
            </p>
            <p className="text-xs text-on-surface-variant">
              Powered by Next.js · Inspired by Firefly
            </p>
          </div>
          <div className="flex gap-4 text-xs text-on-surface-variant">
            <a href="https://github.com/f-ccc/blog" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="/fc/login" className="hover:text-primary transition-colors">管理</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
