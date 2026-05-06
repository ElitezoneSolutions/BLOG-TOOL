import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Calendar, ChevronRight } from 'lucide-react'

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
    <article className="max-w-[1200px] mx-auto px-4 py-12 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className="text-center mb-16 md:mb-24">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground tracking-tighter">
          The <span className="text-primary italic">Blog</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Guides, tips, and insights on chronological age, precision calculation, and life milestones.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card border border-border rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-widest mb-6">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              
              <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h2>
              
              <p className="text-muted-foreground font-medium mb-8 line-clamp-3 text-sm leading-relaxed">
                {post.excerpt || post.content.substring(0, 150) + '...'}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-foreground font-black text-sm uppercase tracking-wider">
                Read Article
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <h3 className="text-2xl font-bold text-muted-foreground italic">No articles published yet. Stay tuned!</h3>
          </div>
        )}
      </div>
    </article>
  )
}
