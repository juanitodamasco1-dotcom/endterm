"use client";

import React from "react";

export interface ChartDatum {
  label: string;
  value: number;
  color?: string;
}

const PALETTE = [
  "var(--accent)",
  "var(--accent2)",
  "#8B6BA8",
  "#C9A227",
  "#5B8C5A",
  "#B0554F",
  "#4E7FA6",
];

function truncateLabel(s: string, n: number): string {
  const str = String(s);
  return str.length > n ? `${str.slice(0, n - 1)}…` : str;
}

export function BarChart({
  data,
  width = 520,
  height: baseHeight = 220,
}: {
  data: ChartDatum[];
  width?: number;
  height?: number;
}) {
  const pad = 34;
  const n = data.length || 1;
  const gap = (width - pad * 2) / n;
  // Rotate category labels when columns get narrow so they don't collide.
  const rotate = gap < 64;
  const bottom = rotate ? 62 : 30;
  const height = baseHeight + (rotate ? bottom - 30 : 0);
  const maxChars = rotate ? 14 : Math.max(4, Math.floor(gap / 6.2));
  const max = Math.max(1, ...data.map((d) => d.value));
  const chartW = width - pad * 2;
  const chartH = height - bottom - 14;
  const bw = Math.min(56, (chartW / n) * 0.58);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <line
        x1={pad}
        y1={height - bottom}
        x2={width - pad + 8}
        y2={height - bottom}
        stroke="var(--line)"
        strokeWidth="1"
      />
      {data.map((d, i) => {
        const x = pad + gap * i + (gap - bw) / 2;
        const bh = max > 0 ? (d.value / max) * chartH : 0;
        const y = 14 + (chartH - bh);
        const color = d.color || PALETTE[i % PALETTE.length];
        return (
          <g key={`${d.label}-${i}`}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={Math.max(bh, 1)}
              rx={4}
              fill={color}
            />
            <text
              x={x + bw / 2}
              y={y - 6}
              fontSize="11"
              textAnchor="middle"
              fill="var(--ink)"
              fontFamily="var(--font-body)"
            >
              {d.value}
            </text>
            <text
              x={x + bw / 2}
              y={rotate ? height - bottom + 14 : height - 10}
              fontSize="10.5"
              textAnchor={rotate ? "end" : "middle"}
              transform={
                rotate
                  ? `rotate(-35 ${x + bw / 2} ${height - bottom + 14})`
                  : undefined
              }
              fill="var(--ink-soft)"
              fontFamily="var(--font-body)"
            >
              <title>{d.label}</title>
              {truncateLabel(d.label, maxChars)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({
  data,
  width = 200,
  height = 200,
}: {
  data: ChartDatum[];
  width?: number;
  height?: number;
}) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 10;
  const r2 = r * 0.58;
  const total = data.reduce((a, d) => a + d.value, 0);

  if (total <= 0) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth="18"
        />
      </svg>
    );
  }

  const slices = data.reduce<{ ang: number; items: React.ReactNode[] }>(
    (acc, d, i) => {
      const frac = d.value / total;
      const a0 = acc.ang;
      const a1 = acc.ang + frac * Math.PI * 2;
      if (frac <= 0) {
        return { ang: a1, items: acc.items };
      }
      const color = d.color || PALETTE[i % PALETTE.length];
      // A single 100% slice has identical start/end points, so an SVG arc
      // would render nothing — draw a full ring instead.
      if (frac >= 0.9999) {
        acc.items.push(
          <circle
            key={`${d.label}-${i}`}
            cx={cx}
            cy={cy}
            r={(r + r2) / 2}
            fill="none"
            stroke={color}
            strokeWidth={r - r2}
          />
        );
        return { ang: a1, items: acc.items };
      }
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi0 = cx + r2 * Math.cos(a1);
      const yi0 = cy + r2 * Math.sin(a1);
      const xi1 = cx + r2 * Math.cos(a0);
      const yi1 = cy + r2 * Math.sin(a0);
      const path = `M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${xi0},${yi0} A${r2},${r2} 0 ${large} 0 ${xi1},${yi1} Z`;
      acc.items.push(<path key={`${d.label}-${i}`} d={path} fill={color} />);
      return { ang: a1, items: acc.items };
    },
    { ang: -Math.PI / 2, items: [] }
  ).items;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      {slices}
      <text
        x={cx}
        y={cy - 2}
        fontSize="19"
        textAnchor="middle"
        fill="var(--ink)"
        fontFamily="var(--font-display)"
        fontWeight="600"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 15}
        fontSize="9.5"
        textAnchor="middle"
        fill="var(--ink-soft)"
        fontFamily="var(--font-body)"
      >
        total
      </text>
    </svg>
  );
}

export function ChartLegend({ data }: { data: ChartDatum[] }) {
  return (
    <div className="chart-legend">
      {data.map((d, i) => {
        const color = d.color || PALETTE[i % PALETTE.length];
        return (
          <span key={`${d.label}-${i}`} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {d.label} ({d.value})
          </span>
        );
      })}
    </div>
  );
}

export function LineChart({
  data,
  width = 520,
  height = 200,
}: {
  data: ChartDatum[];
  width?: number;
  height?: number;
}) {
  const pad = 34;
  const bottom = 28;
  const top = 16;
  const max = Math.max(1, ...data.map((d) => d.value));
  const n = data.length;
  const chartW = width - pad * 2;
  const chartH = height - top - bottom;
  const step = n > 1 ? chartW / (n - 1) : 0;
  const pts = data.map((d, i) => {
    const x = pad + step * i;
    const y = top + (chartH - (d.value / max) * chartH);
    return [x, y] as const;
  });

  if (pts.length === 0) return null;

  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`)
    .join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${height - bottom} L${pts[0][0]},${height - bottom} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <line
        x1={pad}
        y1={height - bottom}
        x2={width - pad}
        y2={height - bottom}
        stroke="var(--line)"
        strokeWidth="1"
      />
      <path d={area} fill="var(--accent)" opacity="0.12" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
      {pts.map((p, i) => (
        <g key={`${data[i].label}-${i}`}>
          <circle cx={p[0]} cy={p[1]} r="3.2" fill="var(--accent)" />
          <text
            x={p[0]}
            y={p[1] - 9}
            fontSize="10.5"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-body)"
          >
            {data[i].value}
          </text>
          <text
            x={p[0]}
            y={height - 8}
            fontSize="10"
            textAnchor="middle"
            fill="var(--ink-soft)"
            fontFamily="var(--font-body)"
          >
            {truncateLabel(data[i].label, 8)}
          </text>
        </g>
      ))}
    </svg>
  );
}
