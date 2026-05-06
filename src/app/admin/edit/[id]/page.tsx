import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { updatePost } from '../../actions'
import Link from 'next/link'
import SEOForm from '@/components/admin/SEOForm'
import CategorySelector from '@/components/admin/CategorySelector'
import { Save, X, Trash2, Hash, Tag, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post || error) {
    notFound()
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-slate-900">Edit Article</h1>
        <Link 
          href="/admin"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-all flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Cancel
        </Link>
      </div>

      <form action={updatePost.bind(null, id)} className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <SEOForm initialData={post} />
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6 sticky top-24">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Publication</label>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Excerpt</label>
                <textarea 
                  name="excerpt" 
                  rows={3}
                  defaultValue={post.excerpt}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none text-xs font-medium resize-none shadow-sm"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Hash className="w-3 h-3" /> Keywords
                </label>
                <input 
                  name="focus_keywords" 
                  defaultValue={post.focus_keywords?.join(', ')}
                  placeholder="keyword1, keyword2..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none text-xs font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Categories
                </label>
                <CategorySelector initialValue={post.categories || []} />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Social Image
                </label>
                <input 
                  name="og_image" 
                  defaultValue={post.og_image}
                  placeholder="URL..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none text-xs font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" /> Canonical
                </label>
                <input 
                  name="canonical_url" 
                  defaultValue={post.canonical_url}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-500">Live</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="published" defaultChecked={post.published} className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update Post
              </button>
              
              <button 
                type="button"
                className="w-full bg-white text-red-600 border border-red-100 py-2.5 rounded-lg font-semibold text-xs hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
