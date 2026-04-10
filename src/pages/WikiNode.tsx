import data from "@/data.json";
import { ArrowLeft, BookOpen, Calendar, Hash, Link as LinkIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function WikiNode() {
  const { id } = useParams();
  const node = data.wiki_nodes.entities.find(n => n.id === id);

  if (!node) {
    return <div className="text-white">Node not found.</div>;
  }

  const topic = data.taxonomy.topics.find(t => t.id === node.topic_id);
  const relatedPosts = data.blog_stories.posts.filter(p => p.related_wiki_nodes.includes(node.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link to="/wiki" className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Wiki
      </Link>

      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-2 py-1 rounded bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20">
            {node.type}
          </span>
          {topic && (
            <span className="text-xs text-[#a3a3a3] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#525252]"></span>
              {topic.name}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold text-white">{node.title}</h1>
        <div className="flex items-center gap-4 text-sm text-[#525252] font-mono">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {node.last_updated}</span>
          <span className="flex items-center gap-1"><Hash className="w-4 h-4" /> {node.id}</span>
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <div className="text-lg text-[#e5e5e5] leading-relaxed bg-[#0f0f0f] border border-[#262626] p-6 rounded-xl">
          {node.content}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#262626]">
        <div>
          <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4 flex items-center gap-2">
            <Hash className="w-4 h-4" /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {node.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-[#141414] border border-[#262626] text-[#a3a3a3]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" /> Linked Nodes
          </h3>
          <ul className="space-y-2">
            {node.linked_nodes.map(linkId => {
              const linkedNode = data.wiki_nodes.entities.find(n => n.id === linkId);
              if (!linkedNode) return null;
              return (
                <li key={linkId}>
                  <Link to={`/wiki/${linkId}`} className="text-[#00ffcc] hover:underline text-sm flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> {linkedNode.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="pt-8 border-t border-[#262626]">
          <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4">Related Blog Stories</h3>
          <div className="grid gap-4">
            {relatedPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="bg-[#141414] border border-[#262626] p-4 rounded-lg hover:border-[#525252] transition-colors">
                <div className="text-xs font-mono text-[#525252] mb-1">{post.date}</div>
                <div className="text-white font-medium">{post.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
