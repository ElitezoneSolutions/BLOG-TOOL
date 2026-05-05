import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-xl shadow-md">
            E
          </div>
          <span className="font-extrabold text-xl tracking-tight hidden sm:inline-block">
            Elitezone Solutions
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Age Calculator
          </Link>
          {/* Add future tools here */}
          {/* <Link href="/bmi-calculator" className="hover:text-primary transition-colors">BMI Calculator</Link> */}
        </nav>
      </div>
    </header>
  );
}
