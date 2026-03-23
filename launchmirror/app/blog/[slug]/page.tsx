import Link from 'next/link'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { blogPosts } from '@/lib/blog-data'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — LaunchMirror Blog`,
    description: post.excerpt,
  }
}

const ACCENT_COLORS: Record<string, string> = {
  VALIDATION: '#7c3aed',
  STRATEGY: '#4edea3',
  'MARKET RESEARCH': '#f59e0b',
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) redirect('/blog')

  const accent = ACCENT_COLORS[post.category] ?? '#7c3aed'
  const paragraphs = post.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#200c1c] overflow-x-hidden">
      <Navbar />

      <main
        className="pt-28 pb-20 px-4 md:px-6"
        style={{
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(124,58,237,0.2) 0%, transparent 55%), #200c1c',
        }}
      >
        <div className="max-w-[720px] mx-auto">

          {/* ——— HEADER ——— */}
          <div className="mb-10">
            {/* Category badge */}
            <span
              className="inline-block text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full mb-5"
              style={{
                color: accent,
                background: `${accent}18`,
                fontFamily: 'var(--font-display)',
              }}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1
              className="text-2xl md:text-4xl font-extrabold text-[#fdd8ef] leading-[1.15] tracking-[-0.02em] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-2 md:gap-3">
              <span
                className="text-sm text-[#ccc3d8]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.date}
              </span>
              <span className="text-[rgba(204,195,216,0.3)] text-sm">·</span>
              <span
                className="text-sm text-[#ccc3d8]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.readTime}
              </span>
            </div>

            {/* Divider */}
            <div
              className="mt-8 h-px w-full"
              style={{ background: 'rgba(74,68,85,0.2)' }}
            />
          </div>

          {/* ——— CONTENT ——— */}
          <div className="mb-14">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="mb-7 leading-[1.85]"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: idx === 0 ? '1.125rem' : '1rem',
                  color: '#ccc3d8',
                  ...(idx === 0
                    ? {
                        paddingLeft: '1.1rem',
                        borderLeft: `3px solid ${accent}`,
                      }
                    : {}),
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* ——— BOTTOM DIVIDER ——— */}
          <div
            className="mb-8 h-px w-full"
            style={{ background: 'rgba(74,68,85,0.2)' }}
          />

          {/* ——— BACK LINK ——— */}
          <div className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 hover:opacity-80"
              style={{ color: '#7c3aed', fontFamily: 'var(--font-display)' }}
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>

          {/* ——— CTA CARD ——— */}
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-5"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%), #2a1425',
              boxShadow: '0 10px 30px -10px rgba(124,58,237,0.25)',
            }}
          >
            <h2
              className="text-xl md:text-2xl font-extrabold text-[#fdd8ef]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Validate Your Own Idea
            </h2>
            <p
              className="text-sm text-[#ccc3d8] max-w-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              See exactly what LaunchMirror would say about your business.
            </p>
            <Link
              href="/analyze"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Analyze My Business <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      {/* ——— FOOTER ——— */}
      <footer
        className="py-8 px-6 lg:px-20 text-center"
        style={{ background: '#1b0717', borderTop: '1px solid rgba(74,68,85,0.15)' }}
      >
        <p className="text-xs text-[rgba(204,195,216,0.4)]" style={{ fontFamily: 'var(--font-body)' }}>
          © 2025 LaunchMirror. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
