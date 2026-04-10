import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Terminal, Book, FileText, Briefcase, Zap } from "lucide-react";
import data from "@/data.json";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: Terminal },
    { name: "Wiki Nodes", path: "/wiki", icon: Book },
    { name: "Blog Stories", path: "/blog", icon: FileText },
    { name: "Offerings", path: "/offerings", icon: Briefcase },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-[#00ffcc] selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#262626] bg-[#0f0f0f] flex flex-col">
        <div className="p-6 border-b border-[#262626]">
          <div className="flex items-center gap-2 text-[#00ffcc] mb-2">
            <Zap className="w-5 h-5 fill-current" />
            <h1 className="font-mono font-bold tracking-tight text-lg uppercase">
              {data.bliki_metadata.author.split(' ')[0]}_OS
            </h1>
          </div>
          <p className="text-xs text-[#a3a3a3] font-mono">v{data.bliki_metadata.version} // {data.bliki_metadata.location}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#1a1a1a] text-[#00ffcc]"
                        : "text-[#a3a3a3] hover:bg-[#141414] hover:text-[#e5e5e5]"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 px-6">
            <h2 className="text-[10px] uppercase font-mono tracking-widest text-[#525252] mb-3">Taxonomy</h2>
            <div className="flex flex-wrap gap-2">
              {data.taxonomy.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-[#141414] border border-[#262626] text-[#a3a3a3]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#262626]">
          <a href={data.bliki_metadata.base_url} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#525252] hover:text-[#00ffcc] transition-colors flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            {data.bliki_metadata.base_url.replace('https://', '')}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="relative z-10 p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
