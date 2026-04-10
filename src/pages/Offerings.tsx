import data from "@/data.json";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Offerings() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Work with me
          </h1>
          <p className="text-lg text-[#52524E] leading-relaxed">
            {data.business_context.description}
          </p>
        </header>

        {/* Offering Card */}
        {data.business_context.offerings.map((offering) => (
          <motion.div
            key={offering.id}
            className="bg-white border border-black/5 rounded-3xl overflow-hidden relative mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-3">
                    {offering.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D4ED8]/[0.08] text-[#1D4ED8] text-sm font-semibold">
                    {offering.price_usd}
                  </div>
                </div>
                <a
                  href={`mailto:neal@nealfrazier.tech?subject=Interested in ${offering.name}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#171717] text-white rounded-full font-medium text-sm hover:bg-[#171717]/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-5 font-medium">
                    What&rsquo;s Included
                  </h3>
                  <ul className="space-y-4">
                    {offering.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[#171717]"
                      >
                        <Check className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-5 font-medium">
                    Powered By
                  </h3>
                  <div className="space-y-3">
                    {offering.related_wiki_nodes.map((nodeId) => {
                      const node = data.wiki_nodes.entities.find(
                        (n) => n.id === nodeId
                      );
                      if (!node) return null;
                      return (
                        <Link
                          key={nodeId}
                          to={`/wiki/${nodeId}`}
                          className="block bg-[#F8F6F1] border border-black/5 p-4 rounded-xl hover:shadow-md hover:shadow-black/[0.04] transition-all group"
                        >
                          <div className="text-sm font-medium flex items-center gap-2 group-hover:text-[#1D4ED8] transition-colors">
                            <Zap className="w-3.5 h-3.5 text-[#1D4ED8]" />{" "}
                            {node.title}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Case Studies */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">
            Case Studies
          </h2>
          <div className="grid gap-4">
            {data.business_context.case_studies.map((study, i) => {
              const post = data.blog_stories.posts.find(
                (p) => p.id === study.related_post_id
              );
              return (
                <motion.div
                  key={i}
                  className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div>
                    <div className="text-sm font-medium text-[#1D4ED8] mb-1">
                      Client
                    </div>
                    <h3 className="text-xl font-semibold">{study.client}</h3>
                  </div>
                  {post && (
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm text-[#52524E] hover:text-[#171717] transition-colors bg-[#F8F6F1] px-4 py-2.5 rounded-full border border-black/5 font-medium"
                    >
                      Read Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 bg-[#171717] text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Let&rsquo;s talk about your business and how I can help you get
            found and get booked.
          </p>
          <a
            href="mailto:neal@nealfrazier.tech?subject=Let's work together"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#171717] rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </div>
  );
}
