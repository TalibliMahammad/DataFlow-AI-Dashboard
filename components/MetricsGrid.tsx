import React, { useEffect, useState } from "react";
import { MetricCard } from "./MetricCard";
import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";


const MetricsGrid = ({ onUpdate }: { onUpdate: (data: any[]) => void }) => {
  const ICON_MAP = {
    users: <Users className="w-5 h-5  sm:w-6 sm:6" />,
    revenue: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
    data: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
    performance: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
  };
  const [metrics, setMetrics] = useState([
    {
      id: 1,
      title: "Total Users",
      value: 12484,
      change: 12.5,
      trend: "up",
      iconKey: "users",
      prefix: "",
      suffix: "",
    },
    {
      id: 2,
      title: "Revenue",
      value: 48596,
      change: 8.2,
      trend: "up",
      iconKey: "revenue",
      prefix: "$",
      suffix: "",
    },
    {
      id: 3,
      title: "Data Points",
      value: 2.4,
      change: 3.1,
      trend: "down",
      iconKey: "data",
      prefix: "",
      suffix: "M",
    },
    {
      id: 4,
      title: "API Performance",
      value: 98.6,
      change: 2.3,
      trend: "up",
      iconKey: "performance",
      prefix: "",
      suffix: "%",
    },
  ]);

useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        // Əvvəlcə yeni datanı hesablayıb sabitə yığırıq
        const updatedMetrics = prev.map(m => {
          const valueMovement = (Math.random() * 0.02) - 0.01;
          let newValue = m.value + (m.value * valueMovement);

          const changeMovement = (Math.random() * 0.4) - 0.2;
          let newChange = m.change + changeMovement;
          const newTrend = newChange >= 0 ? "up" : "down";

          if (m.id === 3 || m.id === 4) {
            newValue = parseFloat(newValue.toFixed(2));
          } else {
            newValue = Math.floor(newValue);
          }

          return { 
            ...m, 
            value: newValue, 
            change: parseFloat(Math.abs(newChange).toFixed(1)),
            trend: newTrend 
          };
        });

        // 2. SEHR BURADADIR: Hesablanmış datanı Dashboard-a (və bota) göndər
        if (onUpdate) {
          onUpdate(updatedMetrics);
        }

        return updatedMetrics; // Ekranda rəqəmləri yenilə
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [onUpdate]); // onUpdate-i asılılığa əlavə etdik

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6 mt-10">
      {metrics.map((m) => (
        <MetricCard
          key={m.id}
          title={m.title}
          value={`${m.prefix}${m.value.toLocaleString()}${m.suffix}`}
          change={m.change}
          changeLabel="vs last month"
          trend={m.trend as "up" | "down"}
          icon={ICON_MAP[m.iconKey as keyof typeof ICON_MAP]}
        />
      ))}
  
    </div>
  );
};

export default MetricsGrid;
