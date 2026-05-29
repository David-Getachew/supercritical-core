import { motion } from 'framer-motion';
import type { ThermalProject } from '../data/thermalProjects';
import { MAX_DEPTH } from '../data/thermalProjects';

interface ThermalMapProps {
  project: ThermalProject;
}

const CANVAS_W = 560;
const CANVAS_H = 420;
const MARGIN_LEFT = 72;
const MARGIN_TOP = 48;
const MARGIN_BOTTOM = 32;
const CRUST_X = MARGIN_LEFT + 20;
const CRUST_W = CANVAS_W - MARGIN_LEFT - 40;
const CRUST_H = CANVAS_H - MARGIN_TOP - MARGIN_BOTTOM;

const SURFACE_H = CRUST_H * 0.18;
const SEDIMENTARY_H = CRUST_H * 0.32;
const CORE_H = CRUST_H - SURFACE_H - SEDIMENTARY_H;

const LAYER_INFO = {
  surface: {
    label: 'Surface',
    detail: 'Atmospheric interface · 0–500 m',
    color: '#fef3c7',
    stroke: '#fcd34d',
  },
  sedimentary: {
    label: 'Sedimentary',
    detail: 'Reservoir strata · 500–3,500 m',
    color: '#fde68a',
    stroke: '#f59e0b',
  },
  core: {
    label: 'Supercritical Core',
    detail: 'Magma-adjacent supercritical fluids · 3,500+ m',
    color: '#7f1d1d',
    stroke: '#dc2626',
  },
};

function depthToY(depthMeters: number): number {
  const ratio = Math.min(depthMeters / MAX_DEPTH, 1);
  return MARGIN_TOP + ratio * CRUST_H;
}

function HeatParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: CRUST_X + 40 + (i % 7) * ((CRUST_W - 80) / 6),
    startY: MARGIN_TOP + SURFACE_H + SEDIMENTARY_H + CORE_H * 0.85,
    delay: i * 0.35,
    size: 2 + (i % 3),
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.x}
          cy={p.startY}
          r={p.size}
          fill="#f97316"
          opacity={0.85}
          animate={{
            cy: [p.startY, MARGIN_TOP - 20],
            opacity: [0.9, 0],
            r: [p.size, p.size * 0.4],
          }}
          transition={{
            duration: 3 + (p.id % 4) * 0.5,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

export default function ThermalMap({ project }: ThermalMapProps) {
  const probeY = depthToY(project.depthMeters);
  const isSolar = project.depthMeters === 0;

  const surfaceY = MARGIN_TOP;
  const sedimentaryY = MARGIN_TOP + SURFACE_H;
  const coreY = MARGIN_TOP + SURFACE_H + SEDIMENTARY_H;

  const depthTicks = [0, 2000, 4000, 6000, 8000, 10000];

  return (
    <div className="card-dark h-full flex flex-col">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
            Crust Thermal Cross-Section
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Interactive depth probe · hover layers for geology
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Active Site</p>
          <p className="text-xs font-semibold text-orange-400">{project.location}</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-3">
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="w-full h-full"
          role="img"
          aria-label="Earth crust thermal cross-section"
        >
          <defs>
            <linearGradient id="coreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>
            <linearGradient id="probeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="solarGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Depth ruler */}
          <rect
            x={MARGIN_LEFT - 52}
            y={MARGIN_TOP}
            width={44}
            height={CRUST_H}
            fill="#27272a"
            stroke="#52525b"
            strokeWidth={1}
          />
          {depthTicks.map((d) => {
            const y = depthToY(d);
            return (
              <g key={d}>
                <line
                  x1={MARGIN_LEFT - 52}
                  y1={y}
                  x2={MARGIN_LEFT - 8}
                  y2={y}
                  stroke="#71717a"
                  strokeWidth={1}
                />
                <text
                  x={MARGIN_LEFT - 56}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-zinc-400"
                  fontSize={9}
                  fontFamily="Outfit, sans-serif"
                >
                  {d === 0 ? '0 m' : `${(d / 1000).toFixed(0)}k`}
                </text>
              </g>
            );
          })}
          <text
            x={MARGIN_LEFT - 30}
            y={MARGIN_TOP - 12}
            textAnchor="middle"
            className="fill-zinc-600"
            fontSize={8}
            fontFamily="Outfit, sans-serif"
          >
            DEPTH
          </text>

          {/* Surface layer */}
          <LayerRect
            x={CRUST_X}
            y={surfaceY}
            width={CRUST_W}
            height={SURFACE_H}
            info={LAYER_INFO.surface}
          />

          {/* Sedimentary layer */}
          <LayerRect
            x={CRUST_X}
            y={sedimentaryY}
            width={CRUST_W}
            height={SEDIMENTARY_H}
            info={LAYER_INFO.sedimentary}
          />

          {/* Supercritical core */}
          <LayerRect
            x={CRUST_X}
            y={coreY}
            width={CRUST_W}
            height={CORE_H}
            info={LAYER_INFO.core}
            fill="url(#coreGrad)"
          />

          {/* Magma pulse ring */}
          <motion.circle
            cx={CRUST_X + CRUST_W / 2}
            cy={coreY + CORE_H - 12}
            r={28}
            fill="none"
            stroke="#f97316"
            strokeWidth={1.5}
            animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.15, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={CRUST_X + CRUST_W / 2}
            cy={coreY + CORE_H - 12}
            r={14}
            fill="#dc2626"
            opacity={0.6}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />

          <HeatParticles />

          {/* Solar concentration cone for NEOM */}
          {isSolar && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <polygon
                points={`${CRUST_X + CRUST_W / 2 - 60},${surfaceY} ${CRUST_X + CRUST_W / 2 + 60},${surfaceY} ${CRUST_X + CRUST_W / 2},${surfaceY - 70}`}
                fill="url(#solarGrad)"
                stroke="#f97316"
                strokeWidth={1}
              />
              <motion.circle
                cx={CRUST_X + CRUST_W / 2}
                cy={surfaceY - 78}
                r={12}
                fill="#f97316"
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <text
                x={CRUST_X + CRUST_W / 2}
                y={surfaceY - 95}
                textAnchor="middle"
                fill="#fb923c"
                fontSize={9}
                fontWeight={600}
                fontFamily="Outfit, sans-serif"
              >
                SOLAR CONCENTRATION
              </text>
            </motion.g>
          )}

          {/* Drill probe */}
          <motion.line
            x1={CRUST_X + CRUST_W / 2}
            y1={surfaceY}
            x2={CRUST_X + CRUST_W / 2}
            animate={{ y2: probeY }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            stroke="url(#probeGrad)"
            strokeWidth={3}
            strokeLinecap="square"
          />
          <motion.circle
            cx={CRUST_X + CRUST_W / 2}
            animate={{ cy: probeY }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            r={6}
            fill="#dc2626"
            stroke="#fff"
            strokeWidth={2}
          />

          {/* Probe depth callout */}
          <motion.g
            animate={{ y: probeY - 20 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <rect
              x={CRUST_X + CRUST_W / 2 + 16}
              y={-14}
              width={88}
              height={28}
              fill="#18181b"
              stroke="#f97316"
              strokeWidth={1}
            />
            <text
              x={CRUST_X + CRUST_W / 2 + 60}
              y={4}
              textAnchor="middle"
              fill="#fb923c"
              fontSize={10}
              fontWeight={600}
              fontFamily="Outfit, sans-serif"
            >
              {project.depthMeters.toLocaleString()} m
            </text>
          </motion.g>

          {/* Surface line */}
          <line
            x1={CRUST_X - 10}
            y1={surfaceY}
            x2={CRUST_X + CRUST_W + 10}
            y2={surfaceY}
            stroke="#f97316"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
        </svg>
      </div>
    </div>
  );
}

interface LayerRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  info: { label: string; detail: string; color: string; stroke: string };
  fill?: string;
}

function LayerRect({ x, y, width, height, info, fill }: LayerRectProps) {
  return (
    <g className="group cursor-pointer">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill ?? info.color}
        stroke={info.stroke}
        strokeWidth={1}
        className="transition-opacity group-hover:opacity-90"
      />
      <text
        x={x + 12}
        y={y + 18}
        fill={info.label === 'Supercritical Core' ? '#fecaca' : '#92400e'}
        fontSize={11}
        fontWeight={600}
        fontFamily="Outfit, sans-serif"
      >
        {info.label}
      </text>
      <foreignObject x={x + width - 180} y={y + 6} width={168} height={40}>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-zinc-900 border border-orange-900 shadow-sm px-2 py-1 text-[10px] text-zinc-300 leading-tight">
            {info.detail}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}
