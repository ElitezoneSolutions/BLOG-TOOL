import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, ChevronRight, Search } from 'lucide-react'

export const metadata = {
  title: "Ahmed TLS — Articles, Guides & Insights",
  description: "Explore a wide range of articles covering technology, productivity, lifestyle, health, science, and more. Fresh perspectives published regularly.",
  alternates: {
    canonical: 'https://ahmedtls.pro',
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ahmedtls.pro" }
    ]
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ── Page Header ── */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
            <ZapIcon />
            The Editorial
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.05]">
            Stories, Ideas &amp; <span className="text-primary italic">Insights.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
            Thoughtful articles on technology, productivity, health, science, and everyday life — published for curious minds.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full lg:w-80 space-y-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search articles…"
              className="w-full bg-card border border-border rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all font-semibold text-sm shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Tips', 'News', 'Guides'].map((cat) => (
              <button
                key={cat}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  cat === 'All'
                    ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Featured Post Hero ── */}
      {featuredPost && (
        <section className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className={`grid ${featuredPost.cover_image ? 'lg:grid-cols-[1fr_1fr]' : ''} items-center`}>

            {featuredPost.cover_image && (
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden min-h-[280px]">
                <img
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1.5 bg-foreground text-background text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    Featured Article
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12 lg:p-16 space-y-6">
              {!featuredPost.cover_image && (
                <span className="inline-flex px-3 py-1.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                  Featured Article
                </span>
              )}

              {featuredPost.categories?.[0] && (
                <span className="inline-flex px-2.5 py-1 bg-muted text-muted-foreground text-[9px] font-black uppercase tracking-widest rounded-lg border border-border ml-2">
                  {featuredPost.categories[0]}
                </span>
              )}

              <div className="flex items-center gap-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  5 min read
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-base text-muted-foreground font-medium leading-relaxed line-clamp-3">
                {featuredPost.excerpt || featuredPost.content.replace(/<[^>]*>/g, '').substring(0, 200) + '…'}
              </p>

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                Read Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Articles Grid ── */}
      {remainingPosts.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-border pb-5">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Latest</p>
              <h2 className="text-2xl font-black text-foreground tracking-tight">All <span className="italic">Articles</span></h2>
            </div>
            <p className="text-xs font-bold text-muted-foreground">{remainingPosts.length} article{remainingPosts.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingPosts.map((post) => {
              const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0
              const readTime = Math.max(1, Math.ceil(wordCount / 200))
              const blurb = post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 120) + '…'

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-card border border-border rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400"
                >
                  {post.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {post.categories?.[0] && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-primary/10">
                            {post.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-7 flex-1 flex flex-col gap-4">
                    {!post.cover_image && post.categories?.[0] && (
                      <span className="self-start px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                        {post.categories[0]}
                      </span>
                    )}

                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {readTime} min
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed flex-1">
                      {blurb}
                    </p>

                    <div className="flex items-center gap-1.5 text-foreground font-black text-[11px] uppercase tracking-widest mt-auto pt-2 border-t border-border">
                      Read Article
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {!featuredPost && (
        <div className="py-32 text-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
          <p className="text-xl font-bold text-muted-foreground italic">Nothing here yet — great content is on the way. Stay tuned!</p>
        </div>
      )}
    </div>
  )
}

function ZapIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
