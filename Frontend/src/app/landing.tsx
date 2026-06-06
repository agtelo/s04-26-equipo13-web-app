"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import LandingHeader from "@/components/shared/LandingHeader";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <span className="w-7 h-px bg-border"></span>
            AI Content Pipeline
            <span className="w-7 h-px bg-border"></span>
          </p>

          <div className="mb-6 flex justify-center">
            <Logo className="w-32 h-32 text-primary" />
          </div>

          <h1 className="text-5xl md:text-7xl [font-family:var(--font-serif)] italic font-light mb-6 leading-tight">
            The AI Content<br />Pipeline for<br />Community.
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Transform raw community signals into polished newsletters in minutes. No more manual curation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/register">Get started</Link>
            </Button>
            <Button variant="outline" size="lg">
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl [font-family:var(--font-serif)] italic font-light mb-12">
            From raw signal to sent<br className="hidden md:block" />newsletter in three steps.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Connect your channels",
                description: "Link your Discord server, Slack workspace, or internal feed. Distiller starts indexing posts, questions, and shared resources immediately — no manual tagging required.",
                badge: "Discord · Slack · Internal"
              },
              {
                number: "02",
                title: "Generate a draft",
                description: "Hit \"Generate AI Drafts.\" The model reads the week's activity, selects the highest-signal moments, and writes a newsletter in your community's voice — summaries, highlights, and discussion threads, all attributed.",
                badge: "LLM · Weekly cadence"
              },
              {
                number: "03",
                title: "Approve & publish",
                description: "Read, edit, and approve in the Content Drafts panel. One click sends it to your subscriber list and records open rates and delivery metrics back into your feed.",
                badge: "Review · Send · Measure"
              }
            ].map((step, i) => (
              <Card key={i}>
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Step {step.number}</p>
                  <h3 className="text-2xl [font-family:var(--font-serif)] italic font-light mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs text-primary bg-primary/10 px-3 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {step.badge}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 px-6 bg-primary/5 dark:bg-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Why teams use it</p>

              <div className="space-y-8 mb-12">
                <div className="pb-8 border-b border-border">
                  <div className="text-5xl [font-family:var(--font-serif)] italic font-light text-primary mb-2">3×</div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">faster to publish than manual curation</p>
                </div>
                <div className="pb-8 border-b border-border">
                  <div className="text-5xl [font-family:var(--font-serif)] italic font-light text-primary mb-2">50+</div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">community signals captured per week</p>
                </div>
                <div>
                  <div className="text-5xl [font-family:var(--font-serif)] italic font-light text-primary mb-2">1-click</div>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">from community feed to approved draft</p>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <p className="text-2xl [font-family:var(--font-serif)] italic mb-6 leading-relaxed">
                  "We were spending two hours every Monday stitching together Discord highlights. Distiller turns that into a ten-minute approval flow — and the drafts are actually good."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    CA
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Carlos A.</p>
                    <p className="text-xs text-muted-foreground">Community Lead, TalentCircle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Logo className="w-16 h-16 text-primary" />
          </div>

          <h2 className="text-4xl md:text-5xl [font-family:var(--font-serif)] italic font-light mb-4">
            Start distilling<br />your community.
          </h2>

          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Join community leads who use Distiller to ship better newsletters in a fraction of the time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/register">Get started free</Link>
            </Button>
            <Button variant="outline" size="lg">
              Schedule demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <span className="[font-family:var(--font-serif)] italic text-sm text-muted-foreground">Distiller</span>
          </div>

          <p className="text-xs text-muted-foreground">Built for community leaders by TalentCircle</p>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="#" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
