import { createAdminClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const secret = request.headers.get('X-Webhook-Secret')

    if (!secret || secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const offset = (page - 1) * limit
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')

    const supabase = await createAdminClient()

    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by published status
    if (published === 'true') query = query.eq('published', true)
    if (published === 'false') query = query.eq('published', false)

    // Fetch a single post by id or slug
    if (id) query = query.eq('id', id)
    if (slug) query = query.eq('slug', slug)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      total: count,
      page,
      limit,
      data,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
