import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Calendar, ChevronRight, Clock, ArrowRight, Tag, Search } from 'lucide-react'

export const metadata = {
  title: "Blog | Exact Age Calculator Tips & News",
  description: "Stay updated with the latest news, age calculation tips, and chronological age guides from the Exact Age Calculator team.",
  alternates: {
    canonical: 'https://ahmedtls.pro/blog',
  },
}

export default async function BlogPage() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const featuredPost = posts?.[0]
  const remainingPosts = posts?.slice(1) || []

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ahmedtls.pro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://ahmedtls.pro/blog"
      }
    ]
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-24 space-y-24 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      
      {/* Header section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
            <Zap className="w-3 h-3" />
            The Editorial
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9]">
            Insights & <span className="text-primary italic">Guides.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-medium leading-relaxed">
            Expert advice on chronological age, precision calculation, and celebrating life&apos;s biggest milestones.
          </p>
        </div>

        {/* Dynamic Search/Filter Bar */}
        <div className="w-full lg:w-96 space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full bg-card border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-bold text-sm shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
             {['All', 'Tips', 'News', 'Guides'].map((cat) => (
               <button 
                 key={cat}
                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                   cat === 'All' 
                    ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'bg-muted border-border text-muted-foreground hover:border-primary/30'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </header>

      {/* Featured Post */}
      {featuredPost && (
        <section className="relative group overflow-hidden rounded-[3rem] border border-border shadow-2xl bg-card">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="relative aspect-[16/10] lg:aspect-auto h-full overflow-hidden">
              {featuredPost.cover_image ? (
                <img 
                  src={featuredPost.cover_image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-primary/20 font-black text-6xl">NEWS</div>
                </div>
              )}
              <div className="absolute top-8 left-8">
                 <span className="px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                   Featured Article
                 </span>
              </div>
            </div>
            <div className="p-8 md:p-16 space-y-8">
              <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 5 min read</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed line-clamp-3">
                {featuredPost.excerpt || featuredPost.content.replace(/<[^>]*>/g, '').substring(0, 180) + '...'}
              </p>
              <div className="pt-4">
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all"
                >
                  Read Full Story
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid for remaining posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {remainingPosts.length > 0 ? (
          remainingPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                    <Tag className="w-12 h-12 text-muted-foreground/20" />
                  </div>
                )}
                {post.categories?.[0] && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-primary/10">
                      {post.categories[0]}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground font-medium mb-8 line-clamp-2 text-sm leading-relaxed opacity-80">
                  {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-black text-[11px] uppercase tracking-widest">
                    Read Article
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : !featuredPost && (
          <div className="col-span-full py-32 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
            <h3 className="text-2xl font-bold text-muted-foreground italic">No articles published yet. Stay tuned!</h3>
          </div>
        )}
      </div>
    </div>
  )
}

function Zap({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  )
}
