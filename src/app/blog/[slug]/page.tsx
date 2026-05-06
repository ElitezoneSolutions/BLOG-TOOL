import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ChevronLeft, User, Share2, Clock, Bookmark, MessageSquare, ExternalLink, Globe } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return {}

  const url = post.canonical_url || `https://ahmedtls.pro/blog/${slug}`

  return {
    title: post.meta_title || `${post.title} | Age Calculator Blog`,
    description: post.meta_description || post.excerpt || `Read our latest article: ${post.title}`,
    keywords: post.focus_keywords?.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      url: url,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: ['Ahmed Raza'],
      images: (post.og_image || post.cover_image) ? [{ url: post.og_image || post.cover_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: (post.og_image || post.cover_image) ? [post.og_image || post.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post || error) {
    notFound()
  }

  // Calculate dynamic reading time (avg 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Extract headers for Table of Contents
  const headerRegex = /<(h[23])>(.*?)<\/h[23]>/g
  const toc: { id: string, text: string, level: string }[] = []
  let match
  const contentWithIds = post.content.replace(/<(h[23])>(.*?)<\/h[23]>/g, (match: string, level: string, text: string) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    toc.push({ id, text: text.replace(/<[^>]*>/g, ''), level })
    return `<${level} id="${id}">${text}</${level}>`
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.meta_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.og_image,
    "author": {
      "@type": "Person",
      "name": "Ahmed Raza",
      "url": "https://ahmedtls.pro/author/ahmed-raza"
    },
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "keywords": post.focus_keywords?.join(', '),
    "articleSection": post.categories?.[0],
    "publisher": {
      "@type": "Organization",
      "name": "Exact Age Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ahmedtls.pro/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ahmedtls.pro/blog/${post.slug}`
    }
  }

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://ahmedtls.pro/blog/${post.slug}`
      }
    ]
  }

  return (
    <div className="relative">
      {/* Reading Progress Bar (Accessibility optimized) */}
      <div 
        className="fixed top-0 left-0 w-full h-1 z-[100] bg-muted/20 pointer-events-none"
        role="progressbar"
        aria-label="Reading progress"
      >
        <div 
          className="h-full bg-primary animate-[progress_linear_forwards] origin-left" 
          style={{ 
            animationTimeline: 'scroll()',
            width: '0%' 
          }}
        ></div>
      </div>

      <article className="max-w-[1400px] mx-auto px-4 py-12 md:py-24 animate-fade-in" itemScope itemType="https://schema.org/BlogPosting">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-12">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-black text-[11px] uppercase tracking-widest transition-all group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Editorial
            </Link>
          </nav>

          <header className="space-y-8 mb-16">
            <div className="space-y-4">
              {post.categories?.[0] && (
                <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                  {post.categories[0]}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-[1.1]" itemProp="headline">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold text-muted-foreground uppercase tracking-widest py-6 border-y border-border">
              <time className="flex items-center gap-2" dateTime={post.created_at} itemProp="datePublished">
                <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                {readingTime} min read
              </div>
              <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                <User className="w-4 h-4 text-primary" aria-hidden="true" />
                <span itemProp="name">Ahmed Raza</span>
              </div>
            </div>
            
            {post.cover_image && (
              <figure className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden border border-border shadow-2xl relative group">
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy" 
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </figure>
            )}
            
            {post.excerpt && (
              <p className="text-lg md:text-xl text-foreground/70 font-medium italic leading-relaxed border-l-2 border-primary/30 pl-8 py-1" itemProp="description">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Table of Contents Section */}
          {toc.length > 0 && (
            <section className="mb-16 p-8 bg-card border border-border rounded-[2.5rem] shadow-xl" aria-labelledby="toc-heading">
              <h2 id="toc-heading" className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Table of Contents
              </h2>
              <nav className="space-y-3">
                {toc.map((item) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className={`block text-sm font-bold text-muted-foreground hover:text-primary transition-colors ${item.level === 'h3' ? 'pl-6' : ''}`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </section>
          )}

          <div className="bg-card border border-border p-8 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div 
              className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none font-medium leading-relaxed text-foreground/90 prose-headings:tracking-tight prose-headings:font-black prose-p:leading-loose prose-a:text-primary prose-a:font-bold prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
              itemProp="articleBody"
            />

              <footer className="mt-20 pt-12 border-t border-border space-y-12">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">AR</div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Written by</p>
                      <p className="text-sm font-bold text-foreground">Ahmed Raza</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 bg-muted hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-2xl transition-all font-black text-[11px] uppercase tracking-widest shadow-sm active:scale-95">
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </button>
                    <button className="p-3 bg-muted hover:bg-foreground hover:text-background rounded-2xl transition-all active:scale-95">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Tags section */}
                {post.focus_keywords && post.focus_keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.focus_keywords.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase rounded-lg border border-border">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </footer>
            </div>

            {/* Related Posts Section */}
            <RelatedPosts currentId={post.id} />

            {/* Newsletter Section */}
            <section className="mt-32 bg-foreground text-background rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-[100px] transition-transform duration-1000 group-hover:scale-110"></div>
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight">Stay ahead of the <span className="text-primary italic">curve.</span></h3>
                    <p className="text-background/60 font-medium leading-relaxed">
                      Join 5,000+ readers and get our latest precision age guides and life hacks delivered to your inbox every month.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        placeholder="your@email.com" 
                        className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-1 outline-none focus:border-primary transition-all text-sm font-bold placeholder:text-white/30"
                      />
                      <button className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:-translate-y-1 transition-all shadow-xl shadow-primary/20">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-end">
                     <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <MessageSquare className="w-16 h-16 text-primary" />
                     </div>
                  </div>
               </div>
            </section>
        </div>
      </article>
    </div>
  )
}

async function RelatedPosts({ currentId }: { currentId: string }) {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .neq('id', currentId)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) return null

  return (
    <div className="mt-32 space-y-12">
      <div className="flex items-end justify-between border-b border-border pb-8">
        <div className="space-y-4">
           <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Continue Reading</p>
           <h3 className="text-2xl font-black text-foreground tracking-tight">Related <span className="italic">Articles</span></h3>
        </div>
        <Link href="/blog" className="hidden sm:flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
          View all posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group space-y-4"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-lg">
              {post.cover_image ? (
                <img 
                  src={post.cover_image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/20">
                  <Bookmark className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                <Calendar className="w-3 h-3 text-primary" />
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <h4 className="text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}
