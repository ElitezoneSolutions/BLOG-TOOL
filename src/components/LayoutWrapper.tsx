"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin') || pathname === '/login'

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </>
  )
}
