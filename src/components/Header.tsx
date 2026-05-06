import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
            A
          </div>
          <span className="font-black text-2xl tracking-tighter hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Ahmed TLS
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/age-calculator" className="hover:text-primary transition-colors">
            Age Calculator
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
