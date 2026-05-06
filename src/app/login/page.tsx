import { login, signup } from './actions'
import { AlertCircle, Lock, Mail } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>
}) {
  const { message, error } = await searchParams

  return (
    <div className="flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-2 mx-auto py-20">
      <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm font-medium">
            Sign in to manage your articles and blogs
          </p>
        </div>

        <form className="animate-fade-in flex-1 flex flex-col w-full justify-center gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                  name="email"
                  placeholder="admin@ahmedtls.pro"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-2xl flex items-center gap-3 text-destructive text-sm font-bold">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {message && (
            <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3 text-primary text-sm font-bold">
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <button
              formAction={login}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-lg hover:bg-primary/90 hover:-translate-y-1 transition-all active:translate-y-0"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full py-4 bg-background text-muted-foreground border-2 border-border rounded-2xl font-bold text-lg hover:bg-muted hover:text-foreground transition-all"
            >
              Request Access
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
