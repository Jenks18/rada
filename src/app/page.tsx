import Link from 'next/link'
import { Music, Users, TrendingUp, Smartphone } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-20">
          <div className="text-2xl font-bold">RADA</div>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-gray-300">Login</Link>
            <Link href="/signup" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Operating System<br />for Kenyan Artists
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Own your audience. Sell out shows via M-Pesa. Look world-class while doing it.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup?type=artist" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200">
              I'm an Artist
            </Link>
            <Link href="/discover" className="border border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black">
              Discover Events
            </Link>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
            <Music className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Your Digital Storefront</h3>
            <p className="text-gray-400">
              Beautiful landing pages that load instantly on 3G. Aggregate music, merch, and bookings in one place.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
            <Users className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Sell Tickets via M-Pesa</h3>
            <p className="text-gray-400">
              No credit cards needed. Fans buy tickets in seconds. QR codes delivered via SMS and WhatsApp.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
            <TrendingUp className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Own Your Data</h3>
            <p className="text-gray-400">
              Track who's spending. Send SMS blasts to superfans. Turn listeners into customers.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Trusted by Kenya's Rising Stars
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          From Nairobi to Mombasa, artists are taking control of their careers
        </p>
        <div className="flex justify-center gap-8 flex-wrap opacity-60">
          <div className="text-4xl font-bold">100+</div>
          <div className="text-gray-600">|</div>
          <div className="text-4xl font-bold">50K+</div>
          <div className="text-gray-600">|</div>
          <div className="text-4xl font-bold">KES 10M+</div>
        </div>
        <div className="flex justify-center gap-8 flex-wrap text-sm text-gray-500 mt-2">
          <div>Artists</div>
          <div></div>
          <div>Fans</div>
          <div></div>
          <div>Revenue Generated</div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white text-black rounded-3xl p-12 text-center">
          <Smartphone className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Set up your Rada page in minutes. No credit card required.
          </p>
          <Link href="/signup" className="inline-block bg-black text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-gray-800">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl mb-4">RADA</div>
            <p className="text-gray-500 text-sm">
              The operating system for Kenyan artists
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/pro">Rada Pro</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/api">API Docs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2025 Rada. Made with ❤️ in Nairobi.
        </div>
      </footer>
    </div>
  )
}
