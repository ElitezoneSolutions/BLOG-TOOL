'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const published = formData.get('published') === 'on'
  
  // New SEO fields
  const userSlug = formData.get('slug') as string
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const og_image = formData.get('og_image') as string
  const cover_image = formData.get('cover_image') as string
  const canonical_url = formData.get('canonical_url') as string
  const categories = (formData.get('categories') as string)?.split(',').map(c => c.trim()).filter(Boolean) || []
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []
  const focus_keywords = (formData.get('focus_keywords') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []

  // Slug generation (prioritize user input, fallback to title)
  const baseSlug = userSlug || title
  const slug = baseSlug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const { data, error } = await supabase
    .from('posts')
    .insert([{ 
      title, 
      content, 
      excerpt, 
      published, 
      slug,
      meta_title,
      meta_description,
      og_image,
      cover_image,
      canonical_url,
      categories,
      tags,
      focus_keywords
    }])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/blog')
  redirect('/admin')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const published = formData.get('published') === 'on'
  const slug = formData.get('slug') as string
  
  // New SEO fields
  const meta_title = formData.get('meta_title') as string
  const meta_description = formData.get('meta_description') as string
  const og_image = formData.get('og_image') as string
  const cover_image = formData.get('cover_image') as string
  const canonical_url = formData.get('canonical_url') as string
  const categories = (formData.get('categories') as string)?.split(',').map(c => c.trim()).filter(Boolean) || []
  const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []
  const focus_keywords = (formData.get('focus_keywords') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []

  const { error } = await supabase
    .from('posts')
    .update({ 
      title, 
      content, 
      excerpt, 
      published, 
      slug,
      meta_title,
      meta_description,
      og_image,
      cover_image,
      canonical_url,
      categories,
      tags,
      focus_keywords
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  redirect('/admin')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/blog')
}
