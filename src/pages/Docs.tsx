import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Select a Megaproject',
    body: 'Use the Thermal Control Dock on the right to toggle between Fervo Cape Geothermal, Quaise Millimeter-Wave, and NEOM Solar Dome. Each button activates a different global thermal site.',
  },
  {
    num: '02',
    title: 'Watch the Crust Adapt',
    body: 'The central SVG cross-section animates a drilling probe to the selected project\'s depth. Heat particles rise from the supercritical core. NEOM shows a solar concentration cone at the surface instead of a borehole.',
  },
  {
    num: '03',
    title: 'Read Live Telemetry',
    body: 'The radial temperature gauge, depth odometer, and thermal load bar update in real time. Stats cards count up smoothly when you switch projects.',
  },
  {
    num: '04',
    title: 'Compare in the Chart',
    body: 'The ComposedChart below compares all three projects — orange bars for drilling depth (m) and a red line for core temperature (°C). Hover data points for precise values.',
  },
  {
    num: '05',
    title: 'Explore Geology Layers',
    body: 'Hover over Surface, Sedimentary, or Supercritical Core bands in the cross-section to reveal geological detail tooltips.',
  },
];

const DATA_SOURCES = [
  { project: 'Project Cape Geothermal', source: 'Fervo Energy public pilot data · Utah EGS field' },
  { project: 'Quaise Millimeter-Wave', source: 'Quaise Energy gyrotron vaporization pilot metrics' },
  { project: 'NEOM Solar Dome', source: 'NEOM concentrated solar thermal desalination program' },
];

export default function Docs() {
  return (
    <div className="bg-zinc-950 text-slate-100 font-sans min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 fiery-gradient text-white text-xs font-semibold px-4 py-2.5 rounded-sm shadow-sm hover:opacity-90 transition-opacity mb-8"
        >
          ← Back to Dashboard
        </Link>

        <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-[0.2em] mb-2">
          Documentation
        </p>
        <h1 className="text-3xl font-bold text-slate-50 mb-2">
          How Supercritical Core Works
        </h1>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          This interactive infographic visualizes three frontier thermal energy megaprojects
          scheduled for 2026 deployment. All data is embedded locally — no external APIs are called.
        </p>

        <section className="card-dark p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-3">
            Overview
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Supercritical Core maps the Earth&apos;s crust in three geological layers — Surface,
            Sedimentary, and Supercritical Core — and overlays real project metrics for depth,
            temperature, and power output. The dashboard uses a dark engineering aesthetic with
            magma orange-to-red accent gradients throughout.
          </p>
        </section>

        <section className="card-dark p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-4">
            How to Interact
          </h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 fiery-gradient text-white text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">{step.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-dark p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-4">
            Data Sources
          </h2>
          <div className="space-y-3">
            {DATA_SOURCES.map((d) => (
              <div key={d.project} className="border-l-2 border-orange-600 pl-3">
                <p className="text-xs font-semibold text-slate-100">{d.project}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{d.source}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card-dark p-5 mb-4">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-4">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              'React 19 + TypeScript',
              'Vite 8',
              'Tailwind CSS 3',
              'Framer Motion',
              'Recharts',
              'React Router v7',
              'Outfit (Google Fonts)',
              'Vercel SPA Deploy',
            ].map((tech) => (
              <div
                key={tech}
                className="bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section className="card-dark p-5">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wide mb-3">
            Design System
          </h2>
          <p className="text-xs text-zinc-500 mb-3">
            Dark mode with zinc-950 background, zinc-900 cards, and magma gradient accents.
            No blues, purples, or neon colors.
          </p>
          <div className="flex gap-2">
            <div className="flex-1 h-8 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500">
              bg-zinc-950
            </div>
            <div className="flex-1 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-500">
              bg-zinc-900
            </div>
            <div className="flex-1 h-8 fiery-gradient flex items-center justify-center text-[10px] text-white font-semibold">
              orange → red
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
