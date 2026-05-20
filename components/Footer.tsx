export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto max-w-[1280px] px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted">
        <div>© {new Date().getFullYear()} Dardika — All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span>Designed &amp; built with care</span>
          <a href="#top" className="hover:text-ink-900 transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
