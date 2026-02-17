"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askAI } from "@/lib/api";

export default function AdminChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([{ role: "ai", text: "Aegis Intelligence online. System ready for metrics query." }]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // FIXED: Only scroll if it's a real interaction, not initial load
    if (scrollRef.current && messages.length > 1) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const newMsgs = [...messages, { role: "user", text: query }];
    setMessages(newMsgs);
    setQuery("");
    setLoading(true);
    try {
      const data = await askAI(query);
      setMessages([...newMsgs, { role: "ai", text: data.answer || "Processing request..." }]);
    } catch (e) {
      setMessages([...newMsgs, { role: "ai", text: "AI Latency detected (503). Recalibrating link..." }]);
    } finally { setLoading(false); }
  };

  return (
    <Card className="h-[500px] flex flex-col shadow-2xl border-slate-800 bg-[#0f0f11] text-slate-200 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="bg-[#16161a] border-b border-slate-800 py-4"><CardTitle className="text-xs font-black flex items-center gap-2 text-indigo-400 uppercase tracking-widest"><Sparkles size={16} className="animate-pulse" /> Intelligence Copilot</CardTitle></CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <ScrollArea className="flex-1 p-6"><div className="space-y-5">{messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-[1.5rem] text-[13px] leading-relaxed tracking-tight ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>{m.text}</div></div>))}{loading && <div className="flex justify-start"><div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex gap-1"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" /></div></div>}<div ref={scrollRef} /></div></ScrollArea>
        <div className="p-5 border-t border-slate-800 bg-[#16161a] flex gap-2"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Query revenue/stock..." className="bg-black/50 border-slate-800 text-xs h-11 focus:ring-1 focus:ring-indigo-500 rounded-xl" onKeyDown={(e) => e.key === "Enter" && handleSend()} /><Button onClick={handleSend} disabled={loading} size="icon" className="bg-indigo-600 hover:bg-indigo-700 shrink-0 h-11 w-11 rounded-xl"><Send size={16} /></Button></div>
      </CardContent>
    </Card>
  );
}