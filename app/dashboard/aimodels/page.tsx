"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { Brain, DollarSign, Activity, Zap, BarChart2, CheckCircle2 } from "lucide-react";

interface AIModel {
  id: number;
  name: string;
  version: string;
  pricePerK: number; // 1k token qiyməti
  usage: number; // K token
  status: "Active" | "Maintenance";
}

export default function AIModelsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState<AIModel[]>([
    { id: 1, name: "GPT-4o", version: "v2.4", pricePerK: 0.05, usage: 12400, status: "Active" },
    { id: 2, name: "Claude 3.5 Sonnet", version: "v1.2", pricePerK: 0.03, usage: 8500, status: "Active" },
    { id: 3, name: "Llama 3 (Self-hosted)", version: "v3.0", pricePerK: 0.005, usage: 45000, status: "Maintenance" },
  ]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">AI Model Registry</h1>
              <p className="text-muted-foreground">Monitor performance, costs, and token consumption.</p>
            </div>
            <div className="bg-card border p-4 rounded-2xl flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Daily Cost</p>
                <h3 className="text-xl font-bold text-emerald-500">$84.20</h3>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Total Tokens</p>
                <h3 className="text-xl font-bold text-blue-500">65.9K</h3>
              </div>
            </div>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div key={model.id} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-secondary rounded-xl">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${model.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {model.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold">{model.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">Version: {model.version}</p>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per 1k</span>
                    <span className="font-bold">${model.pricePerK}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token Usage</span>
                    <span className="font-bold">{model.usage.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-bold text-primary">Daily Cost: ${(model.pricePerK * (model.usage / 1000)).toFixed(2)}</span>
                    <button className="text-xs bg-secondary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">Configure</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Analytics */}
          <div className="bg-card border border-border p-6 rounded-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart2 className="w-5 h-5"/> Usage Trends</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                <div key={day} className="bg-secondary/50 p-4 rounded-xl text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">{day}</p>
                  <p className="text-lg font-bold">{(Math.random() * 20).toFixed(1)}K</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}