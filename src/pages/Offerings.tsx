import data from "@/data.json";
import { Briefcase, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Offerings() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="border-b border-[#262626] pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] mb-6">
          <Briefcase className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Commercial Offerings
        </h1>
        <p className="text-lg text-[#a3a3a3]">
          {data.business_context.description}
        </p>
      </header>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {data.business_context.offerings.map(offering => (
          <div key={offering.id} className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#262626] rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ffcc]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="p-8 md:p-10 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{offering.name}</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262626] text-sm text-[#e5e5e5] font-mono">
                    {offering.price_usd}
                  </div>
                </div>
                <button className="bg-[#00ffcc] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#00ccaa] transition-colors flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4">Features</h3>
                  <ul className="space-y-3">
                    {offering.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#e5e5e5]">
                        <CheckCircle2 className="w-5 h-5 text-[#00ffcc] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4">Powered By</h3>
                  <div className="space-y-3">
                    {offering.related_wiki_nodes.map(nodeId => {
                      const node = data.wiki_nodes.entities.find(n => n.id === nodeId);
                      if (!node) return null;
                      return (
                        <Link key={nodeId} to={`/wiki/${nodeId}`} className="block bg-[#1a1a1a] border border-[#262626] p-3 rounded hover:border-[#00ffcc]/50 transition-colors">
                          <div className="text-white text-sm font-medium flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#00ffcc]" /> {node.title}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="max-w-4xl mx-auto pt-8 border-t border-[#262626]">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Case Studies</h2>
        <div className="grid gap-4">
          {data.business_context.case_studies.map((study, i) => {
            const post = data.blog_stories.posts.find(p => p.id === study.related_post_id);
            return (
              <div key={i} className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="text-sm font-mono text-[#00ffcc] mb-1">Client</div>
                  <h3 className="text-xl font-semibold text-white">{study.client}</h3>
                </div>
                {post && (
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors bg-[#141414] px-4 py-2 rounded-lg border border-[#262626]">
                    Read Story <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
