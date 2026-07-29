# Verdant Farm OS

Verdant is a bright, bilingual farm operations platform for livestock, workforce, resources, finance, analytics, and recurring workflows.

## Live application

[verdant-farm-os.vercel.app](https://verdant-farm-os.vercel.app)

## Stack

- Next.js 16 and React 19
- Supabase Auth and PostgreSQL
- Row-level security on all operational tables
- Vercel hosting
- English and Arabic interfaces

## Local development

1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env.local`.
3. Add the Supabase project URL and publishable key.
4. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run build
npm test
```

## Database

The production schema and RLS policies are versioned in `supabase/migrations/`. Apply migrations with the Supabase CLI:

```bash
npx supabase db push
```

Never commit `.env.local`, database passwords, service-role keys, or other secrets.

## Deployment

The production Vercel project is `verdant-farm-os`. Its public Supabase variables are configured for Production, Preview, and Development environments. Pushes to the connected default branch can be deployed through Vercel.
