import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-2.5 flex items-center gap-6">
      <div className="flex items-center gap-2 mr-2">
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none" className="shrink-0">
          <circle cx="14" cy="18" r="5" fill="url(#navGrad)" />
          <path d="M14 4 L18 14 L10 14 Z" fill="#f97316" />
          <defs>
            <linearGradient id="navGrad" x1="9" y1="13" x2="19" y2="23">
              <stop stopColor="#f97316" />
              <stop offset="1" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
          Supercritical Core
        </span>
      </div>

      <div className="flex items-center gap-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-xs font-semibold px-3 py-1.5 rounded-sm transition-all duration-150 ${
              isActive
                ? 'text-white fiery-gradient shadow-sm'
                : 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            `text-xs font-semibold px-3 py-1.5 rounded-sm transition-all duration-150 ${
              isActive
                ? 'text-white fiery-gradient shadow-sm ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-900'
                : 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-800'
            }`
          }
        >
          Docs
        </NavLink>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
        <span className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase">
          Thermal Grid · 2026
        </span>
      </div>
    </nav>
  );
}
