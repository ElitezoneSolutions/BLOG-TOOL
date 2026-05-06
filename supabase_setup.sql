-- Create a table for blog posts
create table posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  published boolean default false,
  author_id uuid references auth.users(id) default auth.uid()
);

-- Set up Row Level Security (RLS)
alter table posts enable row level security;

-- Policy: Anyone can view published posts
create policy "Anyone can view published posts"
  on posts for select
  using (published = true);

-- Policy: Only authenticated users can manage posts (all actions)
create policy "Authenticated users can manage posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
