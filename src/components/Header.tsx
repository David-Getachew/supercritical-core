import { Link } from 'react-router-dom';
import { thermalProjects2026 } from '../data/thermalProjects';

export default function Header() {
  const maxDepth = Math.max(...thermalProjects2026.map((p) => p.depthMeters));
  const maxTemp = Math.max(...thermalProjects2026.map((p) => p.temperatureCelsius));

  return (
    <header className="relative border-b border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="flex h-2 w-full">
        <div className="flex-[2] bg-[#78350f]" title="Surface" />
        <div className="flex-[3] bg-[#92400e]" title="Sedimentary" />
        <div className="flex-[5] fiery-gradient" title="Supercritical Core" />
      </div>

      <div className="relative px-6 py-4">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #dc2626 0px, #dc2626 1px, transparent 1px, transparent 24px)',
          }}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-end gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <DepthRulerMini />
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.25em] uppercase">
                Deep Thermal Energy Grid
              </span>
            </div>

            <h1 className="leading-none">
              <span className="block text-4xl md:text-5xl font-light text-zinc-500 tracking-tight">
                Supercritical
              </span>
              <span className="block text-4xl md:text-5xl font-bold text-slate-50 tracking-tight -mt-1">
                Core
                <span className="inline-block ml-3 text-lg font-semibold text-orange-500 align-middle border-l-2 border-orange-600 pl-3">
                  2026
                </span>
              </span>
            </h1>

            <p className="text-xs text-zinc-500 mt-2 max-w-md leading-relaxed">
              Crust-layer visualization of EGS drilling, gyrotron vaporization, and concentrated solar thermal megaprojects.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full lg:w-auto">
            <Link
              to="/docs"
              className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-orange-600 text-orange-400 hover:bg-orange-950/40 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Guide</span>
              <span className="text-lg leading-none group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>

            <div className="flex items-stretch gap-2 sm:gap-4">
              <div className="hidden sm:flex flex-col justify-between py-1 px-3 border border-zinc-800 bg-zinc-950">
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Depth Scale</span>
                <div className="flex flex-col gap-1 my-1">
                  {[0, 5, 10].map((km) => (
                    <div key={km} className="flex items-center gap-2">
                      <div className="w-8 h-px bg-orange-700" />
                      <span className="text-[10px] font-semibold text-zinc-400 tabular-nums">{km}k m</span>
                    </div>
                  ))}
                </div>
              </div>

              <StatBlock value={`${thermalProjects2026.length}`} unit="sites" label="Megaprojects" />
              <StatBlock value={`${(maxDepth / 1000).toFixed(0)}k`} unit="m" label="Max Depth" highlight />
              <StatBlock value={`${maxTemp}`} unit="°C" label="Peak Temp" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-full fiery-gradient opacity-80" />
    </header>
  );
}

function StatBlock({
  value,
  unit,
  label,
  highlight = false,
}: {
  value: string;
  unit: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2 border ${
        highlight ? 'border-orange-800 bg-orange-950/30' : 'border-zinc-800 bg-zinc-950'
      }`}
    >
      <div className="text-[9px] text-zinc-600 uppercase tracking-widest">{label}</div>
      <div className={`text-xl font-bold tabular-nums ${highlight ? 'text-orange-400' : 'text-slate-100'}`}>
        {value}
        <span className="text-xs font-normal text-zinc-500 ml-1">{unit}</span>
      </div>
    </div>
  );
}

function DepthRulerMini() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
      <rect x="8" y="0" width="4" height="32" fill="#27272a" stroke="#52525b" strokeWidth="0.5" />
      {[0, 8, 16, 24, 32].map((y) => (
        <g key={y}>
          <line x1="4" y1={y} x2="8" y2={y} stroke="#71717a" strokeWidth="0.75" />
          <line x1="12" y1={y} x2="16" y2={y} stroke="#71717a" strokeWidth="0.75" />
        </g>
      ))}
      <circle cx="10" cy="28" r="2" fill="#dc2626" />
    </svg>
  );
}
