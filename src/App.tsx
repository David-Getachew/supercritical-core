import { useState } from 'react';
import { thermalProjects2026 } from './data/thermalProjects';
import Header from './components/Header';
import ThermalMap from './components/ThermalMap';
import HeatMetrics from './components/HeatMetrics';
import ControlDock from './components/ControlDock';
import StatsStrip from './components/StatsStrip';

export default function App() {
  const [activeId, setActiveId] = useState(thermalProjects2026[0].id);
  const activeProject = thermalProjects2026.find((p) => p.id === activeId)!;

  return (
    <div className="bg-zinc-950 text-slate-100 font-sans min-h-screen">
      <Header />

      <StatsStrip project={activeProject} />

      <div
        className="flex flex-col lg:flex-row gap-3 px-4 pb-3"
        style={{ minHeight: 'calc(100vh - 380px)' }}
      >
        <div className="lg:w-[60%] min-h-[400px]">
          <ThermalMap project={activeProject} />
        </div>
        <div className="lg:w-[40%] min-h-[520px]">
          <ControlDock
            projects={thermalProjects2026}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>
      </div>

      <HeatMetrics projects={thermalProjects2026} />

      <footer className="px-6 py-3 text-center text-[10px] text-zinc-600 border-t border-zinc-800">
        Supercritical Core · Portfolio Infographic · Data embedded locally · No external APIs
      </footer>
    </div>
  );
}
