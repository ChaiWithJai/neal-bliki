import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import data from "@/data.json";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Knowledge", path: "/wiki" },
  { name: "Stories", path: "/blog" },
  { name: "Work With Me", path: "/offerings" },
];

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] font-sans">
      {/* Floating Nav */}
      <nav
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          scrolled ? "top-3" : "top-4"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300",
            scrolled
              ? "bg-white/90 backdrop-blur-xl border-black/10 shadow-lg shadow-black/[0.04]"
              : "bg-white/60 backdrop-blur-md border-black/5"
          )}
        >
          <Link
            to="/"
            className="px-4 py-1.5 text-sm font-bold tracking-tight text-[#171717]"
          >
            NF
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#171717] text-white"
                      : "text-[#52524E] hover:text-[#171717] hover:bg-black/5"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden p-2 text-[#52524E]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-black/10 shadow-lg shadow-black/[0.04] p-2">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#171717] text-white"
                      : "text-[#52524E] hover:bg-black/5"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white/40">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="text-lg font-bold tracking-tight mb-1">
                {data.bliki_metadata.author}
              </div>
              <p className="text-sm text-[#8B8B85]">
                Creative Technologist &middot; Virginia Beach, VA
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-[#52524E] hover:text-[#171717] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8B8B85]">
              &copy; 2026 {data.bliki_metadata.author}. All rights reserved.
            </p>
            <a
              href={data.bliki_metadata.base_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#8B8B85] hover:text-[#1D4ED8] transition-colors"
            >
              {data.bliki_metadata.base_url.replace("https://", "")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
