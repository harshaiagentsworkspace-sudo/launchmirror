# LaunchMirror

AI-powered business idea validator for Indian founders. Get a brutally honest viability score, market pulse, brutal truths, probability estimates, and a 90-day action plan in 30 seconds — free.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **AI**: NVIDIA NIM API (meta/llama-3.1-70b-instruct) via openai npm package
- **Search**: Serper API
- **PDF**: @react-pdf/renderer
- **Animations**: framer-motion
- **Icons**: lucide-react
- **Fonts**: Plus Jakarta Sans + Inter (next/font/google)

## Setup

```bash
# 1. Clone repo
git clone https://github.com/yourname/launchmirror.git
cd launchmirror

# 2. Install dependencies
npm install

# 3. Copy env file
cp .env.example .env.local

# 4. Add your API keys to .env.local
#    NVIDIA_API_KEY — get from build.nvidia.com (free tier)
#    SERPER_API_KEY — get from serper.dev (free, 100 searches/day)

# 5. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Keys

| Key | Where to get | Free tier |
|-----|--------------|-----------|
| `NVIDIA_API_KEY` | [build.nvidia.com](https://build.nvidia.com) → Sign up → API Keys | Yes — generous free tier |
| `SERPER_API_KEY` | [serper.dev](https://serper.dev) → Sign up | Yes — 100 searches/day |

## Netlify Deployment

1. Push repository to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**
3. Connect your GitHub repo
4. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Go to **Site settings → Environment variables** and add:
   - `NVIDIA_API_KEY`
   - `SERPER_API_KEY`
6. Click **Deploy site**

## Project Structure

```
launchmirror/
├── app/
│   ├── page.tsx              # Landing page
│   ├── analyze/page.tsx      # Input form
│   ├── mirror/page.tsx       # Mirror output
│   ├── roadmap/page.tsx      # Roadmap output
│   └── api/
│       ├── search/route.ts   # Serper market search
│       ├── mirror/route.ts   # AI Mirror analysis
│       └── roadmap/route.ts  # AI Roadmap generation
├── components/
│   ├── Navbar.tsx
│   ├── ViabilityMeter.tsx
│   ├── MirrorCard.tsx
│   ├── RoadmapSection.tsx
│   ├── LoadingState.tsx
│   └── PDFReport.tsx
├── lib/
│   ├── context.tsx           # Global state
│   ├── nvidia.ts             # AI client
│   ├── serper.ts             # Search utility
│   ├── prompts.ts            # AI prompts
│   └── pdf-utils.ts          # PDF generation
└── types/index.ts            # TypeScript interfaces
```
