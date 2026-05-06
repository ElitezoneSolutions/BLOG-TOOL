"use client"

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deletePost } from '@/app/admin/actions'

export default function DeletePostButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setIsDeleting(true)
      try {
        await deletePost(id)
      } catch (error) {
        alert('Failed to delete post')
        setIsDeleting(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-all disabled:opacity-50"
      title="Delete"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  )
}
