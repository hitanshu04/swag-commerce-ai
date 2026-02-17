"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { ShoppingCart, LayoutDashboard, Package, Send, Sparkles, X, CheckCircle, Download, User, Info, Star, Ticket, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from 'html2canvas';

const API_BASE = "https://supreme-space-giggle-v6vw5gq4qwp5hpwg7-5000.app.github.dev";

// --- COMPONENTS ---
const ProductModal = ({ product, isOpen, onClose, onAdd }: any) => {
  if (!isOpen || !product) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"><X size={20}/></button>
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 bg-gray-900 h-64 md:h-auto"><img src={product.image} className="w-full h-full object-cover" /></div>
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{product.category}</span>
            <h2 className="text-2xl font-black text-white mt-2 mb-2">{product.name}</h2>
            <div className="flex items-center gap-1 mb-4"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-slate-500 text-xs ml-2">(4.9/5 verified)</span></div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{product.description}</p>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 mb-6">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Bulk Pricing</p>
                <p className="text-xs text-slate-300">Buy bulk units to save up to 10% instantly.</p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-auto">
               <span className="text-3xl font-mono font-bold text-white">${product.price}</span>
               <Button onClick={() => { onAdd(product); onClose(); }} className="bg-white text-black hover:bg-slate-200 font-bold px-6 py-4 rounded-xl uppercase">Add To Cart</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ReceiptModal = ({ isOpen, onClose, data }: any) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const link = document.createElement('a'); link.download = `Receipt-${data.orderId.slice(-6)}.png`; link.href = canvas.toDataURL(); link.click(); toast.success("Downloaded");
    }
  };
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-white text-black w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div ref={receiptRef} className="p-0">
            <div className="bg-black p-6 text-center border-b-4 border-indigo-600"><h2 className="text-xl font-black text-white italic">AEGIS COMMERCE</h2><p className="text-gray-400 text-[10px] uppercase">Transaction Verified</p></div>
            <div className="p-8 space-y-6">
                <div className="flex justify-between"><div><p className="text-xs text-gray-500 font-bold">BILLED TO</p><p className="font-bold text-sm">{data.email}</p></div><div className="text-right"><p className="text-xs text-gray-500 font-bold">ORDER ID</p><p className="font-mono font-bold">#{data.orderId.slice(-6).toUpperCase()}</p></div></div>
                <div className="space-y-2 border-t border-b border-gray-100 py-4">{data.cart.map((item: any, i: number) => (<div key={i} className="flex justify-between text-xs"><span className="text-gray-700">{item.name}</span><span className="font-bold">${item.price}</span></div>))}</div>
                <div className="text-right space-y-1"><p className="text-xs text-gray-500">Subtotal: ${data.subtotal.toFixed(2)}</p>{data.discount > 0 && <p className="text-xs text-green-600 font-bold">Discount: -${data.discount.toFixed(2)}</p>}<p className="text-2xl font-black pt-2">Total Paid: ${data.total.toFixed(2)}</p></div>
            </div>
        </div>
        <div className="flex gap-3 p-6 pt-0 justify-center">
            <Button onClick={onClose} variant="secondary" className="bg-gray-100 rounded-xl h-12">Close</Button>
            <Button onClick={handleDownload} className="bg-indigo-600 text-white rounded-xl h-12 font-bold"><Download size={16} className="mr-2"/> Save Receipt</Button>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onAdd, onClick }: any) => (
  <div onClick={() => onClick(product)} className="bg-[#111] border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all group cursor-pointer shadow-xl">
    <div className="h-56 overflow-hidden relative bg-gray-900"><img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-bold flex gap-1 items-center"><Info size={10}/> DETAILS</div></div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{product.name}</h3><span className="text-slate-200 font-mono font-bold">${product.price}</span></div>
      <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-1">Premium dev swag. Enterprise grade quality.</p>
      <Button onClick={(e) => { e.stopPropagation(); onAdd(product); }} className="w-full bg-slate-800 hover:bg-white hover:text-black font-bold text-[10px] py-6 rounded-xl">QUICK ADD</Button>
    </div>
  </div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("store");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [chatLog, setChatLog] = useState<{role: string, text: string}[]>([{role: 'ai', text: "Aegis Agent Online. Ready to analyze sales data."}]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    let sid = localStorage.getItem("aegis_sid");
    if(!sid) { sid = "S-"+Math.random().toString(36).substr(2,6).toUpperCase(); localStorage.setItem("aegis_sid", sid); }
    setSessionId(sid);
    fetch(`${API_BASE}/api/products`).then(res => res.json()).then(setProducts).catch(() => toast.error("Offline"));
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const finalTotal = Math.max(0, subtotal - (discountData?.discountAmount || 0));

  const validateCoupon = async () => {
    if (!coupon) return;
    try {
      const res = await fetch(`${API_BASE}/api/coupons/validate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: coupon, cartTotal: subtotal })
      });
      const data = await res.json();
      if (data.valid) { setDiscountData({ discountAmount: data.discountAmount, code: coupon }); toast.success("Coupon Applied!"); } 
      else { toast.error(data.message || "Invalid Code"); setDiscountData(null); }
    } catch(e) { toast.error("Validation Error"); }
  };

  const placeOrder = async () => {
    if (!email.includes('@')) return toast.error("Enter billing email");
    if (cart.length === 0) return toast.error("Cart is empty");
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, couponCode: discountData?.code, customerEmail: email, discount: discountData?.discountAmount })
      });
      const data = await res.json();
      if (res.ok) {
        setReceiptData({ orderId: data.orderId, email, cart: [...cart], subtotal, discount: discountData?.discountAmount || 0, total: finalTotal });
        setCart([]); setDiscountData(null); setCoupon(""); 
        fetch(`${API_BASE}/api/products`).then(res => res.json()).then(setProducts);
      } else { toast.error(data.error || "Failed"); }
    } catch(e) { toast.error("Processing Error"); }
  };

  const askAI = async () => {
    if (!chatQuery) return;
    const newLog = [...chatLog, { role: 'user', text: chatQuery }];
    setChatLog(newLog); setChatQuery(""); setAiLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: chatQuery, contextCart: cart }) 
      });
      const data = await res.json();
      setChatLog([...newLog, { role: 'ai', text: data.answer }]);
    } catch (e) { setChatLog([...newLog, { role: 'ai', text: "Agent offline." }]); } 
    finally { setAiLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 flex flex-col lg:flex-row">
      <Toaster position="top-right" richColors />
      <ReceiptModal isOpen={!!receiptData} onClose={() => setReceiptData(null)} data={receiptData} />
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={(p: any) => setCart([...cart, p])} />

      <aside className="w-full lg:w-72 border-r border-slate-800 bg-[#050505] p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-10 pl-2"><div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white italic text-xl">A</div><h1 className="font-black text-2xl tracking-tighter text-white">AEGIS<span className="text-indigo-500 text-xs align-top ml-1">PRO</span></h1></div>
        <nav className="flex lg:flex-col gap-3">
          <Button variant="ghost" onClick={() => setActiveTab('store')} className={`justify-start h-12 uppercase font-bold rounded-xl ${activeTab === 'store' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-900'}`}><Package className="mr-3 h-4 w-4" /> Market</Button>
          <Button variant="ghost" onClick={() => setActiveTab('admin')} className={`justify-start h-12 uppercase font-bold rounded-xl ${activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-900'}`}><LayoutDashboard className="mr-3 h-4 w-4" /> Agent AI</Button>
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto h-screen">
        {activeTab === 'store' ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2 space-y-8">
              <header className="mb-10"><h2 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter">Marketplace</h2><p className="text-slate-500 text-sm italic pl-4 border-l-2 border-indigo-600 font-mono">Session: {sessionId}</p></header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{products.map((p: any) => <ProductCard key={p._id} product={p} onAdd={(item: any) => setCart([...cart, item])} onClick={setSelectedProduct} />)}</div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-[2rem] p-8 sticky top-8 shadow-2xl">
                <h3 className="text-xl font-black text-white mb-6 uppercase flex items-center gap-3"><ShoppingCart className="h-5 w-5 text-indigo-500"/> Checkout</h3>
                <div className="space-y-3 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.length === 0 && <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-3xl text-[10px] font-black uppercase text-slate-700 tracking-[0.2em]">Cart Empty</div>}
                  {cart.map((item, i) => (<div key={i} className="flex justify-between items-center p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 text-sm group hover:border-red-900/50 transition-colors"><div className="flex items-center gap-3"><button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-slate-600 hover:text-red-500"><Trash2 size={14} /></button><span className="text-slate-300 font-bold">{item.name}</span></div><span className="font-mono text-indigo-400 font-bold">${item.price}</span></div>))}
                </div>
                
                <div className="border-t border-slate-800 pt-6 space-y-5">
                  <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-xl space-y-2">
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2"><Ticket size={12}/> Test Promo Codes</p>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setCoupon("FREE100")} className="text-[9px] bg-black/50 border border-indigo-500/50 px-2 py-1 rounded font-mono text-white hover:bg-indigo-500">FREE100</button>
                        <button onClick={() => setCoupon("WELCOME20")} className="text-[9px] bg-black/50 border border-indigo-500/50 px-2 py-1 rounded font-mono text-white hover:bg-indigo-500">WELCOME20</button>
                        <button onClick={() => setCoupon("EXPIRED50")} className="text-[9px] bg-black/50 border border-red-500/50 px-2 py-1 rounded font-mono text-red-400 hover:bg-red-500 hover:text-white">EXPIRED50 (Test Case)</button>
                    </div>
                  </div>
                  <Input placeholder="Receipt Email..." value={email} onChange={e => setEmail(e.target.value)} className="bg-black border-slate-800 h-12 text-sm rounded-xl" />
                  <div className="flex gap-2"><Input placeholder="PROMO CODE" value={coupon} onChange={e => setCoupon(e.target.value)} className="uppercase bg-black border-slate-800 h-12 text-sm font-mono rounded-xl" /><Button onClick={validateCoupon} className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-xl font-bold uppercase text-xs">Apply</Button></div>
                  <div className="space-y-3 text-sm pt-4"><div className="flex justify-between text-slate-500 font-bold uppercase text-xs tracking-widest"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>{discountData && <div className="flex justify-between text-green-500 font-black text-xs tracking-widest bg-green-900/10 p-2 rounded-lg"><span>Applied: {discountData.code}</span><span>-${discountData.discountAmount.toFixed(2)}</span></div>}<div className="flex justify-between text-3xl font-black text-white pt-6 border-t border-slate-800 items-end"><span className="text-xs text-slate-600 uppercase mb-1">Total</span><span className="flex items-center gap-3">{discountData && <span className="text-slate-600 line-through text-lg decoration-red-500 decoration-2">${subtotal.toFixed(2)}</span>}${finalTotal.toFixed(2)}</span></div></div>
                  <Button onClick={placeOrder} className="w-full h-16 text-xl font-black bg-white text-black hover:bg-slate-200 rounded-2xl shadow-white/5 uppercase tracking-widest mt-4">Place Order</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto h-[85vh] flex flex-col bg-[#0a0a0a] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 bg-[#0f0f0f] flex items-center justify-between"><div className="flex items-center gap-3"><div className="p-2 bg-indigo-500/10 rounded-lg"><Sparkles className="text-indigo-500 h-5 w-5 animate-pulse" /></div><div><h3 className="font-black text-white uppercase tracking-wider text-sm">Aegis Agent</h3><p className="text-[10px] text-indigo-400 font-mono">STATUS: ONLINE // ANALYTIC MODE</p></div></div></div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-black/50">{chatLog.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-5 rounded-[2rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-[#1a1a1a] text-slate-300 border border-slate-800 rounded-tl-none shadow-xl'}`}>{msg.text}</div></div>))}
              {aiLoading && <div className="pl-4 text-xs font-mono text-indigo-500 animate-pulse italic">Thinking...</div>}</div>
            <div className="p-6 border-t border-slate-800 bg-[#0f0f0f] flex gap-3"><Input value={chatQuery} onChange={e => setChatQuery(e.target.value)} placeholder="Ask about sales, revenue, or inventory..." className="bg-black border-slate-800 h-14 rounded-2xl pl-6 text-slate-200" onKeyDown={e => e.key === 'Enter' && askAI()} /><Button onClick={askAI} className="h-14 w-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 shadow-lg transition-all"><Send className="h-5 w-5" /></Button></div>
          </div>
        )}
      </main>
    </div>
  );
}