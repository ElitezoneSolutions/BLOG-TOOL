import { Info, Key, Copy, Terminal, ExternalLink, Zap, ShieldCheck, Globe } from 'lucide-react'

export default function IntegrationsPage() {
  const webhookSecret = process.env.WEBHOOK_SECRET || 'Not Configured'
  const webhookUrl = `https://ahmedtls.pro/api/webhook/publish`

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in pb-20">
      <header>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Integrations & API</h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">Connect external services to your blog via secure Webhooks</p>
      </header>

      {/* API Key Card */}
      <div className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:border-primary/20">
        <div className="p-8 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
              <Key className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">API Authentication</h2>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Secure Webhook Secret</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
            <ShieldCheck className="w-3 h-3" />
            Active
          </div>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3 h-3" /> Webhook Endpoint
              </label>
              <span className="text-[10px] font-bold text-primary uppercase">POST Request</span>
            </div>
            <div className="group relative">
              <code className="block w-full p-4 bg-muted text-foreground rounded-2xl text-xs font-mono border border-border transition-all group-hover:border-primary/30 break-all leading-relaxed">
                {webhookUrl}
              </code>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-background rounded-lg text-muted-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3" /> Secret Key (X-Webhook-Secret)
            </label>
            <div className="group relative">
              <div className="w-full p-4 bg-foreground text-background rounded-2xl text-xs font-mono border border-foreground select-all overflow-hidden relative shadow-inner">
                <div className="relative z-10 tracking-wider">{webhookSecret}</div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-primary-foreground/50 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-destructive font-bold flex items-center gap-1.5 px-1">
              <Info className="w-3.5 h-3.5" />
              Security Alert: Never expose this key in client-side code.
            </p>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-[2.5rem] shadow-lg p-10 space-y-8">
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <div className="p-2 bg-muted rounded-xl">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-extrabold text-foreground text-xl tracking-tight">Developer Implementation</h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">01</div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-foreground uppercase tracking-wide">Authentication</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Set the <code>X-Webhook-Secret</code> header to your secret key. All requests without this header will return a <code>401 Unauthorized</code> error.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">02</div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-foreground uppercase tracking-wide">Rich Content Support</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The <code>content</code> field supports full HTML strings. You can send headings, nested lists, and formatted tables exactly as they appear in the editor.
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-foreground rounded-[2rem] relative group shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Terminal className="w-20 h-20 text-background" />
              </div>
              <p className="text-[10px] font-black text-primary uppercase mb-4 tracking-widest">Interactive Example</p>
              <pre className="text-[11px] text-background/80 leading-relaxed block overflow-x-auto font-mono scrollbar-hide">
{`curl -X POST ${webhookUrl} \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: ${webhookSecret}" \\
  -d '{
    "data": {
      "title": "My API Article",
      "content": "<h1>Headline</h1><p>Body...</p>",
      "published": true
    }
  }'`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


