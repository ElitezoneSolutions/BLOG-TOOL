"use client"

import { Bold, Italic, Heading1, Heading2, Heading3, Link, Quote, List, Code, Type } from "lucide-react"

interface MarkdownToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  onUpdate: (value: string) => void
}

export default function MarkdownToolbar({ textareaRef, onUpdate }: MarkdownToolbarProps) {
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    
    let prefix = before
    
    // For headings, ensure they start on a new line if not already
    if (before.startsWith('#') || before.startsWith('>')) {
      const lineStart = text.lastIndexOf('\n', start - 1) + 1
      if (start !== lineStart) {
        prefix = '\n' + before
      }
    }

    const newText = 
      text.substring(0, start) + 
      prefix + 
      selectedText + 
      after + 
      text.substring(end)

    onUpdate(newText)
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus()
      if (start === end) {
        // Position cursor in the middle of before/after (e.g., between ** and **)
        const newPos = start + prefix.length
        textarea.setSelectionRange(newPos, newPos)
      } else {
        // Keep the previously selected text selected within the new wrappers
        textarea.setSelectionRange(
          start + prefix.length,
          end + prefix.length
        )
      }
    }, 0)
  }

  const handleLink = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    
    if (start === end) {
      insertText("[", "](https://)")
    } else {
      insertText("[", "](https://)")
    }
  }

  const tools = [
    { icon: <Heading1 className="w-3.5 h-3.5" />, label: "H1", action: () => insertText("# ", "") },
    { icon: <Heading2 className="w-3.5 h-3.5" />, label: "H2", action: () => insertText("## ", "") },
    { icon: <Heading3 className="w-3.5 h-3.5" />, label: "H3", action: () => insertText("### ", "") },
    { icon: <Bold className="w-3.5 h-3.5" />, label: "Bold", action: () => insertText("**", "**") },
    { icon: <Italic className="w-3.5 h-3.5" />, label: "Italic", action: () => insertText("*", "*") },
    { icon: <Link className="w-3.5 h-3.5" />, label: "Link", action: handleLink },
    { icon: <Quote className="w-3.5 h-3.5" />, label: "Quote", action: () => insertText("> ", "") },
    { icon: <List className="w-3.5 h-3.5" />, label: "List", action: () => insertText("- ", "") },
    { icon: <Code className="w-3.5 h-3.5" />, label: "Code", action: () => insertText("`", "`") },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-50 border-b border-slate-200 rounded-t-lg">
      <div className="flex items-center gap-1 px-2 border-r border-slate-200 mr-1">
        <Type className="w-3 h-3 text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toolbar</span>
      </div>
      {tools.map((tool, index) => (
        <button
          key={index}
          type="button"
          onMouseDown={(e) => e.preventDefault()} // CRITICAL: Prevents button from taking focus
          onClick={tool.action}
          title={tool.label}
          className="p-1.5 hover:bg-white hover:text-primary rounded text-slate-500 transition-all hover:shadow-sm active:scale-90"
        >
          {tool.icon}
        </button>
      ))}
    </div>
  )
}
