import data from "@/data.json";
import { ArrowLeft, BookOpen, Calendar, Hash } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  const post = data.blog_stories.posts.find(p => p.id === id);

  if (!post) {
    return <div className="text-white">Post not found.</div>;
  }

  const topic = data.taxonomy.topics.find(t => t.id === post.topic_id);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <header className="space-y-6 pb-8 border-b border-[#262626]">
        <div className="flex items-center gap-4 text-sm font-mono">
          <time className="text-[#00ffcc] flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {post.date}
          </time>
          <span className="text-[#525252]">|</span>
          {topic && (
            <span className="text-[#a3a3a3]">{topic.name}</span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-[#141414] border border-[#262626] text-[#525252]">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-[#e5e5e5] leading-relaxed font-light">
          {post.content_summary}
        </p>
        <div className="mt-8 p-6 bg-[#0f0f0f] border border-[#262626] rounded-xl text-[#a3a3a3] italic text-center">
          [Full content would be rendered here from a CMS or markdown file]
        </div>
      </div>

      {post.related_wiki_nodes.length > 0 && (
        <div className="pt-8 border-t border-[#262626]">
          <h3 className="text-sm font-mono text-[#525252] uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Related Wiki Nodes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.related_wiki_nodes.map(nodeId => {
              const node = data.wiki_nodes.entities.find(n => n.id === nodeId);
              if (!node) return null;
              return (
                <Link key={nodeId} to={`/wiki/${nodeId}`} className="bg-[#141414] border border-[#262626] p-4 rounded-lg hover:border-[#00ffcc]/50 transition-colors group">
                  <div className="text-xs font-mono text-[#525252] mb-1">{node.type}</div>
                  <div className="text-white font-medium group-hover:text-[#00ffcc] transition-colors">{node.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
