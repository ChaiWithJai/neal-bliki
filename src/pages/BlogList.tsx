import data from "@/data.json";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function BlogList() {
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-[#8B8B85] mb-3 font-medium">
            The Journey
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Stories</h1>
          <p className="text-[#52524E] text-lg max-w-2xl">
            {data.blog_stories.description}
          </p>
        </header>

        <div className="space-y-6">
          {data.blog_stories.posts.map((post, i) => {
            const topic = data.taxonomy.topics.find(
              (t) => t.id === post.topic_id
            );
            return (
              <motion.article
                key={post.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="block bg-white border border-black/5 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-black/[0.04] transition-all"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <time className="text-sm font-medium text-[#1D4ED8]">
                      {post.date}
                    </time>
                    {topic && (
                      <span className="text-xs text-[#8B8B85] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B8B85]" />
                        {topic.name}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold group-hover:text-[#1D4ED8] transition-colors mb-3 tracking-tight">
                    {post.title}
                  </h2>

                  <p className="text-[#52524E] leading-relaxed max-w-3xl mb-4">
                    {post.content_summary}
                  </p>

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
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
