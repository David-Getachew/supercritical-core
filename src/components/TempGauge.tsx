import { motion } from 'framer-motion';
import { MAX_TEMP } from '../data/thermalProjects';

interface TempGaugeProps {
  temperature: number;
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function TempGauge({ temperature }: TempGaugeProps) {
  const ratio = Math.min(temperature / MAX_TEMP, 1);
  const cx = 100;
  const cy = 72;
  const r = 58;
  const bgPath = describeArc(cx, cy, r, 180, 360);
  const fillEnd = 180 + ratio * 180;
  const fillPath = describeArc(cx, cy, r, 180, fillEnd);

  const needleAngle = 180 + ratio * 180;
  const needleTip = polarToCartesian(cx, cy, r - 6, needleAngle);

  return (
    <div className="flex flex-col items-center w-full py-2">
      <svg
        viewBox="0 0 200 130"
        className="w-full max-w-[300px] h-[130px] overflow-visible"
        aria-label={`Core temperature ${temperature} degrees Celsius`}
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path d={bgPath} fill="none" stroke="#3f3f46" strokeWidth={10} strokeLinecap="square" />
        <motion.path
          key={temperature}
          d={fillPath}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={10}
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.line
          x1={cx}
          y1={cy}
          animate={{ x2: needleTip.x, y2: needleTip.y }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          stroke="#fca5a5"
          strokeWidth={2}
          strokeLinecap="square"
        />
        <circle cx={cx} cy={cy} r={5} fill="#dc2626" />
        <text
          x={cx}
          y={cy + 26}
          textAnchor="middle"
          fill="#fafafa"
          fontSize={22}
          fontWeight={700}
          fontFamily="Outfit, sans-serif"
        >
          {temperature}°C
        </text>
        <text
          x={cx}
          y={cy + 42}
          textAnchor="middle"
          fill="#71717a"
          fontSize={10}
          fontFamily="Outfit, sans-serif"
        >
          Core Temperature
        </text>
      </svg>
    </div>
  );
}
