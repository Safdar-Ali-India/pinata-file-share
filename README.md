# Pinata File Share

Temporary file sharing built with **Next.js**, **Pinata IPFS**, and **SQLite**. Upload a file, pick an expiration, and share a link. When the timer runs out, Pinata removes the file and the link stops working.

## Features

- Upload files to Pinata (IPFS) with server-side JWT — keys never hit the browser
- Expiration presets: 1h, 6h, 24h, 7d, 30d (Pinata `expires_at` auto-delete)
- Shareable links with opaque tokens
- MIME type and size validation
- Per-IP upload rate limiting
- Daily cron cleanup for expired records
- Security headers (XSS, clickjacking, MIME sniffing)
- TypeScript strict mode, Drizzle ORM, Vitest tests

## Architecture

```
src/
├── app/                  # Next.js App Router (pages + API routes)
├── components/           # React UI
├── lib/
│   ├── db/               # Drizzle schema, repository, migrations
│   ├── pinata/           # Pinata SDK wrapper
│   ├── security/         # Rate limit, sanitization
│   └── validation/       # Zod-backed upload validation
└── types/                # Shared API types
```

**Flow:** Browser → `POST /api/upload` → validate → Pinata upload with `expires_at` → SQLite record → share URL.

## Setup

```bash
git clone https://github.com/Safdar-Ali-India/pinata-file-share.git
cd pinata-file-share
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PINATA_JWT` | Yes | Pinata API JWT |
| `PINATA_GATEWAY` | Yes | Gateway domain (e.g. `example.mypinata.cloud`) |
| `DATABASE_URL` | Yes | `file:./data/app.db` for local |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` |
| `CRON_SECRET` | Yes | Secret for cleanup endpoint |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Migrate + build |
| `npm test` | Unit tests |

## API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/upload` | Upload file with expiration |
| `GET` | `/api/share/:token` | File metadata |
| `GET` | `/api/share/:token/download` | Download redirect |
| `GET` | `/api/cron/cleanup` | Expired file cleanup |

## Deploy

Import to Vercel, set env vars, use Turso libSQL URL for production `DATABASE_URL`.

## License

MIT
