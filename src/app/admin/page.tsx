import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Edit, Eye, Plus, Search, Filter, MoreHorizontal, X } from 'lucide-react'
import DeletePostButton from '@/components/admin/DeletePostButton'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams
  const supabase = await createClient()
  
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: allPosts } = await query

  let filteredPosts = allPosts || []
  if (search) {
    filteredPosts = filteredPosts.filter(post => 
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.categories?.some((cat: string) => cat.toLowerCase() === search.toLowerCase())
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {search ? `Results for "${search}"` : 'Dashboard'}
          </h1>
          <p className="text-sm text-slate-500">
            {search ? `Found ${filteredPosts.length} matches` : 'Manage your articles and content'}
          </p>
        </div>
        <div className="flex gap-2">
          {search && (
            <Link 
              href="/admin"
              className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
            >
              <X className="w-4 h-4" />
              Clear
            </Link>
          )}
          <Link 
            href="/admin/new"
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Create New
          </Link>
        </div>
      </div>

      {/* Basic Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Total Posts</p>
          <p className="text-2xl font-bold text-slate-900">{filteredPosts.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Published</p>
          <p className="text-2xl font-bold text-green-600">{filteredPosts.filter(p => p.published).length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Drafts</p>
          <p className="text-2xl font-bold text-orange-500">{filteredPosts.filter(p => !p.published).length}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <form action="/admin" method="GET" className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            name="search"
            defaultValue={search}
            placeholder="Search articles or categories..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
          />
        </form>
      </div>

      {/* Clean Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Article</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Categories</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-8 bg-slate-100 rounded-md overflow-hidden border border-slate-200 flex-shrink-0">
                          {post.cover_image && (
                            <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-900 block truncate text-sm">
                            {post.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium truncate block">
                            /{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.categories?.map((cat: string) => (
                          <span key={cat} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        post.published 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Link 
                          href={`/admin/edit/${post.id}`}
                          className="p-2 hover:bg-slate-100 rounded-md text-slate-400 hover:text-primary transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-900 transition-all"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <DeletePostButton id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic text-sm">
                    No articles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
