"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, Info, Truck, X, Star, MapPin } from 'lucide-react';
import { PERFUMES, Occasion, Perfume } from '@/lib/data'; // Import data shared

const CITIES = ["Jakarta Selatan", "Jakarta Pusat", "Surabaya", "Surabaya Barat", "Malang", "Bandung", "Bali", "Medan"];

export default function ArumPage() {
  const [activeTab, setActiveTab] = useState<Occasion>('All');
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null); // State buat Info Modal

  // Shipping State
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [shippingResult, setShippingResult] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredData = activeTab === 'All' ? PERFUMES : PERFUMES.filter(p => p.occasion === activeTab);

  // Shipping Logic
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      setSuggestions(CITIES.filter(city => city.toLowerCase().includes(val.toLowerCase())));
      setIsDropdownOpen(true);
    } else setIsDropdownOpen(false);
  };
  
  const checkShipping = () => {
    if(!query) return;
    setShippingResult("Calculating...");
    setTimeout(() => setShippingResult(`Ongkir ke ${query}: IDR ${Math.floor(Math.random()*30+15)}.000`), 1000);
  };

  return (
    <main className="min-h-screen font-sans pb-20">
      
      {/* Navbar */}
      <nav className="fixed w-full z-40 glass-panel px-6 py-4 flex justify-between items-center animate-fade-in-up">
        <h1 className="text-2xl font-serif font-bold text-gold-gradient tracking-widest cursor-pointer">ARUM</h1>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-gray-400">
          <a href="/compare" className="text-gold-primary hover:text-white transition font-bold border-b border-gold-primary/50 pb-1">Go to Comparison</a>
          <a href="#shipping" className="hover:text-gold-primary transition">Shipping</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[85vh] flex flex-col justify-center items-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 w-150 h-150 bg-gold-primary/10 blur-[150px] rounded-full pointer-events-none animate-slow-spin opacity-70" />
        <h2 className="text-5xl md:text-8xl font-serif font-medium mb-8 leading-tight animate-fade-in-up delay-200">
          Where <span className="italic text-gold-gradient">Local Artistry</span> <br /> Meets <span className="italic text-gold-gradient">Arabian Luxury</span>
        </h2>
        <a href="/compare" className="bg-gold-primary text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition animate-fade-in-up delay-300">
          Try Comparison Tool
        </a>
      </header>

      {/* Collection Grid */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto animate-fade-in-up delay-300">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['All', 'Daily', 'Office', 'Night Out', 'Formal'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as Occasion)} 
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${activeTab === tab ? 'bg-gold-primary text-black font-bold' : 'border-white/10 text-gray-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredData.map((perfume) => (
            <div key={perfume.id} className="bg-card group relative p-4 border border-white/5 hover:border-gold-primary/50 transition-all rounded-2xl hover:-translate-y-2">
              <div className="h-64 w-full mb-4 relative overflow-hidden rounded-xl bg-gray-900 cursor-pointer" onClick={() => setSelectedPerfume(perfume)}>
                <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-3 left-3"><span className="text-[10px] px-3 py-1 rounded-full font-bold uppercase bg-black/50 backdrop-blur-md text-white border border-white/10">{perfume.type}</span></div>
              </div>
              <h3 className="font-serif text-xl mb-1 group-hover:text-gold-primary transition">{perfume.name}</h3>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{perfume.brand}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-gold-primary font-mono text-sm">{perfume.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INFO MODAL (POPUP DETAIL) --- */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPerfume(null)} />
          <div className="relative w-full max-w-4xl bg-[#111] border border-gold-primary/30 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
            <button onClick={() => setSelectedPerfume(null)} className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full hover:bg-red-500/20"><X size={20}/></button>
            
            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-900 relative">
               <img src={selectedPerfume.image} alt={selectedPerfume.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-4xl font-serif text-white mb-2">{selectedPerfume.name}</h3>
              
              {/* UPDATE BAGIAN INI: Brand + Concentration Badge (FIXED) */}
              <div className="flex items-center gap-3 mb-4">
                 <span className="text-gold-primary uppercase tracking-widest text-sm font-bold">{selectedPerfume.brand}</span>
                 <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                 
                 {/* Logic Simpel: Kalau EDP tulis Eau de Parfum, Sisanya Extrait de Parfum */}
                 <span className={`text-[10px] px-2 py-0.5 rounded border ${selectedPerfume.concentration === 'Extrait' ? 'border-gold-primary text-gold-primary bg-gold-primary/10' : 'border-white/20 text-gray-400'}`}>
                    {selectedPerfume.concentration === 'EDP' ? 'Eau de Parfum' : 'Extrait de Parfum'}
                 </span>
              </div>
              
              <div className="flex items-center gap-2 mb-6 text-sm"><Star size={16} className="text-gold-primary fill-gold-primary"/> {selectedPerfume.rating} / 5.0</div>
              
              {/* --- Notes Grid (REVISED: CLEAN & ALIGNED) --- */}
              <div className="bg-white/5 p-6 rounded-2xl mb-8 border border-white/5">
                <div className="grid grid-cols-3 gap-0 relative">
                  
                  {/* Vertical Separator Lines (Absolute Positioning biar rapi) */}
                  <div className="absolute top-2 bottom-2 left-1/3 w-px bg-white/10"></div>
                  <div className="absolute top-2 bottom-2 right-1/3 w-px bg-white/10"></div>

                  {/* 1. TOP NOTES */}
                  <div className="text-center px-2">
                    <h4 className="text-[10px] text-gold-primary uppercase tracking-[0.2em] font-bold mb-3 h-8 flex items-center justify-center">
                      Top Notes
                    </h4>
                    <div className="flex flex-col gap-1.5 text-sm text-gray-300">
                      {selectedPerfume.notes.top.split(',').map((note, i) => (
                        <span key={i} className="capitalize">{note.trim()}</span>
                      ))}
                    </div>
                  </div>

                  {/* 2. HEART NOTES */}
                  <div className="text-center px-2">
                    <h4 className="text-[10px] text-gold-primary uppercase tracking-[0.2em] font-bold mb-3 h-8 flex items-center justify-center">
                      Heart Notes
                    </h4>
                    <div className="flex flex-col gap-1.5 text-sm text-gray-300">
                      {selectedPerfume.notes.mid.split(',').map((note, i) => (
                        <span key={i} className="capitalize">{note.trim()}</span>
                      ))}
                    </div>
                  </div>

                  {/* 3. BASE NOTES */}
                  <div className="text-center px-2">
                    <h4 className="text-[10px] text-gold-primary uppercase tracking-[0.2em] font-bold mb-3 h-8 flex items-center justify-center">
                      Base Notes
                    </h4>
                    <div className="flex flex-col gap-1.5 text-sm text-gray-300">
                      {selectedPerfume.notes.base.split(',').map((note, i) => (
                        <span key={i} className="capitalize">{note.trim()}</span>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>

              <div className="flex gap-4 items-center mt-auto">
                 <div className="text-2xl font-mono text-gold-primary">{selectedPerfume.price}</div>
                 <button className="flex-1 bg-gold-primary text-black font-bold py-3 rounded-full hover:scale-105 transition">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Section */}
      <section id="shipping" className="py-24 px-6 max-w-4xl mx-auto">
         <div className="bg-card border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1"><h3 className="text-2xl font-serif mb-2">Check Shipping</h3><p className="text-gray-400 text-sm">Real-time shipping calculation.</p></div>
            <div className="flex-1 w-full relative" ref={searchRef}>
              <div className="flex bg-black border border-white/10 rounded-xl px-4 py-3 focus-within:border-gold-primary">
                 <MapPin className="text-gray-500 mr-2" size={18}/>
                 <input type="text" value={query} onChange={handleSearchChange} placeholder="Enter City..." className="bg-transparent flex-1 text-sm outline-none"/>
                 <button onClick={checkShipping}><Truck className="text-gold-primary"/></button>
              </div>
              {isDropdownOpen && <div className="absolute top-12 left-0 w-full bg-[#151515] z-50 rounded-xl border border-white/10">{suggestions.map(s=><button key={s} onClick={()=>{setQuery(s); setIsDropdownOpen(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5">{s}</button>)}</div>}
              {shippingResult && <div className="mt-2 text-gold-primary text-sm text-center font-mono">{shippingResult}</div>}
            </div>
         </div>
      </section>
    </main>
  );
}
