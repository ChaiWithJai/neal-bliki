import data from "@/data.json";
import { Book, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WikiList() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-[#262626] pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Book className="w-8 h-8 text-[#00ffcc]" />
          Wiki Nodes
        </h1>
        <p className="text-[#a3a3a3] mt-2 max-w-2xl">
          {data.wiki_nodes.description}
        </p>
      </header>

      <div className="grid gap-4">
        {data.wiki_nodes.entities.map(node => {
          const topic = data.taxonomy.topics.find(t => t.id === node.topic_id);
          return (
            <Link 
              key={node.id} 
              to={`/wiki/${node.id}`}
              className="bg-[#0f0f0f] border border-[#262626] rounded-xl p-6 hover:border-[#00ffcc]/50 transition-colors group flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-white group-hover:text-[#00ffcc] transition-colors">
                    {node.title}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1a1a] text-[#a3a3a3] border border-[#262626]">
                    {node.type}
                  </span>
                </div>
                <p className="text-[#a3a3a3] text-sm max-w-3xl line-clamp-2">
                  {node.content}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-[#525252] font-mono">
                    Updated: {node.last_updated}
                  </span>
                  {topic && (
                    <span className="text-xs text-[#525252] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]"></span>
                      {topic.name}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#525252] group-hover:text-[#00ffcc] transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
