import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper font-body">
      {/* ── Top Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/92 backdrop-blur-md border-b border-rule">
        <div className="max-w-[1320px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink flex items-center justify-center">
              <span className="font-serif text-paper text-sm font-bold leading-none">
                R
              </span>
            </div>
            <span className="font-serif text-lg tracking-wide text-ink">
              Rehgalo
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-light hover:text-ink transition-colors"
            >
              Sign In
            </Link>
            <Link href="/signup" className="btn-accent">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero / Masthead ── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-[860px] mx-auto text-center anim-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-light mb-8">
            AI-Powered Gift Curation
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-bold text-ink leading-[1.05] mb-8">
            Never give a{" "}
            <em className="italic">bad gift</em>{" "}
            again
          </h1>
          <p className="font-editorial text-xl md:text-2xl italic text-ink-light leading-relaxed max-w-[600px] mx-auto mb-10">
            Rehgalo remembers what everyone loves, anticipates every occasion,
            and finds the perfect gift&mdash;so you never have to guess.
          </p>
          <div className="w-16 h-px bg-accent mx-auto mb-10" />
          <div className="flex items-center gap-5 justify-center">
            <Link href="/signup" className="btn-accent">
              Start Free &rarr;
            </Link>
            <Link href="#features" className="btn-editorial">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="section-header">
            <h2>What Rehgalo Does</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-rule anim-fade-up" style={{ animationDelay: "0.1s" }}>
            {/* Feature 1 */}
            <div className="border-b border-rule lg:border-r px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                01 &mdash; Intelligence
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                AI Recommendations
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Personalized gift ideas drawn from interests, past gifts, and
                real-time hints. The algorithm learns what lands and what
                doesn&rsquo;t.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-b border-rule lg:border-r px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                02 &mdash; People
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                Giftee Profiles
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Keep detailed records of preferences, sizes, styles, and
                dislikes for every person in your life. Everything in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-b border-rule px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                03 &mdash; Timing
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                Smart Reminders
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Never miss a birthday or anniversary. Customizable alerts give
                you time to find something thoughtful&mdash;not last-minute.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border-b border-rule lg:border-r px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                04 &mdash; Capture
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                &ldquo;They Mentioned&rdquo; Notes
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Capture hints in seconds when someone mentions wanting
                something. One tap, and the idea is saved for later.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border-b border-rule lg:border-r px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                05 &mdash; Memory
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                Gift History
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Track what you gave, when you gave it, and how it was received.
                Build on what works and never repeat a miss.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border-b border-rule px-6 py-8 md:px-8 md:py-10 transition-colors hover:bg-paper-warm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
                06 &mdash; Value
              </p>
              <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                Price Tracking
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                Save products you&rsquo;re considering and get notified when
                prices drop. Buy at exactly the right moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-accent py-24 px-6 anim-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Ready to become the best gift giver?
          </h2>
          <p className="font-editorial text-lg md:text-xl italic text-white/80 mb-10">
            Join Rehgalo for free and start making every gift count.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white px-6 py-3 border border-white bg-transparent hover:bg-white hover:text-accent transition-all"
          >
            Create Free Account &rarr;
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-rule py-12 px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-6 bg-ink flex items-center justify-center">
              <span className="font-serif text-paper text-xs font-bold leading-none">
                R
              </span>
            </div>
            <span className="font-serif text-sm tracking-wide text-ink">
              Rehgalo
            </span>
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            &copy; {new Date().getFullYear()} Rehgalo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
