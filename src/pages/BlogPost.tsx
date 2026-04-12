import data from "@/data.json";
import { ArrowLeft, BookOpen, Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  const post = data.blog_stories.posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="pt-28 pb-20 px-6 text-center text-[#52524E]">
        Post not found.
      </div>
    );
  }

  const topic = data.taxonomy.topics.find((t) => t.id === post.topic_id);

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#8B8B85] hover:text-[#171717] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Stories
        </Link>

        <header className="mb-10 pb-10 border-b border-black/5">
          <div className="flex items-center gap-4 text-sm mb-4">
            <time className="text-[#1D4ED8] font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {post.date}
            </time>
            {topic && (
              <span className="text-[#8B8B85]">{topic.name}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#F0EDE8] text-[#8B8B85]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-neutral max-w-none">
          <p className="text-xl text-[#52524E] leading-relaxed font-light">
            {post.content_summary}
          </p>
          <div className="mt-10 p-8 bg-white border border-black/5 rounded-2xl text-[#8B8B85] italic text-center">
            Full content would be rendered here from a CMS or markdown file.
          </div>
        </div>

        {post.related_wiki_nodes.length > 0 && (
          <div className="pt-10 mt-10 border-t border-black/5">
            <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-4 font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Related Knowledge
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.related_wiki_nodes.map((nodeId) => {
                const node = data.wiki_nodes.entities.find(
                  (n) => n.id === nodeId
                );
                if (!node) return null;
                return (
                  <Link
                    key={nodeId}
                    to={`/wiki/${nodeId}`}
                    className="bg-white border border-black/5 p-5 rounded-xl hover:shadow-lg hover:shadow-black/[0.04] transition-all group"
                  >
                    <div className="text-xs font-medium text-[#8B8B85] mb-1">
                      {node.type}
                    </div>
                    <div className="text-[#171717] font-medium group-hover:text-[#1D4ED8] transition-colors">
                      {node.title}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
