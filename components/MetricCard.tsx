import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: ReactNode;
  trend: "up" | "down";
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
}: MetricCardProps) {
  const isPositive = trend === "up";

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-200">
      {/* Header with Icon and Title */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>

      {/* Change Indicator */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
        <span className="text-xs text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  );
}
