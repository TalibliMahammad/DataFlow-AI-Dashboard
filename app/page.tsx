"use client";

import {
  BarChart3,
  Calendar,
  Download,
  Menu,
  SettingsIcon,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import { MetricCard } from "@/components/MetricCard";
import { TrafficChart } from "@/components/traffic-chart";
import { ActivityTable } from "@/components/activity-table";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Main Content */}

      <main className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <header className=" bg-card border-b border-border sticky top-0 z-10 flex-shrink-0">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-between gap-3 sm:gap-4">
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="hidden lg:flex text-xs sm:text-sm text-muted-foreground mt-1">
                Welcome to your dashboard. 
              </p>
            </div>

            <div className="flex flex-wrap  items-center  gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">This Month</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm">
                <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="fixed top-8 sm:top-4  right-4 z-50 lg:hidden w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-lg"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6">
            <MetricCard
              title="Total Users"
              value="12,484"
              change={12.5}
              changeLabel="vs last month"
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              trend="up"
            />
            <MetricCard
              title="Revenue"
              value="$48,596"
              change={8.2}
              changeLabel="vs last month"
              icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
              trend="up"
            />
            <MetricCard
              title="Data Points"
              value="2.4M"
              change={3.1}
              changeLabel="vs last month"
              icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />}
              trend="down"
            />
            <MetricCard
              title="API Performance"
              value="98.6%"
              change={2.3}
              changeLabel="vs last month"
              icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
              trend="up"
            />
          </div>
          {/* charts and activity */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Traffic Chart */}
            <div className="lg:col-span-2">
              <TrafficChart />
            </div>

            {/* Activity Sidebar */}
            <div>
              <ActivityTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
