"use client";

import { TrafficChart } from "@/components/traffic-chart";
import { ActivityTable } from "@/components/activity-table";
import { Sidebar } from "@/components/sidebar";
import { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import MetricsGrid from "@/components/MetricsGrid";
import { useAuthStore } from "@/store/useAuthStore";
import Chatbot from "@/components/chatbot";
import { CustomAlert } from "@/components/ui/CustomAlert";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const setAlert = useAuthStore((state) => state.setAlert);
  const [liveMetrics, setLiveMetrics] = useState<any[]>([]);
  const [liveChart, setLiveChart] = useState<any[]>([]);


 const handleMetricsUpdate = useCallback((data: any[]) => {
  // setTimeout ilə render dövründən çıxarırıq
  setTimeout(() => {
    setLiveMetrics(data);
  }, 0);
}, []);

const handleChartUpdate = useCallback((data: any[]) => {
  // setTimeout ilə render dövründən çıxarırıq
  setTimeout(() => {
    setLiveChart(data);
  }, 0);
}, []);

  useEffect(() => {
    setAlert({ message: "Welcome back", type: "success" });
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }, [setAlert]);

  return (
    <>
      <CustomAlert />
      <Chatbot metrics={liveMetrics} chartData={liveChart} />
      
      <div className="flex h-screen bg-background flex-col lg:flex-row">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 overflow-y-auto p-3 no-scrollbar sm:p-4 lg:p-6">
            <MetricsGrid onUpdate={handleMetricsUpdate} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2">
                <TrafficChart onUpdate={handleChartUpdate} />
              </div>
              <div>
                <ActivityTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}