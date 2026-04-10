import data from "@/data.json";
import { ArrowLeft, BookOpen, Calendar, Hash, Link as LinkIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function WikiNode() {
  const { id } = useParams();
  const node = data.wiki_nodes.entities.find((n) => n.id === id);

  if (!node) {
    return (
      <div className="pt-28 pb-20 px-6 text-center text-[#52524E]">
        Node not found.
      </div>
    );
  }

  const topic = data.taxonomy.topics.find((t) => t.id === node.topic_id);
  const relatedPosts = data.blog_stories.posts.filter((p) =>
    p.related_wiki_nodes.includes(node.id)
  );

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/wiki"
          className="inline-flex items-center gap-2 text-sm text-[#8B8B85] hover:text-[#171717] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Wiki
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#1D4ED8]/[0.08] text-[#1D4ED8] font-medium">
              {node.type}
            </span>
            {topic && (
              <span className="text-xs text-[#8B8B85] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B85]" />
                {topic.name}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {node.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#8B8B85]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {node.last_updated}
            </span>
          </div>
        </header>

        <div className="prose prose-neutral max-w-none">
          <div className="text-lg text-[#52524E] leading-relaxed bg-white border border-black/5 p-8 rounded-2xl">
            {node.content}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 mt-10 border-t border-black/5">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-4 font-medium flex items-center gap-2">
              <Hash className="w-4 h-4" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#F0EDE8] text-[#52524E]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-4 font-medium flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Linked Nodes
            </h3>
            <ul className="space-y-2">
              {node.linked_nodes.map((linkId) => {
                const linkedNode = data.wiki_nodes.entities.find(
                  (n) => n.id === linkId
                );
                if (!linkedNode) return null;
                return (
                  <li key={linkId}>
                    <Link
                      to={`/wiki/${linkId}`}
                      className="text-[#1D4ED8] hover:underline text-sm flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> {linkedNode.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="pt-10 mt-10 border-t border-black/5">
            <h3 className="text-sm uppercase tracking-widest text-[#8B8B85] mb-4 font-medium">
              Related Stories
            </h3>
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="bg-white border border-black/5 p-5 rounded-xl hover:shadow-lg hover:shadow-black/[0.04] transition-all group"
                >
                  <time className="text-xs font-medium text-[#8B8B85]">
                    {post.date}
                  </time>
                  <div className="text-[#171717] font-medium mt-1 group-hover:text-[#1D4ED8] transition-colors">
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
