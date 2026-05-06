import { createClient } from '@/utils/supabase/server'
import { Folder, FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  // Fetch all posts to extract unique categories
  const { data: posts, error } = await supabase
    .from('posts')
    .select('categories')

  // Extract and count unique categories
  const categoryCounts: Record<string, number> = {}
  posts?.forEach(post => {
    post.categories?.forEach((cat: string) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })
  })

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories & Collections</h1>
          <p className="text-sm text-slate-500">Manage and view your content organization</p>
        </div>
        <Link 
          href="/admin/new"
          className="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.name} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-primary transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Folder className="w-20 h-20" />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <Folder className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {cat.count} Articles
                </span>
              </div>
              <div className="mt-6 relative z-10">
                <h3 className="font-bold text-slate-900 text-lg leading-tight truncate">
                  {cat.name}
                </h3>
                <Link 
                  href={`/admin?search=${encodeURIComponent(cat.name)}`}
                  className="mt-4 text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View All Related Posts
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 border-dashed rounded-2xl">
             <Folder className="w-12 h-12 text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 font-medium">No categories created yet.</p>
             <p className="text-xs text-slate-300 mt-1">Categories are automatically generated when you create posts.</p>
          </div>
        )}
      </div>
    </div>
  )
}
