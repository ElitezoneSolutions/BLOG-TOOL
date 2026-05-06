"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import { Globe, Type, AlignLeft } from "lucide-react";

export default function SEOForm({ initialData }: { initialData?: any }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.meta_description || "");
  const [content, setContent] = useState(initialData?.content || "");

  useEffect(() => {
    if (!initialData) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setSlug(generatedSlug);
      setMetaTitle(title);
    }
  }, [title, initialData]);

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Article Title</label>
          <input 
            name="title" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none text-lg font-bold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cover Image URL</label>
          <input 
            name="cover_image" 
            defaultValue={initialData?.cover_image}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content</label>
          <input type="hidden" name="content" value={content} />
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          SEO & Metadata
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Globe className="w-3 h-3" /> Slug
            </label>
            <input 
              name="slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-primary transition-all outline-none font-medium text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-2">
                <Type className="w-3 h-3" /> Meta Title
              </label>
              <span className={`text-[10px] font-medium ${metaTitle.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                {metaTitle.length}/60
              </span>
            </div>
            <input 
              name="meta_title" 
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none font-medium text-sm"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-2">
                <AlignLeft className="w-3 h-3" /> Meta Description
              </label>
              <span className={`text-[10px] font-medium ${metaDesc.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                {metaDesc.length}/160
              </span>
            </div>
            <textarea 
              name="meta_description" 
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-primary transition-all outline-none font-medium text-xs leading-relaxed resize-none"
            ></textarea>
          </div>

        </div>
      </div>
    </div>
  );
}
