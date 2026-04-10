import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  MapPin,
} from "lucide-react";
import data from "@/data.json";

/* ── Animated counter ─────────────────────────────────────────── */

function Counter({
  target,
  prefix = "",
}: {
  target: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
    </span>
  );
}

/* ── FAQ accordion item ───────────────────────────────────────── */

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-lg font-medium text-[#171717] group-hover:text-[#1D4ED8] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#8B8B85] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-[#52524E] leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ── Landing page ─────────────────────────────────────────────── */

export default function Dashboard() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D4ED8]/[0.08] text-[#1D4ED8] text-sm font-medium mb-8">
              <MapPin className="w-3.5 h-3.5" />
              Virginia Beach Web Development
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your business deserves a website that{" "}
            <span className="font-serif italic text-[#1D4ED8]">
              actually works
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-[#52524E] max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I build lightning-fast websites that help Virginia Beach specialty
            businesses get found on Google and get booked by customers.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/offerings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white rounded-full font-medium text-sm hover:bg-[#171717]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              See What I Offer
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#52524E] rounded-full font-medium text-sm hover:bg-black/5 transition-colors"
            >
              Read My Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Tech Marquee ───────────────────────────────────── */}
      <section className="py-8 border-y border-black/5 overflow-hidden bg-white/40">
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            ...data.homepage.tech_marquee,
            ...data.homepage.tech_marquee,
          ].map((tech, i) => (
            <span
              key={i}
              className="mx-6 text-sm font-medium text-[#8B8B85] uppercase tracking-widest flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4D0C8]" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── Proof Banner ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto bg-[#171717] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1D4ED8]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-4 font-medium">
              Proof of Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {data.homepage.proof_banner.headline}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
              {data.homepage.proof_banner.description}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {data.homepage.proof_banner.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold">
                    {stat.value.startsWith("$") ? (
                      <Counter
                        target={parseInt(stat.value.replace(/\D/g, ""))}
                        prefix="$"
                      />
                    ) : (
                      <Counter target={parseInt(stat.value)} />
                    )}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href={data.homepage.proof_banner.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#171717] rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
            >
              View the Project
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Process Steps ──────────────────────────────────── */}
      <section className="py-20 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Simple process,{" "}
              <span className="font-serif italic text-[#1D4ED8]">
                real results
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.homepage.process_steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="text-5xl font-bold text-[#1D4ED8]/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-[#52524E] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Card ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white border border-black/5 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
                  Featured Service
                </p>
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  {data.business_context.offerings[0].name}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D4ED8]/[0.08] text-[#1D4ED8] text-sm font-semibold mb-6">
                  {data.business_context.offerings[0].price_usd}
                </div>
                <ul className="space-y-3">
                  {data.business_context.offerings[0].features.map(
                    (feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[#52524E]"
                      >
                        <Check className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="md:text-right shrink-0">
                <Link
                  to="/offerings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-white rounded-full font-medium text-sm hover:bg-[#171717]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Blog Preview ───────────────────────────────────── */}
      <section className="py-20 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
                From the Blog
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Latest stories
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm font-medium text-[#1D4ED8] hover:underline hidden sm:block"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.blog_stories.posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="block bg-white border border-black/5 rounded-2xl p-6 hover:shadow-lg hover:shadow-black/[0.04] transition-all group h-full"
                >
                  <time className="text-xs font-medium text-[#8B8B85] uppercase tracking-wide">
                    {post.date}
                  </time>
                  <h3 className="text-lg font-semibold mt-2 mb-3 group-hover:text-[#1D4ED8] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#52524E] leading-relaxed line-clamp-3">
                    {post.content_summary}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/blog"
              className="text-sm font-medium text-[#1D4ED8] hover:underline"
            >
              View all stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
              Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Frequently asked
            </h2>
          </div>

          <div>
            {data.homepage.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#171717] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to get your business{" "}
            <span className="font-serif italic text-[#60A5FA]">online</span>?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Let&rsquo;s build something that works as hard as you do. Fast
            websites, local SEO, and booking &mdash; starting at $499.
          </p>
          <Link
            to="/offerings"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#171717] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
