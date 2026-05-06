-- Add SEO and Metadata columns to posts table
alter table posts
add column meta_title text,
add column meta_description text,
add column focus_keywords text[] default '{}',
add column tags text[] default '{}',
add column categories text[] default '{}',
add column og_image text,
add column cover_image text,
add column canonical_url text,
add column updated_at timestamp with time zone default timezone('utc'::text, now());

-- Create a function to update updated_at timestamp
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to run the function
create trigger set_updated_at
before update on posts
for each row
execute function handle_updated_at();
