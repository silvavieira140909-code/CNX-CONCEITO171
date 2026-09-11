-- Supabase schema for Vault Prime. Run in Supabase SQL editor.
create type public.user_role as enum ('user','admin');
create type public.product_type as enum ('download','apk','video','external');
create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,email text,name text,role public.user_role not null default 'user',created_at timestamptz default now());
create table public.products(id uuid primary key default gen_random_uuid(),title text not null,description text default '',price numeric(12,2) not null default 0,type public.product_type not null,image_url text,file_path text,external_url text,featured boolean default false,active boolean default true,created_at timestamptz default now());
create table public.orders(id uuid primary key default gen_random_uuid(),user_id uuid references auth.users(id),status text not null default 'pending',gateway text,payment_id text,total numeric(12,2) not null default 0,created_at timestamptz default now());
create table public.order_items(id uuid primary key default gen_random_uuid(),order_id uuid not null references public.orders(id) on delete cascade,product_id uuid not null references public.products(id),price numeric(12,2) not null);
create table public.entitlements(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,product_id uuid not null references public.products(id) on delete cascade,created_at timestamptz default now(),unique(user_id,product_id));
create or replace function public.handle_new_user() returns trigger language plpgsql security definer as $$ begin insert into public.profiles(id,email,name) values(new.id,new.email,new.raw_user_meta_data->>'name'); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;
alter table public.profiles enable row level security; alter table public.products enable row level security; alter table public.orders enable row level security; alter table public.order_items enable row level security; alter table public.entitlements enable row level security;
create policy "public active products" on public.products for select using(active=true or public.is_admin());
create policy "own profile" on public.profiles for select using(id=auth.uid() or public.is_admin());
create policy "admin products" on public.products for all using(public.is_admin()) with check(public.is_admin());
create policy "own orders" on public.orders for select using(user_id=auth.uid() or public.is_admin());
create policy "own entitlements" on public.entitlements for select using(user_id=auth.uid() or public.is_admin());
-- Storage: create private buckets named product-files and private-videos in Supabase dashboard.
-- For production, grant access through signed URLs only after checking entitlements server-side.
