import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function WikiList() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="editorial-kicker mb-3 text-[#6b7280]">Knowledge Base</p>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-3 text-4xl font-bold tracking-tight text-[#111111]"
          >
            Wiki Nodes
          </TextAnimate>
          <p className="max-w-2xl text-lg text-[#4b5563]">
            <Highlighter color="rgba(66,133,244,0.25)">{data.wiki_nodes.description}</Highlighter>
          </p>
        </header>

        <BlurFade inView className="mb-8">
          <MagicCard className="p-6">
            <h2 className="text-uplift mb-2 text-2xl font-bold text-[#111111]">
              Turn Knowledge Into <span className="marker-yellow">Booked Work</span>
            </h2>
            <p className="text-[#4b5563]">
              Each node is written to expose a practical pain point, explain the fix clearly, and help you decide if
              you should implement it yourself or bring me in.
            </p>
          </MagicCard>
        </BlurFade>

        <div className="space-y-4">
          {data.wiki_nodes.entities.map((node, i) => {
            const topic = data.taxonomy.topics.find((t) => t.id === node.topic_id);

            return (
              <div key={node.id}>
                <BlurFade inView delay={i * 0.04}>
                  <Link to={`/wiki/${node.id}`} className="group block">
                    <MagicCard className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-[#111111] transition-colors group-hover:text-[#4285f4]">
                              {node.title}
                            </h2>
                            <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-xs font-medium text-[#4b5563]">
                              {node.type}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-sm text-[#4b5563]">{node.content}</p>
                          <div className="flex items-center gap-4 pt-1">
                            <span className="text-xs text-[#6b7280]">Updated {node.last_updated}</span>
                            {topic && (
                              <span className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#34a853]" />
                                {topic.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="ml-4 h-5 w-5 shrink-0 text-[#9ca3af] transition-colors group-hover:text-[#EA4335]" />
                      </div>
                    </MagicCard>
                  </Link>
                </BlurFade>
              </div>
            );
          })}
        </div>

        <BlurFade inView className="mt-10">
          <MagicCard className="p-6 md:p-8">
            <h2 className="text-uplift mb-3 text-2xl font-bold text-[#111111]">Need help applying this to your site?</h2>
            <p className="mb-5 text-[#4b5563]">
              Send me your current site and biggest blocker. I will map the exact pain points and give you a focused
              solution plan.
            </p>
            <Link
              to="/contact?context=Apply%20Bliki%20knowledge%20to%20my%20site"
              className="inline-flex items-center rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-[#111111] hover:bg-black/5"
            >
              Contact Neal
            </Link>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
