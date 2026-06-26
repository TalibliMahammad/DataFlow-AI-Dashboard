"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { 
  Play, ShieldCheck, Database, GitBranch, 
  Users, DollarSign, Clock, Zap, TrendingUp 
} from "lucide-react";

// Nümunəvi qrafik datası
const data = [
  { time: "00:00", cost: 12, users: 400, timeSpent: 20 },
  { time: "06:00", cost: 25, users: 800, timeSpent: 45 },
  { time: "12:00", cost: 80, users: 2200, timeSpent: 120 },
  { time: "18:00", cost: 60, users: 1800, timeSpent: 90 },
];

export default function AnalyticsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. Üst Kontrol Paneli */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Revenue", val: "$4,290", icon: DollarSign, color: "text-emerald-500" },
              { title: "Active Users", val: "12.4k", icon: Users, color: "text-blue-500" },
              { title: "Avg Session", val: "14.2m", icon: Clock, color: "text-purple-500" },
              { title: "System Load", val: "68%", icon: Zap, color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
                <div className={`p-3 bg-secondary rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">{stat.title}</p>
                  <p className="text-xl font-bold text-foreground">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Əsas Analitika Qrafiki */}
          <div className="bg-card border border-border p-6 rounded-2xl h-[350px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-foreground">Usage & Revenue Trends</h3>
                <p className="text-xs text-muted-foreground">Real-time performance analytics</p>
              </div>
              <div className="flex gap-2">
                 <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs">Revenue</button>
                 <button className="bg-secondary px-3 py-1 rounded text-xs">Users</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))"/>
                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))"/>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="cost" stroke="#3b82f6" fill="url(#colorVal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 3. Action Panel & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border p-6 rounded-2xl">
              <h3 className="font-bold text-foreground mb-4">Pipeline Execution</h3>
              <div className="space-y-4">
                {["Inference Pipeline", "Vector Indexer", "Auth Service"].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-4 h-4 text-primary" />
                      <span className="text-sm">{p}</span>
                    </div>
                    <span className="text-xs text-emerald-500 font-mono">Running (0.4s)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl">
              <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium mb-3">
                <Play className="w-4 h-4" /> Deploy Model
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-secondary py-3 rounded-xl font-medium">
                <ShieldCheck className="w-4 h-4" /> Run Security Audit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}