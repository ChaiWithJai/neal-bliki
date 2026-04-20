import { Link } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function BlogList() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="editorial-kicker mb-3 text-[#6b7280]">The Journey</p>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-3 text-4xl font-bold tracking-tight text-[#111111]"
          >
            Stories
          </TextAnimate>
          <p className="max-w-2xl text-lg text-[#4b5563]">{data.blog_stories.description}</p>
        </header>

        <BlurFade inView className="mb-8">
          <MagicCard className="p-6">
            <h2 className="text-uplift mb-2 text-2xl font-bold text-[#111111]">
              Real pain points. Real fixes. <span className="marker-blue">No fluff.</span>
            </h2>
            <p className="text-[#4b5563]">
              These stories break down business friction, what changed in the build, and the concrete outcome so you
              can apply the same thinking to your own site.
            </p>
          </MagicCard>
        </BlurFade>

        <div className="space-y-6">
          {data.blog_stories.posts.map((post, i) => {
            const topic = data.taxonomy.topics.find((t) => t.id === post.topic_id);

            return (
              <article key={post.id} className="group relative">
                <BlurFade inView delay={i * 0.05}>
                  <Link to={`/blog/${post.id}`} className="block">
                    <MagicCard className="p-6 md:p-8">
                      <div className="mb-3 flex items-center gap-4">
                        <time className="text-sm font-medium text-[#4285F4]">{post.date}</time>
                        {topic && (
                          <span className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
                            {topic.name}
                          </span>
                        )}
                      </div>

                      <h2 className="text-uplift mb-3 text-2xl font-bold tracking-tight text-[#111111] transition-colors group-hover:text-[#EA4335]">
                        <Highlighter color="rgba(234,67,53,0.30)">{post.title}</Highlighter>
                      </h2>

                      <p className="mb-4 max-w-3xl text-base leading-relaxed text-[#4b5563]">{post.content_summary}</p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#374151]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </MagicCard>
                  </Link>
                </BlurFade>
              </article>
            );
          })}
        </div>

        <BlurFade inView className="mt-10">
          <MagicCard className="p-6 md:p-8">
            <h2 className="text-uplift mb-3 text-2xl font-bold text-[#111111]">Want this for your business?</h2>
            <p className="mb-5 text-[#4b5563]">
              I can audit your current website, identify the top blockers, and give you a prioritized action plan with
              implementation options.
            </p>
            <Link
              to="/contact?context=Blog%20pain%20points%20audit"
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
