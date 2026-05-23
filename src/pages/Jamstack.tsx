import { ArrowRight, Check, X, AlertTriangle, Shield, Rocket, Code, Briefcase, Users, Zap, Globe, Database, RefreshCw, Lock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

const PROS = [
  {
    icon: Zap,
    title: "Blazing Fast Performance",
    desc: "Pre-built static pages served from a global CDN mean sub-second load times. No database queries at request time. No server rendering delays.",
  },
  {
    icon: Shield,
    title: "Fortress-Level Security",
    desc: "With no live server or database exposed to the public internet, the attack surface shrinks dramatically. No SQL injection. No server exploits.",
  },
  {
    icon: Globe,
    title: "Infinite Scale",
    desc: "CDN-backed sites handle traffic spikes without breaking a sweat. Go from ten visitors to ten thousand without changing a single config line.",
  },
  {
    icon: Code,
    title: "Developer Experience",
    desc: "Git-based workflows, preview deploys for every branch, and modern tooling (Vite, Astro, React) make shipping feel effortless.",
  },
  {
    icon: Lock,
    title: "Reliability You Can Sleep On",
    desc: "Static files do not crash. There is no runtime to fail, no memory leak to debug at 2 AM, and no plugin update that breaks the whole site.",
  },
  {
    icon: TrendingUp,
    title: "SEO That Actually Works",
    desc: "Fast load times, clean HTML, and proper semantic structure give search engines exactly what they want. Core Web Vitals love Jamstack.",
  },
];

const CONS = [
  {
    icon: Database,
    title: "Dynamic Data Is Harder",
    desc: "Real-time dashboards, live chat, and heavy user-generated content need extra architecture. You will need APIs, serverless functions, or a headless CMS.",
    fix: "Use Netlify Functions, Edge handlers, or a headless CMS like Sanity or Contentful. For most sites, 90% static + 10% dynamic is the sweet spot.",
  },
  {
    icon: RefreshCw,
    title: "Build Times Can Stack Up",
    desc: "Large sites with thousands of pages can trigger long build times. Every content change triggers a full rebuild unless you use on-demand ISR or partial hydration.",
    fix: "Split into micro-sites, use incremental builds, or leverage Netlify's on-demand builders. Most business sites never hit this ceiling.",
  },
  {
    icon: AlertTriangle,
    title: "Not Every App Fits",
    desc: "A real-time multiplayer game, a stock trading terminal, or a complex admin panel with live collaboration is not a natural Jamstack fit.",
    fix: "Hybrid architecture. Keep the marketing site Jamstack, move the app surface to where it belongs. Do not force a square peg into a round hole.",
  },
  {
    icon: Users,
    title: "Client Education Required",
    desc: "Clients used to WordPress dashboards sometimes resist the idea of editing content in a headless CMS or via Git. The mental model is different.",
    fix: "Choose a visual headless CMS (Sanity, Decap CMS, Strapi) that feels like WordPress but delivers like Jamstack. Train once, win forever.",
  },
];

const PERSPECTIVES = [
  {
    role: "Business Owner",
    icon: Briefcase,
    color: "#4285f4",
    question: "Should my business use Jamstack?",
    whenYes: [
      "You need a marketing site, landing page, or content hub that loads fast and ranks well.",
      "You want lower hosting costs and near-zero maintenance overhead.",
      "You are tired of plugin updates breaking your site or security patches keeping you up at night.",
    ],
    whenNo: [
      "Your product IS a web application with real-time collaboration or heavy user accounts.",
      "You need complex server-side logic that runs continuously, not on-demand.",
      "Your team insists on a traditional monolithic CMS and refuses to learn new workflows.",
    ],
  },
  {
    role: "Client / Stakeholder",
    icon: Users,
    color: "#34a853",
    question: "Will Jamstack deliver what I need?",
    whenYes: [
      "You want a site that stays fast even as you add more pages and content over time.",
      "You care about SEO, accessibility, and converting visitors into leads or sales.",
      "You want clean handoffs where you own the code and can switch developers easily.",
    ],
    whenNo: [
      "You expect to log into a backend and drag-and-drop rebuild pages daily without developer help.",
      "You need deep user personalization that changes the page for every single visitor.",
      "Your budget assumes a $5/month shared host will handle enterprise traffic.",
    ],
  },
  {
    role: "Developer",
    icon: Code,
    color: "#ea4335",
    question: "Should I build with Jamstack?",
    whenYes: [
      "You value Git-based workflows, CI/CD, and preview URLs for every pull request.",
      "You want to stop managing servers, patching PHP, or debugging plugin conflicts.",
      "You ship marketing sites, blogs, portfolios, documentation, or e-commerce with a modern frontend.",
    ],
    whenNo: [
      "You are building a real-time system with WebSockets, live data streams, or complex stateful sessions.",
      "Your team is deeply invested in a legacy stack and migration would cost more than the gain.",
      "You need server-side rendering for every request because content changes by the second.",
    ],
  },
];

const PAIN_POINTS = [
  {
    title: "\"It is just a static site, right?\"",
    desc: "The biggest misconception. Modern Jamstack is not 'just HTML files.' It is a composable architecture of static generation, serverless functions, edge logic, and API integrations. Educate early.",
  },
  {
    title: "The CMS Handoff Gap",
    desc: "Developers build a beautiful headless site, then hand it to a client who cannot find the 'Edit Page' button. Choose the right CMS interface and document the workflow before launch.",
  },
  {
    title: "Build Anxiety",
    desc: "Watching a 15-minute build for a typo fix is painful. Set expectations, use staging environments, and adopt incremental builds or on-demand regeneration.",
  },
  {
    title: "Over-Engineering the Stack",
    desc: "Not every site needs Astro + React + Vue + Svelte + 47 microservices. Match the stack to the project. A simple Vite + vanilla JS site often outperforms a framework maze.",
  },
];

export default function Jamstack() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#111111]/5 px-4 py-1.5 text-sm font-bold text-[#111111]">
            <Globe className="h-4 w-4" /> Architecture Guide
          </div>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-4 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl"
          >
            Jamstack: The Honest Guide
          </TextAnimate>
          <p className="text-lg leading-relaxed text-[#4b5563]">
            What it is, why it wins, where it breaks, and how to decide if it fits your
            business, your client, or your workflow.
          </p>
        </header>

        {/* What is Jamstack */}
        <BlurFade inView>
          <MagicCard className="relative mb-16 overflow-hidden border-[#4285F4]/15 bg-gradient-to-br from-[#4285F4]/5 to-white p-8 md:p-10">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#4285F4]/10 blur-2xl" />
            <div className="relative">
              <h2 className="text-uplift mb-4 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                What Jamstack Actually Means Today
              </h2>
              <p className="mb-4 leading-relaxed text-[#4b5563]">
                Jamstack started as <strong>JavaScript, APIs, and Markup</strong> — a way to build sites
                that pre-render content at build time instead of generating it on a server for every visitor.
                Today, it is better described as a <em>composable web architecture</em>:
              </p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-start gap-3 text-[#374151]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                  <span>Static generation for speed, security, and scale</span>
                </li>
                <li className="flex items-start gap-3 text-[#374151]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                  <span>Serverless functions and edge logic for dynamic needs</span>
                </li>
                <li className="flex items-start gap-3 text-[#374151]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                  <span>Git-based workflows with atomic deploys and instant rollbacks</span>
                </li>
                <li className="flex items-start gap-3 text-[#374151]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                  <span>CDN delivery so your site is fast everywhere, not just near the server</span>
                </li>
              </ul>
              <p className="text-[#4b5563]">
                It is not a religion. It is a set of trade-offs that happen to favor most business websites,
                marketing sites, blogs, and e-commerce stores.
              </p>
            </div>
          </MagicCard>
        </BlurFade>

        {/* Pros */}
        <section className="mb-16">
          <BlurFade inView>
            <div className="mb-8 text-center">
              <p className="editorial-kicker mb-2 text-[#6b7280]">The Upside</p>
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Why Jamstack Wins
              </h2>
            </div>
          </BlurFade>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROS.map((pro, i) => (
              <BlurFade key={pro.title} inView delay={i * 0.05}>
                <MagicCard className="h-full p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#34a853]/8">
                    <pro.icon className="h-5 w-5 text-[#34a853]" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#111111]">{pro.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4b5563]">{pro.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Cons + Fixes */}
        <section className="mb-16">
          <BlurFade inView>
            <div className="mb-8 text-center">
              <p className="editorial-kicker mb-2 text-[#6b7280]">The Reality Check</p>
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Where Jamstack Breaks — And How to Fix It
              </h2>
            </div>
          </BlurFade>
          <div className="space-y-4">
            {CONS.map((con, i) => (
              <BlurFade key={con.title} inView delay={i * 0.05}>
                <MagicCard className="p-6 md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ea4335]/8">
                        <con.icon className="h-5 w-5 text-[#ea4335]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-[#111111]">{con.title}</h3>
                      <p className="mb-4 text-sm leading-relaxed text-[#4b5563]">{con.desc}</p>
                      <div className="rounded-xl border border-[#34a853]/15 bg-[#34a853]/[0.04] p-4">
                        <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#34a853]">
                          <Check className="h-3.5 w-3.5" /> How to deal with it
                        </div>
                        <p className="text-sm leading-relaxed text-[#374151]">{con.fix}</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Pain Points */}
        <section className="mb-16">
          <BlurFade inView>
            <div className="mb-8 text-center">
              <p className="editorial-kicker mb-2 text-[#6b7280]">Battle-Tested Warnings</p>
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Pain Points to Expect
              </h2>
            </div>
          </BlurFade>
          <div className="grid gap-4 md:grid-cols-2">
            {PAIN_POINTS.map((pp, i) => (
              <BlurFade key={pp.title} inView delay={i * 0.05}>
                <MagicCard className="h-full p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#fbbc05]" />
                    <h3 className="text-base font-bold text-[#111111]">{pp.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4b5563]">{pp.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Perspectives */}
        <section className="mb-16">
          <BlurFade inView>
            <div className="mb-8 text-center">
              <p className="editorial-kicker mb-2 text-[#6b7280]">Decision Framework</p>
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Should You Use Jamstack?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-[#4b5563]">
                Three lenses. Three honest answers. Pick the one that describes you.
              </p>
            </div>
          </BlurFade>
          <div className="space-y-6">
            {PERSPECTIVES.map((p, i) => (
              <BlurFade key={p.role} inView delay={i * 0.06}>
                <MagicCard className="overflow-hidden p-0">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="flex items-center gap-3 p-6 md:w-64 md:flex-col md:items-start md:justify-center md:py-8"
                      style={{ backgroundColor: p.color + "0D" }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: p.color + "14" }}
                      >
                        <p.icon className="h-5 w-5" style={{ color: p.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">Perspective</div>
                        <div className="text-lg font-bold text-[#111111]">{p.role}</div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="mb-4 text-base font-semibold text-[#111111]">{p.question}</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#34a853]">
                            <Check className="h-3.5 w-3.5" /> Yes, if...
                          </div>
                          <ul className="space-y-2">
                            {p.whenYes.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[#4b5563]">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#34a853]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea4335]">
                            <X className="h-3.5 w-3.5" /> No, if...
                          </div>
                          <ul className="space-y-2">
                            {p.whenNo.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-[#4b5563]">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ea4335]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Netlify Shoutout */}
        <BlurFade inView>
          <MagicCard className="relative mb-16 overflow-hidden border-[#4285F4]/20 bg-gradient-to-br from-[#4285F4]/5 to-white p-8 text-center md:p-12">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#4285F4]/10 blur-2xl" />
            <div className="relative mx-auto max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#4285F4]/10 px-4 py-1.5 text-sm font-bold text-[#4285F4]">
                <Shield className="h-4 w-4" /> Netlify Partner
              </div>
              <h2 className="text-uplift mb-4 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Netlify Is a Jamstack Developer’s Best Friend
              </h2>
              <p className="mb-6 leading-relaxed text-[#4b5563]">
                I have shipped over 100 sites on Netlify because it removes every friction point
                Jamstack used to have. Git-based deploys, serverless functions, form handling,
                edge redirects, identity, and instant rollbacks — all in one platform.
                You do not need to wire together five services. You push, it builds, it lives.
              </p>
              <p className="mb-6 text-sm font-medium text-[#111111]">
                If you are serious about Jamstack, Netlify is the platform that makes the promise real.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://join.netlify.com/d8a2zdtel9gy-w6zrwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <ShimmerButton className="font-medium" shimmerColor="#4285F4">
                    <Rocket className="h-4 w-4" /> Start Building Free on Netlify
                  </ShimmerButton>
                </a>
                <Link
                  to="/offerings"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-black/5"
                >
                  See My Services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MagicCard>
        </BlurFade>

        {/* Utilizing Pros */}
        <section className="mb-16">
          <BlurFade inView>
            <div className="mb-8 text-center">
              <p className="editorial-kicker mb-2 text-[#6b7280]">Execution Playbook</p>
              <h2 className="text-uplift text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                How to Actually Use the Pros
              </h2>
            </div>
          </BlurFade>
          <div className="space-y-4">
            {[
              {
                title: "Speed → Conversion",
                desc: "Do not just brag about Lighthouse scores. Use fast load times to reduce bounce rate and increase form completions. A/B test your CTAs once the baseline is sub-2-second loads.",
              },
              {
                title: "Security → Trust Signals",
                desc: "Display security badges, privacy policy links, and SSL info. The lack of breaches is invisible — turn it into visible trust with clear copy and professional design.",
              },
              {
                title: "Scale → Marketing Confidence",
                desc: "Run campaigns without fear. Know that a viral post or PR hit will not crash the site. Use that confidence to spend more on ads and content.",
              },
              {
                title: "DX → Faster Iteration",
                desc: "Use preview deploys to share work-in-progress with clients. Reduce feedback loops from days to hours. Ship more, bill more, sleep better.",
              },
            ].map((item, i) => (
              <BlurFade key={item.title} inView delay={i * 0.05}>
                <MagicCard className="p-6">
                  <h3 className="mb-2 text-base font-bold text-[#111111]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4b5563]">{item.desc}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <BlurFade inView>
          <MagicCard className="p-8 text-center md:p-12">
            <h2 className="text-uplift mb-3 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
              Still unsure if Jamstack fits your project?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-[#4b5563]">
              I have built with it, broken with it, and fixed it. Let me help you decide the right
              architecture for your actual goals.
            </p>
            <div className="flex justify-center">
              <Link to="/contact?context=Jamstack%20architecture%20consultation" className="inline-flex">
                <ShimmerButton className="font-medium" shimmerColor="#ea4335">
                  Ask Me Directly <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
              </Link>
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
