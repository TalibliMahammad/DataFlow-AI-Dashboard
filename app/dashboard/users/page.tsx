"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import { 
  Trash2, ShieldCheck, UserCog, Plus, X, User, ChevronDown, CheckCircle2, XCircle
} from "lucide-react";

type UserRole = "Super Admin" | "Admin" | "Editor" | "Viewer";
type UserStatus = "Active" | "Inactive";

interface User {
  id: number;
  name: string;
  role: UserRole;
  status: UserStatus;
}

const INITIAL_USERS: User[] = [
  { id: 1, name: "Mahammad Talibli", role: "Super Admin", status: "Active" },
  { id: 2, name: "Vefa Talibli", role: "Admin", status: "Active" },
];

export default function UsersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ name: "", role: "Viewer" as UserRole });

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setUsers([...users, { id: Date.now(), ...formData, status: "Active" }]);
    setFormData({ name: "", role: "Viewer" });
    setIsModalOpen(false);
  };

  const deleteUser = (id: number) => setUsers(users.filter((u) => u.id !== id));
  
  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  const changeRole = (id: number, role: UserRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Team Members</h1>
              <p className="text-sm text-muted-foreground">Manage your team and their access levels.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90">
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/20">
                    <td className="py-4 px-6 font-medium">{user.name}</td>
                    <td className="py-4 px-6">
                      <select 
                        value={user.role} 
                        onChange={(e) => changeRole(user.id, e.target.value as UserRole)}
                        className="bg-transparent border border-border rounded px-2 py-1 text-sm outline-none cursor-pointer"
                      >
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 cursor-pointer" onClick={() => toggleStatus(user.id)}>
                      {user.status === "Active" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => deleteUser(user.id)} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-50">
            <form onSubmit={addUser} className="bg-card border border-border p-6 rounded-2xl w-96 space-y-4">
              <h2 className="font-bold text-lg">Add Team Member</h2>
              <input 
                autoFocus required
                className="w-full bg-secondary p-3 rounded-lg outline-none border border-border"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <select 
                className="w-full bg-secondary p-3 rounded-lg outline-none border border-border"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              >
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg bg-secondary">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-bold">Add</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}