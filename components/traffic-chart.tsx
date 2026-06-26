'use client'

import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export function TrafficChart({ onUpdate }: { onUpdate: (data: any[]) => void }) {
  const [chartData, setChartData] = useState([
    { name: '10:00', value: 2800 },
    { name: '10:05', value: 3200 },
    { name: '10:10', value: 2900 },
    { name: '10:15', value: 3900 },
    { name: '10:20', value: 3490 },
    { name: '10:25', value: 4300 },
    { name: '10:30', value: 4100 },
    { name: '10:35', value: 4500 },
  ])

  // 2. Hər 5 saniyədən bir yeni nöqtə əlavə edən effekt
useEffect(() => {
  const interval = setInterval(() => {
    setChartData((prevData) => {
      // 1. Əvvəlcə sonuncu məlumatı götürürük (vaxtı hesablamaq üçün)
      const lastEntry = prevData[prevData.length - 1];
      
      // 2. Vaxtı parçalayırıq (məsələn: "10:35" -> hours: 10, minutes: 35)
      const timeParts = lastEntry.name.split(':');
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      
      // 3. Yeni vaxtı təyin edirik (+5 dəqiqə)
      let newMinutes = minutes + 5;
      let newHours = hours;
      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours = (hours + 1) % 24;
      }
      
      // BURADA TƏYİN OLUNDU: newTime
      const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

      // 4. Yeni rəqəmi təyin edirik (son rəqəmin ətrafında təsadüfi)
      // BURADA TƏYİN OLUNDU: newValue
      const newValue = Math.floor(Math.max(1000, Math.min(6000, lastEntry.value + (Math.random() * 800 - 400))));

      // 5. İndi newData artıq bu dəyişənləri tanıyacaq
      const newData = [...prevData.slice(1), { name: newTime, value: newValue }];
      
      // Dashboard-u (və bota gedən datanı) yeniləyirik
      if (onUpdate) onUpdate(newData);

      return newData;
    });
  }, 5000);

  return () => clearInterval(interval);
}, [onUpdate]);
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Live Data Traffic</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time network ingestion
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1000} // Keçidlərin yumşaq olması üçün
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}