import data from "@/data.json";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogList() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-[#262626] pb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#00ffcc]" />
          Blog Stories
        </h1>
        <p className="text-[#a3a3a3] mt-2 max-w-2xl">
          {data.blog_stories.description}
        </p>
      </header>

      <div className="space-y-6">
        {data.blog_stories.posts.map(post => {
          const topic = data.taxonomy.topics.find(t => t.id === post.topic_id);
          return (
            <article key={post.id} className="group relative pl-8 border-l border-[#262626] hover:border-[#00ffcc] transition-colors pb-8 last:pb-0">
              <div className="absolute w-3 h-3 bg-[#0a0a0a] border-2 border-[#262626] group-hover:border-[#00ffcc] rounded-full -left-[6.5px] top-1.5 transition-colors"></div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <time className="text-sm font-mono text-[#00ffcc]">{post.date}</time>
                  {topic && (
                    <span className="text-xs text-[#525252] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#525252]"></span>
                      {topic.name}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white group-hover:text-[#00ffcc] transition-colors">
                  <Link to={`/blog/${post.id}`} className="before:absolute before:inset-0">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-[#a3a3a3] leading-relaxed max-w-3xl">
                  {post.content_summary}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-[#141414] border border-[#262626] text-[#525252] relative z-10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
