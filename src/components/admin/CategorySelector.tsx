"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Check, ChevronDown } from "lucide-react"

const AVAILABLE_CATEGORIES = [
  "Age Calculation",
  "Chronology",
  "Life Hacks",
  "Statistics",
  "Tools",
  "Health",
  "Productivity",
  "Tutorials",
  "Facts",
  "Science"
]

export default function CategorySelector({ initialValue = [] }: { initialValue?: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>(initialValue)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = AVAILABLE_CATEGORIES.filter(cat => 
    cat.toLowerCase().includes(search.toLowerCase()) && !selected.includes(cat)
  )

  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter(s => s !== cat))
    } else {
      setSelected([...selected, cat])
    }
    setSearch("")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden Input for Form Submission */}
      <input type="hidden" name="categories" value={selected.join(',')} />

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[38px] px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus-within:border-primary transition-all cursor-pointer flex flex-wrap gap-1 items-center"
      >
        {selected.length > 0 ? (
          selected.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
              {cat}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCategory(cat)
                }}
              />
            </span>
          ))
        ) : (
          <span className="text-slate-400 text-xs">Select categories...</span>
        )}
        <ChevronDown className={`w-4 h-4 ml-auto text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-2 animate-fade-in">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              autoFocus
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-lg outline-none text-xs font-medium focus:bg-white focus:border-primary transition-all"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1">
            {search && !AVAILABLE_CATEGORIES.some(cat => cat.toLowerCase() === search.toLowerCase()) && (
              <button
                key="create-new"
                type="button"
                onClick={() => toggleCategory(search)}
                className="w-full text-left px-3 py-2 bg-primary/5 hover:bg-primary/10 rounded-lg text-xs font-bold text-primary flex items-center justify-between group transition-all"
              >
                <span>Create "<span className="italic">{search}</span>"</span>
                <Plus className="w-3 h-3" />
              </button>
            )}

            {filtered.length > 0 ? (
              filtered.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-between group"
                >
                  {cat}
                  <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))
            ) : !search ? (
               <p className="text-center py-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Start typing to search...</p>
            ) : null}
            
            {/* Show remaining selected at the bottom with a checkmark */}
            {selected.length > 0 && (
              <div className="pt-2 mt-2 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase px-3 mb-1">Selected</p>
                {selected.map(cat => (
                   <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className="w-full text-left px-3 py-2 bg-primary/5 rounded-lg text-xs font-bold text-primary flex items-center justify-between"
                  >
                    {cat}
                    <Check className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}
