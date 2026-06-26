"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { Key, Shield, Trash2, Plus, Copy, X, Edit2, Check } from "lucide-react";

interface ApiKey {
  id: number;
  name: string;
  key: string;
  usage: number;
  status: "Active" | "Revoked";
}

export default function ApiManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: 1, name: "Production Gateway", key: "sk_live_51P...aX2", usage: 85, status: "Active" },
  ]);

  // Modal üçün state-lər
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");

  const createKey = () => {
    if (!newKeyName) return;
    const newKey: ApiKey = {
      id: Date.now(),
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(7)}...`,
      usage: 0,
      status: "Active",
    };
    setKeys([...keys, newKey]);
    setIsModalOpen(false);
    setNewKeyName("");
  };

  const renameKey = (id: number) => {
    setKeys(keys.map(k => k.id === id ? { ...k, name: tempName } : k));
    setEditingId(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 p-8 overflow-y-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">API Management</h1>
              <p className="text-muted-foreground">Manage your secret keys and endpoint security.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold flex items-center gap-2">
              <Plus className="w-4 h-4" /> New API Key
            </button>
          </div>

          {/* Table View */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-secondary/30 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-4">Key Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Usage</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {keys.map((api) => (
                  <tr key={api.id} className="hover:bg-secondary/20">
                    <td className="p-4">
                      {editingId === api.id ? (
                        <div className="flex items-center gap-2">
                          <input className="bg-background border rounded px-2 py-1" value={tempName} onChange={(e) => setTempName(e.target.value)} />
                          <button onClick={() => renameKey(api.id)}><Check className="w-4 h-4 text-emerald-500" /></button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{api.name}</span>
                          <button onClick={() => { setEditingId(api.id); setTempName(api.name); }}><Edit2 className="w-3 h-3 text-muted-foreground" /></button>
                        </div>
                      )}
                      <p className="font-mono text-[10px] text-muted-foreground">{api.key}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${api.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>{api.status}</span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${api.usage}%` }} /></div>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button className="p-2 hover:bg-secondary rounded-lg"><Copy className="w-4 h-4" /></button>
                      <button onClick={() => setKeys(keys.filter(k => k.id !== api.id))} className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-2xl w-96 border border-border">
              <h3 className="font-bold mb-4">Create New API Key</h3>
              <input 
                placeholder="Name your key (e.g., Production)"
                className="w-full bg-secondary p-3 rounded-lg outline-none mb-4"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-secondary rounded-lg">Cancel</button>
                <button onClick={createKey} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-bold">Create</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}