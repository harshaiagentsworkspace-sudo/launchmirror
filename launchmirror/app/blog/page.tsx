import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata = {
  title: 'Blog — LaunchMirror',
  description: 'Practical insights on business validation, market reality, and building things people actually pay for.',
}

const ACCENT_COLORS: Record<string, string> = {
  VALIDATION: '#7c3aed',
  STRATEGY: '#4edea3',
  'MARKET RESEARCH': '#f59e0b',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#200c1c] overflow-x-hidden">
      <Navbar />

      {/* ——— HEADER ——— */}
      <section
        className="pt-32 pb-14 md:pb-20 px-6 lg:px-20 text-center"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.3) 0%, transparent 60%), #200c1c',
        }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span
            className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}
          >
            The Blog
          </span>
          <h1
            className="text-3xl md:text-5xl font-extrabold text-[#fdd8ef] leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Insights For Indian Founders
          </h1>
          <p
            className="text-base text-[#ccc3d8] leading-relaxed max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Practical thinking on business validation, market reality, and building things people
            actually pay for.
          </p>
        </div>
      </section>

      {/* ——— BLOG GRID ——— */}
      <section className="py-10 md:py-16 px-6 lg:px-20 bg-[#200c1c]">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => {
              const accent = ACCENT_COLORS[post.category] ?? '#7c3aed'
              return (
                <article
                  key={post.slug}
                  className="flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: '#2a1425',
                    boxShadow: '0 10px 30px -10px rgba(124,58,237,0.15)',
                    border: '1px solid rgba(74,68,85,0.1)',
                  }}
                >
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {/* Category badge */}
                    <span
                      className="self-start text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full"
                      style={{
                        color: accent,
                        background: `${accent}18`,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2
                      className="text-base font-bold text-[#fdd8ef] leading-snug"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="text-sm text-[#ccc3d8] leading-relaxed flex-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-3 mt-auto"
                      style={{ borderTop: '1px solid rgba(74,68,85,0.15)' }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="text-xs text-[rgba(204,195,216,0.45)]"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {post.date}
                        </span>
                        <span
                          className="text-xs text-[rgba(204,195,216,0.35)]"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-xs font-semibold transition-colors duration-150 hover:opacity-80"
                        style={{ color: '#7c3aed', fontFamily: 'var(--font-display)' }}
                      >
                        Read More <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* ——— EMPTY STATE ——— */}
          <div className="mt-14 text-center flex flex-col gap-2">
            <p
              className="text-sm text-[#ccc3d8]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              More articles coming soon. Follow us to stay updated.
            </p>
            <p
              className="text-xs text-[rgba(204,195,216,0.45)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              We publish practical, no-BS content for Indian founders every week.
            </p>
          </div>
        </div>
      </section>

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
