import { useEffect, useState, type ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { ThermalProject } from '../data/thermalProjects';
import { MAX_OUTPUT_MW, formatOutput, outputToNumeric } from '../data/thermalProjects';

interface StatsStripProps {
  project: ThermalProject;
}

function useAnimatedNumber(target: number) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    spring.set(target);
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [target, spring]);

  return display;
}

export default function StatsStrip({ project }: StatsStripProps) {
  const depthDisplay = useAnimatedNumber(project.depthMeters);
  const tempDisplay = useAnimatedNumber(project.temperatureCelsius);
  const outputNumeric = outputToNumeric(project.outputMW);
  const loadPercent = outputNumeric > 0 ? (outputNumeric / MAX_OUTPUT_MW) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 py-3">
      <StatCard
        label="Drill Depth Odometer"
        value={`${depthDisplay.toLocaleString()} m`}
        sub={project.depthMeters === 0 ? 'Surface solar concentration' : 'Target bore depth'}
      >
        <div className="mt-3 h-1.5 bg-zinc-950 border border-zinc-800 overflow-hidden">
          <motion.div
            className="h-full fiery-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((project.depthMeters / 10000) * 100, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </StatCard>

      <StatCard
        label="Core Temperature"
        value={`${tempDisplay}°C`}
        sub={project.temperatureCelsius >= 500 ? 'Supercritical threshold' : 'Sub-critical reservoir'}
      >
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-3 border border-zinc-800 ${
                i < Math.round(project.temperatureCelsius / 100)
                  ? 'fiery-gradient'
                  : 'bg-zinc-950'
              }`}
            />
          ))}
        </div>
      </StatCard>

      <StatCard
        label="Thermal Load"
        value={formatOutput(project.outputMW)}
        sub={typeof project.outputMW === 'number' ? 'Grid export capacity' : 'Specialized thermal output'}
      >
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-zinc-600 mb-1">
            <span>0 MW</span>
            <span>{MAX_OUTPUT_MW} MW max</span>
          </div>
          <div className="h-2 bg-zinc-950 border border-zinc-800 overflow-hidden">
            <motion.div
              className="h-full fiery-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${loadPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </StatCard>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  children,
}: {
  label: string;
  value: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <div className="card-dark px-4 py-3">
      <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-slate-50 mt-1"
      >
        {value}
      </motion.p>
      <p className="text-[10px] text-zinc-500 mt-0.5">{sub}</p>
      {children}
    </div>
  );
}
