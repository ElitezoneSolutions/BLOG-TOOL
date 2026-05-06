"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, ExternalLink, ChevronDown, FileText, Folder, Settings, Zap } from "lucide-react"

export default function AdminNav() {
  const pathname = usePathname()
  const [isPostsOpen, setIsPostsOpen] = useState(pathname?.startsWith('/admin/new') || pathname?.startsWith('/admin/categories'))

  const isActive = (path: string) => pathname === path

  return (
    <nav className="flex-1 px-4 py-2 space-y-4">
      {/* Main Section */}
      <div className="space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all group ${
            isActive('/admin') 
              ? 'bg-primary/5 text-primary' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        {/* Dropdown for Posts */}
        <div className="space-y-1">
          <button
            onClick={() => setIsPostsOpen(!isPostsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-all group ${
              pathname?.startsWith('/admin/new') || pathname?.startsWith('/admin/categories')
                ? 'text-primary'
                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              Manage Content
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isPostsOpen ? 'rotate-180' : ''}`} />
          </button>

          {isPostsOpen && (
            <div className="pl-9 space-y-1 animate-fade-in">
              <Link
                href="/admin/new"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/admin/new')
                    ? 'text-primary font-bold'
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                New Post
              </Link>
              <Link
                href="/admin/categories"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/admin/categories')
                    ? 'text-primary font-bold'
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                Categories
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Settings Section */}
      <div className="space-y-1 pt-4 border-t border-slate-100">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Configurations</p>
        <Link
          href="/admin/integrations"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all group ${
            isActive('/admin/integrations')
              ? 'bg-primary/5 text-primary'
              : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
          }`}
        >
          <Zap className="w-4 h-4" />
          Integrations
        </Link>
        <Link
          href="/blog"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary font-medium transition-all group"
        >
          <ExternalLink className="w-4 h-4" />
          View Site
        </Link>
      </div>
    </nav>
  )
}
