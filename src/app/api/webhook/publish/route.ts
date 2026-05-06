import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('X-Webhook-Secret')
    
    if (!secret || secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, id, data } = body

    if (!data || (!data.title && !data.slug)) {
      return NextResponse.json({ error: 'Missing required data (title or slug)' }, { status: 400 })
    }

    const supabase = await createClient()

    // Prepare the data for Supabase
    // We map the incoming data to match our schema
    const postData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      published: data.published ?? false,
      meta_title: data.meta_title || data.title,
      meta_description: data.meta_description || data.excerpt,
      og_image: data.og_image,
      cover_image: data.cover_image,
      canonical_url: data.canonical_url,
      categories: data.categories || [],
      focus_keywords: data.focus_keywords || [],
      updated_at: new Date().toISOString()
    }

    let result;
    
    if (action === 'update' || id) {
      // Update by ID or Slug
      const query = supabase.from('posts').update(postData)
      if (id) {
        query.eq('id', id)
      } else {
        query.eq('slug', postData.slug)
      }
      result = await query.select()
    } else {
      // Create or Upsert based on Slug
      result = await supabase
        .from('posts')
        .upsert([postData], { onConflict: 'slug' })
        .select()
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    // Revalidate paths to show new content
    revalidatePath('/admin')
    revalidatePath('/blog')
    revalidatePath(`/blog/${postData.slug}`)

    return NextResponse.json({ 
      success: true, 
      message: `Post ${action || 'processed'} successfully`,
      data: result.data?.[0]
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
