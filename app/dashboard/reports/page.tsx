"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar, RefreshCcw, FileText, ChevronDown, Download } from "lucide-react";

// Məlumat generatoru
const getDynamicData = () => ({
  stats: [
    { label: "Revenue", val: `$${Math.floor(Math.random() * 90000) + 10000}`, trend: "+14%" },
    { label: "Active Users", val: Math.floor(Math.random() * 5000) + 1000, trend: "+5%" },
    { label: "System Load", val: `${Math.floor(Math.random() * 90) + 10}%`, trend: "-2%" },
    { label: "Avg Latency", val: `${Math.floor(Math.random() * 100) + 50}ms`, trend: "-10%" },
  ],
  charts: Array.from({ length: 7 }, (_, i) => ({ 
    name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], 
    val: Math.floor(Math.random() * 5000) + 1000 
  }))
});

export default function ReportsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(getDynamicData());
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-06-26");

  const performSync = () => {
    setLoading(true);
    setTimeout(() => {
      setData(getDynamicData());
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* 1. Təqvim və Sync İdarəetməsi */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-card p-6 rounded-2xl border border-border">
            <div>
              <h2 className="text-2xl font-bold">Comprehensive Reports</h2>
              <p className="text-sm text-muted-foreground">Analysis for: {selectedDate}</p>
            </div>
            <div className="flex gap-3">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-secondary px-4 py-2 rounded-xl text-sm border border-border"
              />
              <button onClick={performSync} className={`flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold ${loading ? 'opacity-50' : ''}`}>
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sync Data
              </button>
            </div>
          </div>

          {/* 2. Statistik Kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.stats.map((s, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border">
                <p className="text-xs text-muted-foreground uppercase">{s.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-xl font-bold">{s.val}</h3>
                  <span className="text-emerald-500 text-xs font-bold">{s.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Əsas Hesabatlar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h3 className="font-bold mb-6">Engagement Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.charts}>
                  <XAxis dataKey="name" hide />
                  <Tooltip contentStyle={{background:'var(--card)'}}/>
                  <Area dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h3 className="font-bold mb-6">Operations Volume</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.charts}>
                  <XAxis dataKey="name" hide />
                  <Bar dataKey="val" fill="#8b5cf6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Alt Hesabat Cədvəli (Zəngin UI) */}
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5"/> Detailed Breakdown</h3>
            <table className="w-full text-left text-sm">
              <thead className="text-muted-foreground border-b border-border">
                <tr>{["Category", "Volume", "Status", "Report"].map(h => <th key={h} className="pb-4">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {["Inference", "Storage", "Network", "Auth"].map((cat, i) => (
                  <tr key={i} className="hover:bg-secondary/20">
                    <td className="py-4 font-medium">{cat}</td>
                    <td className="py-4">{Math.floor(Math.random() * 500)} units</td>
                    <td className="py-4 text-emerald-500">Optimized</td>
                    <td className="py-4"><button className="text-primary hover:underline">Download PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}