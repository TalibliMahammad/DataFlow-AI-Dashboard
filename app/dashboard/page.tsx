"use client";

import { MetricCard } from "@/components/MetricCard";
import { TrafficChart } from "@/components/traffic-chart";
import { ActivityTable } from "@/components/activity-table";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { CustomAlert } from "@/components/ui/CustomAlert";
import Header from "@/components/header";
import MetricsGrid from "@/components/MetricsGrid";
import { useAuthStore } from "@/store/useAuthStore";


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const setAlert = useAuthStore((state)=>state.setAlert)


useEffect(()=>{
   setAlert({ message: "Welcome back", type: "success" });

   const timer = setTimeout(()=>{
    setAlert(null)
  
   },3000)
     return()=>clearTimeout(timer)
})


  return (
    <>
      <CustomAlert />
        <div className="flex h-screen bg-background  flex-col lg:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden  ">
            <Header />
            <div className="flex-1 overflow-y-auto p-3  no-scrollbar sm:p-4 lg:p-6">
            <MetricsGrid />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2">
                  <TrafficChart />
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
