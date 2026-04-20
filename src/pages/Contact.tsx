import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";

export default function Contact() {
  const [params] = useSearchParams();
  const context = params.get("context") || "";
  const success = params.get("success") === "true";

  const prefills = useMemo(
    () => ({
      subject: context ? `Help request: ${context}` : "Website growth help",
      message: context
        ? `Hi Neal, I want help with this: ${context}\n\nMy website:\nMy top pain point:\nMy timeline:`
        : "Hi Neal,\n\nMy website:\nMy top pain point:\nMy timeline:",
    }),
    [context]
  );

  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-uplift mb-3 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl">
            Contact Neal
          </h1>
          <p className="mx-auto max-w-xl text-[#4b5563]">
            Share your website pain point and I will send a practical action plan focused on results.
          </p>
        </header>

        <BlurFade inView>
          <MagicCard className="p-6 md:p-8">
            {success && (
              <div className="mb-6 rounded-2xl border border-[#34A853]/30 bg-[#34A853]/10 px-4 py-3 text-sm text-[#1f5130]">
                Thanks, your message was sent successfully. I&rsquo;ll follow up soon.
              </div>
            )}

            <form
              name="contact"
              method="POST"
              action="/contact/?success=true"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you&rsquo;re human: <input name="bot-field" />
                </label>
              </p>
              <input type="hidden" name="context" value={context} />

              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#111111]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[#111111] outline-none focus:border-[#4285F4]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#111111]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[#111111] outline-none focus:border-[#4285F4]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#111111]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  defaultValue={prefills.subject}
                  required
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[#111111] outline-none focus:border-[#FBBC05]"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#111111]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  defaultValue={prefills.message}
                  required
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-[#111111] outline-none focus:border-[#EA4335]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center rounded-full border border-[#4285F4]/35 bg-[#4285F4]/10 px-5 py-2.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#4285F4]/16"
              >
                Send Message
              </button>
            </form>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
