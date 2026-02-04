"use client";
import React, { useState, useRef, useEffect } from 'react';
import { PERFUMES, Perfume } from '@/lib/data';
import { ArrowLeft, ChevronDown, Trophy, Scale, Check } from 'lucide-react';

export default function ComparePage() {
  const [leftId, setLeftId] = useState<number | string>("");
  const [rightId, setRightId] = useState<number | string>("");

  const leftPerfume = PERFUMES.find(p => p.id === Number(leftId));
  const rightPerfume = PERFUMES.find(p => p.id === Number(rightId));

  return (
    <main className="min-h-screen bg-obsidian text-white p-6 md:p-12 font-sans selection:bg-gold-primary selection:text-black">
      
      {/* --- HEADER FORMAL --- */}
      <div className="max-w-7xl mx-auto mb-16 flex items-center justify-between animate-fade-in-up">
        <a href="/" className="group flex items-center gap-3 text-gray-400 hover:text-white transition">
          <div className="p-2 rounded-full border border-white/10 group-hover:border-gold-primary transition">
             <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium tracking-widest uppercase">Back to Collection</span>
        </a>
        <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            Comparison Tool
        </h1>
      </div>

      {/* --- COMPARISON GRID --- */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* VS Badge (Absolute Center) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-obsidian rounded-full items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,1)]">
           <span className="font-serif text-gold-primary text-xl italic">VS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
            {/* --- SLOT KIRI --- */}
            <CompareSlot
            selectedId={leftId} 
            onSelect={setLeftId} 
            perfume={leftPerfume} 
            align="left"
            opponent={rightPerfume}
            />

            {/* --- SLOT KANAN --- */}
            <CompareSlot 
            selectedId={rightId} 
            onSelect={setRightId} 
            perfume={rightPerfume} 
            align="right"
            opponent={leftPerfume}
            />
        </div>
      </div>
    </main>
  );
}

