# Kala Esok — Admin Dashboard

> Frontend admin dashboard untuk platform perencanaan pemakaman **Kala Esok**.

## Tech Stack

| Layer         | Library                   |
| ------------- | ------------------------- |
| Framework     | Next.js 16 (App Router)   |
| Styling       | Tailwind CSS v4           |
| UI Components | Shadcn UI                 |
| Auth          | NextAuth.js v4 (JWT)      |
| State         | Redux Toolkit             |
| Icons         | Lucide React              |
| Charts        | Recharts                  |
| Code Quality  | ESLint + Prettier + Husky |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open in browser
http://localhost:3000
```

**Demo Login:**

- Email: `admin@kalaesok.com`
- Password: `admin123`

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/           # Login page
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── layout.tsx          # Sidebar + Header layout
│   │   ├── dashboard/          # Dashboard Overview
│   │   ├── manajemen-user/     # User Management
│   │   ├── verifikasi-dokumen/ # Document Verification
│   │   ├── layanan-paket/      # Service Packages
│   │   ├── checkout-payment/   # Transactions & Paylater
│   │   ├── database-pemakaman/ # Cemetery Database
│   │   ├── cms-blog/           # CMS Blog & Kitab
│   │   └── pengaturan/         # Settings
│   └── api/auth/[...nextauth]/ # NextAuth API
├── components/
│   ├── layout/                 # Sidebar, Header
│   ├── providers/              # Auth & Redux providers
│   └── shared/                 # Reusable: DataTable, StatsCard, StatusBadge, PageHeader
├── lib/
│   ├── store/                  # Redux store, slices, hooks
│   ├── api.ts                  # API service layer (BE-ready)
│   ├── auth.ts                 # NextAuth config
│   ├── dummy-data.ts           # Mock data (replace with real API)
│   └── utils.ts                # cn() helper
├── proxy.ts                    # Next.js 16 route protection
└── types/                      # Global TypeScript types
```

## Connecting to Backend

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Replace dummy data imports with the service calls in `src/lib/api.ts`
3. Each page already has the service functions ready to use

```ts
// Example: Replace dummy data in manajemen-user/page.tsx
import { userService } from '@/lib/api';
const { data } = await userService.getAll(session.token);
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint check
npm run lint:fix     # Auto-fix lint errors
npm run format       # Format all files
npm run type-check   # TypeScript check
```

## Environment Variables

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://your-api.com/api
```
