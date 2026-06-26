"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { CreditCard, Zap, CheckCircle2, History, AlertCircle } from "lucide-react";

export default function BillingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your plan, payment methods and invoices.</p>
          </div>

          {/* Current Plan Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">Next billing date: July 26, 2026</p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
              </div>
              <div className="flex gap-4">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold">Manage Subscription</button>
                <button className="bg-secondary px-4 py-2 rounded-xl text-sm font-medium">Cancel Plan</button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-blue-500" />
                <h3 className="font-bold">Payment Method</h3>
              </div>
              <p className="text-sm">Visa ending in 4242</p>
              <button className="text-xs text-blue-500 mt-2 hover:underline">Update card details</button>
            </div>
          </div>

          {/* Usage Meter */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-4">Current Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Requests</span>
                  <span className="font-bold">85,200 / 100,000</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice History */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border font-bold">Invoice History</div>
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/30 text-muted-foreground">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { date: "Jun 26, 2026", amt: "$99.00", status: "Paid" },
                  { date: "May 26, 2026", amt: "$99.00", status: "Paid" },
                ].map((inv, i) => (
                  <tr key={i}>
                    <td className="p-4">{inv.date}</td>
                    <td className="p-4">{inv.amt}</td>
                    <td className="p-4 text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/>{inv.status}</td>
                    <td className="p-4"><button className="text-blue-500 hover:underline">PDF</button></td>
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