// --- CUSTOM DROPDOWN COMPONENT (Biar Full Dark Mode & Keren) ---
function CustomDropdown({ options, value, onChange, placeholder }: { options: Perfume[], value: any, onChange: (val: any) => void, placeholder: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cari nama parfum yang sedang dipilih
    const selectedLabel = options.find(o => o.id === Number(value))?.name || placeholder;

    // Close dropdown pas klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full z-40" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-[#111] border ${isOpen ? 'border-gold-primary' : 'border-white/10'} rounded-xl px-5 py-4 text-left transition-all hover:bg-white/5 hover:border-gold-primary/50`}
            >
                <span className={`text-sm ${value ? 'text-white font-serif text-lg' : 'text-gray-500'}`}>
                    {value ? selectedLabel : placeholder}
                </span>
                <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-primary' : ''}`} />
            </button>

            {/* List Option Custom */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50 custom-scrollbar animate-fade-in-up">
                    {options.map((option) => (
                        <div 
                            key={option.id}
                            onClick={() => { onChange(option.id); setIsOpen(false); }}
                            className="px-5 py-3 hover:bg-white/5 cursor-pointer flex justify-between items-center group transition"
                        >
                            <div>
                                <div className="text-white font-serif text-sm group-hover:text-gold-primary transition">{option.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{option.brand}</div>
                            </div>
                            {Number(value) === option.id && <Check size={14} className="text-gold-primary"/>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENT: SLOT UI ---
function CompareSlot({ 
    selectedId, onSelect, perfume, align, opponent 
}: { 
    selectedId: any, onSelect: any, perfume?: Perfume, align: 'left' | 'right', opponent?: Perfume 
}) {
  
  const isWinner = (myScore: number, oppScore?: number) => {
      if (!oppScore) return false;
      return myScore > oppScore;
  };

  return (
    <div className={`flex flex-col h-full ${align === 'right' ? 'md:items-end' : 'md:items-start'}`}>
      
      {/* 1. CUSTOM DROPDOWN SELECTOR */}
      <div className="w-full mb-8">
        <label className={`text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-3 block ${align === 'right' ? 'md:text-right' : ''}`}>
            {align === 'left' ? 'First Selection' : 'Second Selection'}
        </label>
        
        <CustomDropdown 
            options={PERFUMES} 
            value={selectedId} 
            onChange={onSelect} 
            placeholder="Select Perfume..." 
        />
      </div>

      {/* 2. CARD CONTENT */}
      {perfume ? (
        <div className={`w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 animate-fade-in-up flex-1 flex flex-col shadow-xl ${align === 'right' ? 'md:text-right' : 'md:text-left'}`}>
          
          {/* Header Image & Title */}
          <div className={`flex items-start gap-6 mb-8 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
             <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0">
                <img src={perfume.image} className="w-full h-full object-cover" />
             </div>
             <div>
                <h2 className="text-2xl font-serif mb-1 text-white">{perfume.name}</h2>
                <p className="text-xs text-gold-primary uppercase tracking-widest mb-3">{perfume.brand}</p>
                
                {/* Rating Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border ${isWinner(perfume.spl.score, opponent?.spl.score) ? 'bg-gold-primary/10 text-gold-primary border-gold-primary/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                   <Trophy size={12} /> 
                   <span className="text-[10px] font-bold uppercase tracking-wide">Rating: {perfume.spl.score}</span>
                </div>
             </div>
          </div>

          {/* SPL Stats Bar */}
          <div className="space-y-6 mb-8">
             <StatBar 
                label="Longevity" 
                value={perfume.spl.longevity} 
                percentage={perfume.spl.score * 10} 
                align={align} 
             />
             <StatBar 
                label="Sillage" 
                value={perfume.spl.sillage} 
                percentage={perfume.spl.score * 8 + 15}
                align={align} 
             />
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-white/5 pt-6 text-sm mt-auto">
             
             {/* Price */}
             <div className={align === 'right' ? 'order-2' : ''}>
                 <span className="block text-gray-500 text-[10px] uppercase mb-1">Price</span>
                 <span className="font-mono text-white">{perfume.price}</span>
             </div>
             
             {/* Concentration */}
             <div className={align === 'right' ? 'order-1' : ''}>
                 <span className="block text-gray-500 text-[10px] uppercase mb-1">Concentration</span>
                 <span className={`text-xs px-2 py-1 rounded inline-block border ${perfume.concentration === 'Extrait' ? 'border-gold-primary/30 text-gold-primary bg-gold-primary/5' : 'border-white/10 text-gray-300'}`}>
                    {perfume.concentration === 'EDP' ? 'Eau de Parfum' : 'Extrait'}
                 </span>
             </div>

             {/* Occasion */}
             <div className={align === 'right' ? 'order-4' : ''}>
                 <span className="block text-gray-500 text-[10px] uppercase mb-1">Occasion</span>
                 <span className="text-white capitalize">{perfume.occasion}</span>
             </div>

             {/* Main Accord (FROM TOP NOTES) */}
             <div className={align === 'right' ? 'order-3' : ''}>
                 <span className="block text-gray-500 text-[10px] uppercase mb-1">Main Accords</span>
                 {/* Logic Baru: Ambil 3 pertama dari Top Notes */}
                 <span className="text-gray-300 italic text-xs leading-relaxed">
                    {perfume.notes.top.split(',').slice(0, 3).join(', ')}
                 </span>
             </div>
          </div>

        </div>
      ) : (
        // --- EMPTY STATE ---
        <div className="w-full flex-1 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-600 min-h-100">
           <Scale size={24} className="mb-4 opacity-30"/>
           <p className="text-[10px] uppercase tracking-[0.2em]">Select Perfume</p>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: STAT BAR ---
function StatBar({ label, value, percentage, align }: { label: string, value: string, percentage: number, align: 'left' | 'right' }) {
    return (
        <div className="w-full">
            <div className={`flex items-end justify-between mb-2 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-bold text-white">{value}</span>
            </div>
            <div className={`h-1.5 w-full bg-[#151515] rounded-full overflow-hidden flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                <div 
                    className="h-full bg-gold-primary transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min(percentage, 100)}%` }} 
                />
            </div>
        </div>
    )
}
