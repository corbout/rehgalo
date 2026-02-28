import Link from "next/link";
import {
  Gift,
  Sparkles,
  Users,
  Bell,
  ArrowRight,
  Heart,
  Star,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
              Rehgalo
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Gift Recommendations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Never give a{" "}
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              bad gift
            </span>{" "}
            again
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            Rehgalo remembers what everyone likes, tracks when occasions are
            coming up, and uses AI to find the perfect gift every time.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30"
            >
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50/50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything you need for thoughtful gifting
            </h2>
            <p className="text-gray-500">
              From remembering hints to finding deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                AI Recommendations
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get personalized gift ideas based on interests, past gifts, and
                real-time hints.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                Giftee Profiles
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Keep track of preferences, sizes, styles, and dislikes for
                everyone.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                Smart Reminders
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Never miss a birthday or anniversary with customizable
                reminders.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                &ldquo;They Mentioned&rdquo; Notes
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Capture hints in seconds when someone mentions wanting
                something.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                Gift History
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Track what you gave and how it landed. Never repeat a bad gift.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-100/50 transition-all">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                Price Tracking
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Save products and get alerts when prices drop. Shop at the right
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-rose-500 to-amber-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-3">
              Ready to become the best gift giver?
            </h2>
            <p className="text-white/80 mb-8">
              Join Rehgalo for free and start making every gift count.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-lg"
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-rose-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Gift className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-600">
              Rehgalo
            </span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Rehgalo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
