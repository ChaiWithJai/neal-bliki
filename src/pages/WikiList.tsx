import data from "@/data.json";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function WikiList() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
            Knowledge Base
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Wiki Nodes
          </h1>
          <p className="text-[#52524E] text-lg max-w-2xl">
            {data.wiki_nodes.description}
          </p>
        </header>

        <div className="space-y-4">
          {data.wiki_nodes.entities.map((node, i) => {
            const topic = data.taxonomy.topics.find(
              (t) => t.id === node.topic_id
            );
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/wiki/${node.id}`}
                  className="block bg-white border border-black/5 rounded-2xl p-6 hover:shadow-lg hover:shadow-black/[0.04] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold group-hover:text-[#1D4ED8] transition-colors">
                          {node.title}
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F0EDE8] text-[#8B8B85] font-medium">
                          {node.type}
                        </span>
                      </div>
                      <p className="text-[#52524E] text-sm line-clamp-2">
                        {node.content}
                      </p>
                      <div className="flex items-center gap-4 pt-1">
                        <span className="text-xs text-[#8B8B85]">
                          Updated {node.last_updated}
                        </span>
                        {topic && (
                          <span className="text-xs text-[#8B8B85] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                            {topic.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#D4D0C8] group-hover:text-[#1D4ED8] transition-colors shrink-0 ml-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
