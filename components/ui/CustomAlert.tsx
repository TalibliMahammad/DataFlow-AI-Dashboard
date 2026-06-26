"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";


export const CustomAlert = () => {
  const { alert, setAlert } = useAuthStore();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000); // 3 saniyə sonra itir
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl min-w-[300px] ${
            alert.type === "success" 
              ? "bg-green-500/10 border-green-500/20 text-green-500" 
              : "bg-red-500/10 border-red-500/20 text-red-500"
          } backdrop-blur-md`}
        >
          {alert.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-sm font-medium flex-1">{alert.message}</span>
          <button onClick={() => setAlert(null)} className="hover:opacity-70 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};