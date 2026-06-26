"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function Chatbot({ metrics, chartData} : {metrics: any[], chartData:any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading]= useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Salam! Sizə bu gün necə kömək edə bilərəm?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Avtomatik aşağı skrol
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
const handleSend = async () => {
    if (!input.trim() || loading) return;

    // İstifadəçinin mesajını ekrana basırıq
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    const currentInput = input;
    setInput("");
    setLoading(true);

    // 2. STATİK MƏTNİ SİLİB, CANLI KONTEKSTİ YARADIRIQ
    const metricsTxt = metrics.map(m => 
      `${m.title}: ${m.prefix || ""}${m.value}${m.suffix || ""} (${m.trend === 'up' ? '+' : '-'}${m.change}%)`
    ).join(", ");
    
    const recentChart = chartData.slice(-3).map(d => `${d.name}-da ${d.value} vahid`).join(", ");

    const fullContext = `
      Dashboard-un anlıq metrikləri: ${metricsTxt}.
      Trafik qrafikinin son hərəkəti: ${recentChart}.
      İstifadəçi sualı: ${currentInput}
      Təlimat: Sən Data-Flow-un analitiksən. Bu rəqəmləri analiz et.
    `;
  
    try {
      // 3. API YOLUNU DÜZGÜN YAZIN (Next.js-də /api/chat formatında olur)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: currentInput, 
          context: fullContext 
        })
      });

      const data = await response.json();
      
      if (data.text) {
        setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
      } else {
        throw new Error("Cavab alınmadı");
      }  
    } catch (error) {
      console.log("Xəta:", error);
      setMessages((prev) => [...prev, { role: "ai", text: "Bağlantı xətası baş verdi." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="fixed bottom-10   right-5  md:right-15 z-[9999] flex items-end justify-end pointer-events-none">
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          width: isFullScreen ? "min(80vw, 900px)" : "370px",
          height: isFullScreen ? "80vh" : "600px"
        }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        /* Rənglərin əzilməməsi üçün bg-card və border-border istifadə edirik */
        className="bg-card/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] flex flex-col overflow-hidden pointer-events-auto mb-6"
      >
        {/* HEADER - Daha müasir və təmiz */}
        <div className="p-5 border-b border-white/5 bg-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-2.5 bg-primary/20 rounded-2xl border border-primary/30">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Data-Flow AI</h3>
              <p className="text-[11px] text-muted-foreground">İntellektual köməkçi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 text-muted-foreground" onClick={() => setIsFullScreen(!isFullScreen)}>
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* MESSAGES AREA - No-scrollbar və Gradient Background */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar bg-gradient-to-b from-transparent to-white/[0.02]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                  msg.role === "user" ? "bg-primary border-primary/50" : "bg-white/10 border-white/10"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-3.5 rounded-[18px] text-[13.5px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-white/5 border border-white/10 text-foreground rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA - Yüksək keyfiyyətli input dizaynı */}
        <div className="p-5 border-t border-white/5 bg-white/[0.10]">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-5 pr-14 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1.5 p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3">
             <Sparkles className="w-3 h-3 text-primary/60" />
             <p className="text-[10px] text-muted-foreground tracking-wide">AI-powered by Data-Flow</p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* TOGGLE BUTTON - Daha estetik */}
  {!isOpen && (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="w-16 h-16 bg-primary text-primary-foreground rounded-[22px] shadow-[0_15px_30px_rgba(var(--primary),0.3)] flex items-center justify-center pointer-events-auto relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <Sparkles className="w-7 h-7" />
    </motion.button>
  )}
</div>
  );
}