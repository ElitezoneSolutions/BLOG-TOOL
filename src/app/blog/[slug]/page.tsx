import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ChevronLeft, User, Share2 } from 'lucide-react'

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
    "articleSection": post.category,
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
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-24 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold text-sm mb-12 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <header className="space-y-6 mb-16">
        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Ahmed Raza
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
          {post.title}
        </h1>
        
        {post.cover_image && (
          <div className="w-full aspect-video rounded-[3rem] overflow-hidden border border-border shadow-2xl my-12">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        {post.excerpt && (
          <p className="text-xl md:text-2xl text-muted-foreground font-medium italic leading-relaxed border-l-4 border-primary/20 pl-6 py-2">
            {post.excerpt}
          </p>
        )}
      </header>

      <div className="bg-card border border-border p-8 md:p-16 rounded-[3rem] shadow-2xl">
        <div 
          className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none font-medium leading-loose text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 pt-12 border-t border-border flex justify-between items-center">
          <div className="text-sm font-bold text-muted-foreground italic">
            Thanks for reading!
          </div>
          <button className="flex items-center gap-2 bg-muted hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-sm">
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
        </footer>
      </div>
    </article>
  )
}
