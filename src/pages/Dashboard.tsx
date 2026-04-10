import data from "@/data.json";
import { ArrowRight, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/20 text-[#00ffcc] text-xs font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse"></span>
          SYSTEM_ONLINE
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          {data.bliki_metadata.title}
        </h1>
        <p className="text-lg text-[#a3a3a3] max-w-2xl leading-relaxed">
          {data.bliki_metadata.description}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <section className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-6">
            <h2 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> Business Context
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">Target Market</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#141414] p-4 rounded-lg border border-[#262626]">
                    <div className="text-xs text-[#a3a3a3] mb-1">Region</div>
                    <div className="font-mono text-sm text-[#00ffcc]">{data.business_context.target_market.region}</div>
                  </div>
                  <div className="bg-[#141414] p-4 rounded-lg border border-[#262626]">
                    <div className="text-xs text-[#a3a3a3] mb-1">Channel</div>
                    <div className="font-mono text-sm text-[#00ffcc]">{data.business_context.target_market.acquisition_channel}</div>
                  </div>
                </div>
                <div className="mt-4 bg-[#141414] p-4 rounded-lg border border-[#262626]">
                  <div className="text-xs text-[#a3a3a3] mb-1">Primary Persona</div>
                  <div className="text-sm text-white">{data.business_context.target_market.primary_persona}</div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-3">Core Pain Points</h3>
                <div className="flex flex-wrap gap-3">
                  {data.business_context.target_market.core_pain_points.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-md text-sm">
                      <Zap className="w-3 h-3" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-6">
            <h2 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {data.blog_stories.posts.slice(0, 2).map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                  <div className="flex items-baseline gap-4">
                    <div className="text-xs font-mono text-[#525252] w-24 shrink-0">{post.date}</div>
                    <div>
                      <h3 className="text-white font-medium group-hover:text-[#00ffcc] transition-colors">{post.title}</h3>
                      <p className="text-sm text-[#a3a3a3] mt-1 line-clamp-1">{post.content_summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-6">
            <h2 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Topics
            </h2>
            <ul className="space-y-3">
              {data.taxonomy.topics.map(topic => (
                <li key={topic.id} className="border-b border-[#262626] last:border-0 pb-3 last:pb-0">
                  <div className="text-white text-sm font-medium">{topic.name}</div>
                  <div className="text-xs text-[#a3a3a3] mt-1">{topic.description}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gradient-to-br from-[#00ffcc]/10 to-transparent border border-[#00ffcc]/20 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00ffcc]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <h2 className="text-sm font-mono text-[#00ffcc] uppercase tracking-widest mb-2 relative z-10">Featured Offering</h2>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{data.business_context.offerings[0].name}</h3>
            <p className="text-sm text-[#a3a3a3] mb-4 relative z-10">Solving the "Get Booked" problem for VB Specialty Shops.</p>
            <Link to="/offerings" className="inline-flex items-center gap-2 text-sm text-[#00ffcc] font-medium hover:underline relative z-10">
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
