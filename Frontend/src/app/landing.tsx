"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-16 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-900"></div>
          <h1 className="text-lg font-serif italic font-semibold text-gray-900">Distiller</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-xs uppercase tracking-wide text-gray-500 hover:text-gray-900 transition">How it works</a>
          <a href="#" className="text-xs uppercase tracking-wide text-gray-500 hover:text-gray-900 transition">Docs</a>
          <a href="#" className="text-xs uppercase tracking-wide text-gray-500 hover:text-gray-900 transition">Changelog</a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-xs uppercase tracking-wide text-gray-600 border border-gray-200 rounded-full px-4 py-2 hover:border-gray-400 transition">
            Sign in
          </Link>
          <Link href="/register" className="text-xs uppercase tracking-wide font-semibold text-white bg-amber-900 rounded-full px-4 py-2 hover:bg-amber-800 transition">
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-amber-900/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-6">
            <span className="w-7 h-px bg-gray-400"></span>
            AI Content Pipeline
            <span className="w-7 h-px bg-gray-400"></span>
          </p>

          <div className="mb-6 flex justify-center">
            <svg width="88" height="124" viewBox="0 0 56 80" fill="none" className="text-amber-900">
              <path d="M9.33325 9.33333L23.3333 28L9.33325 46.6667" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M46.6667 9.33333L32.6667 28L46.6667 46.6667" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif italic font-light text-gray-900 mb-6 leading-tight">
            The AI Content<br />Pipeline for<br />Community.
          </h1>

          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Transform raw community signals into polished newsletters in minutes. No more manual curation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="px-8 py-3 bg-amber-900 text-white rounded-full font-semibold uppercase text-sm tracking-wider hover:bg-amber-800 transition">
              Get started
            </Link>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold uppercase text-sm tracking-wider hover:border-gray-500 transition">
              Watch demo
            </button>
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-lg">
            <div className="bg-white px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <div className="flex-1 ml-3 bg-gray-100 rounded px-2 py-1.5 text-xs text-gray-400">distiller.app</div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Dashboard preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-serif italic font-light text-gray-900 mb-12">
            From raw signal to sent<br className="hidden md:block" />newsletter in three steps.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 bg-white rounded-3xl border border-gray-200 overflow-hidden">
            {[
              {
                number: "01",
                title: "Connect your channels",
                description: "Link your Discord server, Slack workspace, or internal feed. Distiller starts indexing posts, questions, and shared resources immediately.",
                badge: "Discord · Slack · Internal"
              },
              {
                number: "02",
                title: "Generate a draft",
                description: "Hit \"Generate AI Drafts.\" The model reads the week's activity, selects the highest-signal moments, and writes a newsletter in your community's voice.",
                badge: "LLM · Weekly cadence"
              },
              {
                number: "03",
                title: "Approve & publish",
                description: "Read, edit, and approve in the Content Drafts panel. One click sends it to your subscriber list and records metrics.",
                badge: "Review · Send · Measure"
              }
            ].map((step, i) => (
              <div key={i} className={`p-8 ${i < 2 ? 'border-r border-gray-200 md:border-b-0' : ''} ${i === 2 ? '' : 'md:border-r'}`}>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Step {step.number}</p>
                <h3 className="text-2xl font-serif italic font-light text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <span className="inline-flex items-center gap-2 text-xs text-amber-900 bg-amber-50 px-3 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-900"></span>
                  {step.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">Why teams use it</p>

              <div className="space-y-8 mb-12">
                <div className="pb-8 border-b border-gray-700">
                  <div className="text-5xl font-serif italic font-light text-white mb-2">3×</div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">faster to publish than manual curation</p>
                </div>
                <div className="pb-8 border-b border-gray-700">
                  <div className="text-5xl font-serif italic font-light text-white mb-2">50+</div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">community signals captured per week</p>
                </div>
                <div>
                  <div className="text-5xl font-serif italic font-light text-white mb-2">1-click</div>
                  <p className="text-sm uppercase tracking-widest text-gray-400">from community feed to approved draft</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-2xl font-serif italic text-white mb-6 leading-relaxed">
                "We were spending two hours every Monday stitching together Discord highlights. Distiller turns that into a ten-minute approval flow — and the drafts are actually good."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center text-white font-semibold text-sm">
                  CA
                </div>
                <div>
                  <p className="font-semibold text-sm">Carlos A.</p>
                  <p className="text-xs text-gray-400">Community Lead, TalentCircle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <svg width="44" height="62" viewBox="0 0 56 80" fill="none" className="text-amber-900">
              <path d="M9.33325 9.33333L23.3333 28L9.33325 46.6667" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M46.6667 9.33333L32.6667 28L46.6667 46.6667" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif italic font-light text-gray-900 mb-4">
            Start distilling<br />your community.
          </h2>

          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Join community leads who use Distiller to ship better newsletters in a fraction of the time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="px-8 py-3 bg-amber-900 text-white rounded-full font-semibold uppercase text-sm tracking-wider hover:bg-amber-800 transition">
              Get started free
            </Link>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold uppercase text-sm tracking-wider hover:border-gray-500 transition">
              Schedule demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-900"></div>
            <span className="font-serif italic text-sm text-gray-400">Distiller</span>
          </div>

          <p className="text-xs text-gray-500">Built for community leaders by TalentCircle</p>

          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
