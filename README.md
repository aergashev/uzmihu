# UzMIHU Website

Multilingual public website with a hidden admin panel for publishing news from Prisma.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- NextAuth.js (Credentials)

## Single Source Of Truth

News is loaded from Prisma `Post` records (`published = true`) through `lib/content.ts`.
The public pages and admin panel both use the same data source.

## Hidden Admin Panel

- URL: `/private-admin-portal`
- Login URL: `/private-admin-portal/login`

## Environment Variables

Add to `.env.local`:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="a-strong-random-secret"

# Optional bootstrap for first admin user (created automatically if User table is empty)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-me"
ADMIN_NAME="Admin"
```

## Run

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

> > >
