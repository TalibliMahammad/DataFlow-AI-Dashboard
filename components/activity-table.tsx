"use client";

import { log } from "console";
import { div } from "framer-motion/client";
import {
  UserPlus,
  Database,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useMemo } from "react";

interface Activity {
  id: string;
  type: "user" | "database" | "config" | "error" | "success";
  title: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "user",
    title: "New user registered",
    description: "Mahammad Talibli signed up",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "database",
    title: "Database sync completed",
    description: "Synchronized 1,234 records",
    timestamp: "5 min ago",
  },
  {
    id: "3",
    type: "success",
    title: "Integration successful",
    description: "Stripe API integration verified",
    timestamp: "15 min ago",
  },
  {
    id: "4",
    type: "config",
    title: "Configuration updated",
    description: "API rate limits adjusted",
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    type: "error",
    title: "Warning: High latency",
    description: "Database query took 2.3s",
    timestamp: "2 hours ago",
  },
];

function getActivityIcon(type: Activity["type"]) {
  switch (type) {
    case "user":
      return <UserPlus className="w-4 h-4 " />;
    case "database":
      return <Database className="w-4 h-4 " />;
    case "config":
      return <Settings className="w-4 h-4" />;
    case "error":
      return <AlertCircle className="w-4 h-4" />;
    case "success":
      return <CheckCircle className="w-4 h-4" />;
  }
}

function getActivityColor(type: Activity["type"]) {
  switch (type) {
    case "user":
      return "bg-blue-500/10 text-blue-500";
    case "database":
      return "bg-purple-500/10 text-purple-500";
    case "config":
      return "bg-amber-500/10 text-amber-500";
    case "error":
      return "bg-red-500/10 text-red-500";
    case "success":
      return "bg-green-500/10 text-green-500";
  }
}

export function ActivityTable() {
  const sortedActivities = useMemo(() => {
    return [...activities];
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent Activities</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Latest events and updates from your analytics platform
        </p>
      </div>

      {/* Icons */}
      <div className="space-y-2 sm:space-y-3">
        {sortedActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors duration-300 border border-border/50"
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>

            {/* content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 sm:mt-6 py-2 px-4 rounded-lg text-xs sm:text-sm font-medium text-primary hover:bg-primary/10 transition-colors duration-100 border border-primary/20">
        View All Activity
      </button>
    </div>
  ); 
}
