import { Info, Key, Copy, Terminal, Zap, ShieldCheck, Globe, BookOpen, Database, ArrowRight } from 'lucide-react'

export default function IntegrationsPage() {
  const webhookSecret = process.env.WEBHOOK_SECRET || 'Not Configured'
  const baseUrl = `https://ahmedtls.pro`
  const publishUrl = `${baseUrl}/api/webhook/publish`
  const postsUrl = `${baseUrl}/api/posts`

  const fields = [
    { name: 'title', type: 'string', required: true, description: 'Article title' },
    { name: 'slug', type: 'string', required: false, description: 'URL slug (auto-generated from title if omitted)' },
    { name: 'content', type: 'string (HTML)', required: false, description: 'Full article body as an HTML string' },
    { name: 'excerpt', type: 'string', required: false, description: 'Short summary shown in blog cards' },
    { name: 'cover_image', type: 'string (URL)', required: false, description: 'Hero image URL' },
    { name: 'og_image', type: 'string (URL)', required: false, description: 'Social sharing image URL' },
    { name: 'meta_title', type: 'string', required: false, description: 'SEO page title (defaults to title)' },
    { name: 'meta_description', type: 'string', required: false, description: 'SEO meta description (defaults to excerpt)' },
    { name: 'canonical_url', type: 'string (URL)', required: false, description: 'Canonical URL for SEO' },
    { name: 'categories', type: 'string[]', required: false, description: 'Array of category labels' },
    { name: 'focus_keywords', type: 'string[]', required: false, description: 'Array of SEO focus keywords' },
    { name: 'published', type: 'boolean', required: false, description: 'Set to true to publish immediately' },
  ]

  const getParams = [
    { name: 'published', type: 'true | false', description: 'Filter by published status' },
    { name: 'limit', type: 'number', description: 'Number of posts per page (default: 50)' },
    { name: 'page', type: 'number', description: 'Page number for pagination (default: 1)' },
    { name: 'slug', type: 'string', description: 'Fetch a single post by its slug' },
    { name: 'id', type: 'string (UUID)', description: 'Fetch a single post by its database ID' },
  ]

  return (
    <div className="max-w-5xl space-y-10 animate-fade-in pb-24">

      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary rounded-2xl shadow-lg shadow-primary/20">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">API Reference</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed pl-[52px]">
          Full reference for the Exact Age Calculator CMS REST API. Publish, update and retrieve blog posts programmatically from any external service.
        </p>
      </header>

      {/* Authentication Card */}
      <section className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary rounded-xl shadow-md shadow-primary/20">
              <Key className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">Authentication</h2>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">All endpoints require this header</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
            <ShieldCheck className="w-3 h-3" />
            Active
          </div>
        </div>
        <div className="p-8 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every API request must include the <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">X-Webhook-Secret</code> header. Requests without it will receive a <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">401 Unauthorized</code> response.
          </p>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3 h-3" /> Your Secret Key (X-Webhook-Secret)
            </label>
            <div className="group relative">
              <div className="w-full p-4 bg-foreground text-background rounded-2xl text-xs font-mono border border-foreground select-all overflow-hidden shadow-inner">
                <div className="relative z-10 tracking-wider break-all">{webhookSecret}</div>
              </div>
            </div>
            <p className="text-[11px] text-destructive font-bold flex items-center gap-1.5 px-1">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              Never expose this key in client-side code or commit it to a public repository.
            </p>
          </div>

          {/* Header Example */}
          <div className="p-5 bg-muted rounded-2xl space-y-2">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Required Header</p>
            <pre className="text-xs font-mono text-foreground/80 leading-relaxed">
{`X-Webhook-Secret: ${webhookSecret}
Content-Type: application/json`}
            </pre>
          </div>
        </div>
      </section>

      {/* Endpoints Overview */}
      <section className="grid sm:grid-cols-2 gap-4">
        {[
          { method: 'GET', path: '/api/posts', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', description: 'List all posts or fetch a single post by id/slug with filtering & pagination.' },
          { method: 'POST', path: '/api/webhook/publish', color: 'bg-green-500/10 text-green-600 border-green-500/20', description: 'Create or update a post. If slug already exists it performs an upsert.' },
        ].map((ep) => (
          <div key={ep.method} className="bg-card border border-border rounded-[1.5rem] p-6 space-y-3 hover:border-primary/20 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${ep.color}`}>{ep.method}</span>
              <code className="text-xs font-mono text-foreground font-bold">{ep.path}</code>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ep.description}</p>
          </div>
        ))}
      </section>

      {/* GET /api/posts */}
      <section className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border bg-blue-500/5 flex items-center gap-4">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">GET</span>
            <code className="text-sm font-mono font-bold text-foreground">/api/posts</code>
            <span className="text-xs text-muted-foreground">— Retrieve Posts</span>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Returns a paginated list of all posts. Use query parameters to filter by status, paginate results, or fetch a single post by <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">id</code> or <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">slug</code>.
          </p>

          {/* Query Params Table */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Query Parameters</h3>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Parameter</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden sm:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {getParams.map((p) => (
                    <tr key={p.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3"><code className="text-xs font-mono text-primary font-bold">{p.name}</code></td>
                      <td className="px-5 py-3 hidden sm:table-cell"><span className="text-[10px] font-bold text-muted-foreground font-mono">{p.type}</span></td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Response Schema */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Response Schema</h3>
            <div className="p-5 bg-foreground rounded-2xl shadow-inner">
              <pre className="text-[11px] text-background/80 leading-loose font-mono overflow-x-auto">{`{
  "success": true,
  "total": 42,
  "page": 1,
  "limit": 50,
  "data": [
    {
      "id": "uuid",
      "title": "My Article",
      "slug": "my-article",
      "content": "<p>HTML body...</p>",
      "excerpt": "Short summary",
      "published": true,
      "cover_image": "https://...",
      "categories": ["Guides"],
      "focus_keywords": ["age", "calculator"],
      "created_at": "2026-05-01T00:00:00Z",
      "updated_at": "2026-05-06T00:00:00Z"
    }
  ]
}`}</pre>
            </div>
          </div>

          {/* cURL Examples */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">cURL Examples</h3>
            {[
              { label: 'List all published posts', code: `curl -X GET "${postsUrl}?published=true&limit=10&page=1" \\\n  -H "X-Webhook-Secret: ${webhookSecret}"` },
              { label: 'Fetch a single post by slug', code: `curl -X GET "${postsUrl}?slug=my-article-slug" \\\n  -H "X-Webhook-Secret: ${webhookSecret}"` },
              { label: 'Fetch a single post by ID', code: `curl -X GET "${postsUrl}?id=your-post-uuid" \\\n  -H "X-Webhook-Secret: ${webhookSecret}"` },
            ].map((ex) => (
              <div key={ex.label} className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" />{ex.label}</p>
                <div className="p-4 bg-foreground rounded-xl">
                  <pre className="text-[11px] text-background/80 leading-relaxed font-mono overflow-x-auto">{ex.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POST /api/webhook/publish */}
      <section className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border bg-green-500/5 flex items-center gap-4">
          <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-green-500/10 text-green-600 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">POST</span>
            <code className="text-sm font-mono font-bold text-foreground">/api/webhook/publish</code>
            <span className="text-xs text-muted-foreground">— Create / Update Post</span>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Creates a new post, or updates it if a post with the same <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">slug</code> already exists (upsert). To explicitly target an existing post for update, pass its <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">id</code> or set <code className="px-1.5 py-0.5 bg-muted rounded text-foreground font-mono text-xs">action: "update"</code>.
          </p>

          {/* Request body */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Request Body Fields — <code className="font-mono normal-case text-primary">data</code> object</h3>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Field</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden sm:table-cell">Type</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden md:table-cell">Required</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {fields.map((f) => (
                    <tr key={f.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3"><code className="text-xs font-mono text-primary font-bold">{f.name}</code></td>
                      <td className="px-5 py-3 hidden sm:table-cell"><span className="text-[10px] font-bold text-muted-foreground font-mono">{f.type}</span></td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${f.required ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
                          {f.required ? 'required' : 'optional'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top-level request body */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Top-Level Body Fields</h3>
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Field</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Type</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'data', type: 'object', description: 'Post content and metadata (see fields above)' },
                    { name: 'action', type: '"update"', description: 'Set to "update" to force an update operation' },
                    { name: 'id', type: 'string (UUID)', description: 'Target a specific post by its database ID for update' },
                  ].map((f) => (
                    <tr key={f.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3"><code className="text-xs font-mono text-primary font-bold">{f.name}</code></td>
                      <td className="px-5 py-3"><span className="text-[10px] font-bold text-muted-foreground font-mono">{f.type}</span></td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* cURL Examples */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">cURL Examples</h3>
            {[
              {
                label: 'Create / Upsert a post',
                code: `curl -X POST "${publishUrl}" \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: ${webhookSecret}" \\
  -d '{
    "data": {
      "title": "How to Calculate Your Age",
      "slug": "how-to-calculate-age",
      "content": "<h2>Introduction</h2><p>Body...</p>",
      "excerpt": "A short description.",
      "cover_image": "https://example.com/image.jpg",
      "categories": ["Guides"],
      "focus_keywords": ["age calculator", "birthday"],
      "published": true
    }
  }'`,
              },
              {
                label: 'Update a post by ID',
                code: `curl -X POST "${publishUrl}" \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Secret: ${webhookSecret}" \\
  -d '{
    "action": "update",
    "id": "your-post-uuid-here",
    "data": {
      "title": "Updated Title",
      "published": true
    }
  }'`,
              },
            ].map((ex) => (
              <div key={ex.label} className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground flex items-center gap-2"><ArrowRight className="w-3 h-3 text-primary" />{ex.label}</p>
                <div className="p-4 bg-foreground rounded-xl">
                  <pre className="text-[11px] text-background/80 leading-relaxed font-mono overflow-x-auto">{ex.code}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Success Response */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Success Response</h3>
            <div className="p-5 bg-foreground rounded-2xl shadow-inner">
              <pre className="text-[11px] text-background/80 leading-loose font-mono overflow-x-auto">{`{
  "success": true,
  "message": "Post processed successfully",
  "data": {
    "id": "uuid",
    "title": "How to Calculate Your Age",
    "slug": "how-to-calculate-age",
    "published": true,
    "updated_at": "2026-05-06T08:00:00.000Z"
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Error Reference */}
      <section className="bg-card border border-border rounded-[2rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/30 flex items-center gap-4">
          <div className="p-2.5 bg-destructive/10 border border-destructive/20 rounded-xl">
            <Info className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-bold text-base text-foreground">Error Reference</h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Standard HTTP error codes</p>
          </div>
        </div>
        <div className="p-6">
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                  <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Meaning</th>
                  <th className="text-left px-5 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Common Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { status: '401', meaning: 'Unauthorized', cause: 'Missing or incorrect X-Webhook-Secret header' },
                  { status: '400', meaning: 'Bad Request', cause: 'Missing required fields: title or slug' },
                  { status: '500', meaning: 'Server Error', cause: 'Database error or missing SUPABASE_SERVICE_ROLE_KEY env var' },
                ].map((e) => (
                  <tr key={e.status} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3"><code className="text-xs font-mono font-bold text-destructive">{e.status}</code></td>
                    <td className="px-5 py-3 text-xs font-bold text-foreground">{e.meaning}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{e.cause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  )
}
