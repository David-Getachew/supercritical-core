import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ThermalProject } from '../data/thermalProjects';

interface HeatMetricsProps {
  projects: ThermalProject[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 border border-orange-900 shadow-sm px-3 py-2 text-xs">
      <p className="font-semibold text-slate-100 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {entry.value.toLocaleString()}
          {entry.name === 'Temperature (°C)' ? '°C' : ' m'}
        </p>
      ))}
    </div>
  );
}

export default function HeatMetrics({ projects }: HeatMetricsProps) {
  const data = projects.map((p) => ({
    name: p.name.split(' ')[0],
    depthMeters: p.depthMeters,
    temperatureCelsius: p.temperatureCelsius,
  }));

  return (
    <div className="card-dark mx-4 mb-4">
      <div className="px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
          Depth vs Temperature Matrix
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          Orange bars = drilling depth · Red line = core temperature
        </p>
      </div>
      <div className="p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'Outfit, sans-serif' }}
              axisLine={{ stroke: '#52525b' }}
              tickLine={{ stroke: '#52525b' }}
            />
            <YAxis
              yAxisId="depth"
              orientation="left"
              tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'Outfit, sans-serif' }}
              axisLine={{ stroke: '#52525b' }}
              tickLine={{ stroke: '#52525b' }}
              label={{
                value: 'Depth (m)',
                angle: -90,
                position: 'insideLeft',
                fill: '#71717a',
                fontSize: 10,
                fontFamily: 'Outfit, sans-serif',
              }}
            />
            <YAxis
              yAxisId="temp"
              orientation="right"
              domain={[0, 1100]}
              tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'Outfit, sans-serif' }}
              axisLine={{ stroke: '#52525b' }}
              tickLine={{ stroke: '#52525b' }}
              label={{
                value: 'Temp (°C)',
                angle: 90,
                position: 'insideRight',
                fill: '#71717a',
                fontSize: 10,
                fontFamily: 'Outfit, sans-serif',
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#a1a1aa' }}
            />
            <Bar
              yAxisId="depth"
              dataKey="depthMeters"
              name="Depth (m)"
              fill="#f97316"
              radius={[0, 0, 0, 0]}
              maxBarSize={48}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperatureCelsius"
              name="Temperature (°C)"
              stroke="#dc2626"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f97316', stroke: '#dc2626', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#f97316', stroke: '#dc2626', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
