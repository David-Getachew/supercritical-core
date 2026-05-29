import { AnimatePresence, motion } from 'framer-motion';
import type { ThermalProject } from '../data/thermalProjects';
import TempGauge from './TempGauge';

interface ControlDockProps {
  projects: ThermalProject[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ControlDock({ projects, activeId, onSelect }: ControlDockProps) {
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <div className="bg-zinc-900 shadow-sm border border-zinc-800 h-full flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-800 shrink-0">
        <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
          Thermal Control Dock
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Select a megaproject to reconfigure depth &amp; heat
        </p>
      </div>

      {/* Live Telemetry — fixed height, never clipped */}
      <div className="shrink-0 border-b border-zinc-800 bg-gradient-to-b from-orange-950/40 to-zinc-900 min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pt-4 pb-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                Live Telemetry
              </p>
              <span className="text-[10px] text-zinc-500 font-medium truncate ml-2">{active.name}</span>
            </div>
            <div className="bg-zinc-950 border border-orange-900/60 shadow-sm py-4 px-3 min-h-[190px] flex items-center justify-center">
              <TempGauge temperature={active.temperatureCelsius} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project toggles */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-3 flex flex-col gap-2">
          {projects.map((project) => {
            const isActive = project.id === activeId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelect(project.id)}
                className={`w-full text-left px-3 py-2.5 rounded-sm transition-all duration-200 ${
                  isActive
                    ? 'fiery-gradient text-white shadow-sm ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-900'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-orange-700 hover:bg-zinc-950/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={`text-xs font-bold tracking-wide truncate ${isActive ? 'text-white' : 'text-slate-100'}`}>
                      {project.name}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${isActive ? 'text-orange-100' : 'text-zinc-500'}`}>
                      {project.location}
                    </p>
                  </div>
                  {isActive && (
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-widest bg-white/20 px-1.5 py-0.5">
                      Active
                    </span>
                  )}
                </div>
                <p className={`text-[10px] mt-1.5 font-medium truncate ${isActive ? 'text-orange-50' : 'text-orange-500'}`}>
                  {project.type}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact readout strip */}
      <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 p-3">
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Active Readout</p>
        <div className="grid grid-cols-4 gap-1.5">
          <ReadoutChip label="Depth" value={`${(active.depthMeters / 1000).toFixed(1)}k`} />
          <ReadoutChip
            label="Output"
            value={
              typeof active.outputMW === 'number'
                ? `${active.outputMW} MW`
                : active.outputMW
            }
          />
          <ReadoutChip label="Temp" value={`${active.temperatureCelsius}°C`} />
          <ReadoutChip label="Type" value={active.type.split(' ')[0]} />
        </div>
      </div>
    </div>
  );
}

function ReadoutChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 px-1.5 py-1.5 text-center min-w-0">
      <p className="text-[8px] text-zinc-600 uppercase tracking-wider truncate">{label}</p>
      <p className="text-[11px] font-bold text-slate-100 truncate leading-tight">{value}</p>
    </div>
  );
}
