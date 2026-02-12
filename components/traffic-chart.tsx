'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Jan 1', value: 2800, fill: '#3b82f6' },
  { name: 'Jan 8', value: 3200, fill: '#3b82f6' },
  { name: 'Jan 15', value: 2900, fill: '#3b82f6' },
  { name: 'Jan 22', value: 3900, fill: '#3b82f6' },
  { name: 'Feb 5', value: 3490, fill: '#3b82f6' },
  { name: 'Feb 12', value: 4300, fill: '#3b82f6' },
  { name: 'Feb 19', value: 4100, fill: '#3b82f6' },
  { name: 'Feb 26', value: 4500, fill: '#3b82f6' },
  { name: 'Mar 5', value: 4200, fill: '#3b82f6' },
  { name: 'Mar 12', value: 5000, fill: '#3b82f6' },
  { name: 'Mar 19', value: 4800, fill: '#3b82f6' },
  { name: 'Mar 26', value: 5200, fill: '#3b82f6' },
]

export function TrafficChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Data Traffic</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Real-time data ingestion over time
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '11px' }}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '11px' }}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
