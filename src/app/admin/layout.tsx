import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../login/actions'
import { LogOut, ExternalLink, Menu } from 'lucide-react'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal | Exact Age Calculator',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      {/* Responsive Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col sticky top-0 h-auto md:h-screen z-50">
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold tracking-tight">Admin Portal</span>
          </Link>
          <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <AdminNav />

        <div className="p-4 border-t border-slate-100">
          <div className="px-4 py-3 mb-4 rounded-lg bg-slate-50 overflow-hidden">
            <p className="text-[10px] font-semibold text-slate-400 uppercase mb-0.5">User</p>
            <p className="text-xs font-medium text-slate-700 truncate">{user.email}</p>
          </div>
          <form action={logout}>
            <button className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg hover:bg-red-50 text-red-600 font-medium transition-all text-sm group">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-full w-full">
        {children}
      </main>
    </div>
  )
}
