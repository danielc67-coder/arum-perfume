// src/components/CustomCursor.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  // Posisi mouse real-time
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Posisi trailing cursor (yang agak telat)
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  // State saat hover elemen interaktif
  const [isHovering, setIsHovering] = useState(false);
  
  // Ref untuk requestAnimationFrame biar smooth
  const requestRef = useRef<number | null>(null);

  // 1. Track Mouse Movement Real-time
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Tambahin class ke body biar kursor asli ilang
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // 2. Logic untuk Trailing Effect (Lerp/Smoothing)
  const animateTrail = () => {
    setTrailPos(prev => ({
      // Rumus Linear Interpolation (Lerp) biar geraknya smooth ngejar mousePos
      // Angka 0.15 bisa diubah (makin kecil makin lambat/berat trailnya)
      x: prev.x + (mousePos.x - prev.x) * 0.15,
      y: prev.y + (mousePos.y - prev.y) * 0.15
    }));
    requestRef.current = requestAnimationFrame(animateTrail);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [mousePos]); // Re-run anim every time mouse moves target

  // 3. Logic Detect Hover Link/Button
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Cek kalo yang dihover itu button, link, atau input
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
}, []);

  return (
    <>
      {/* The main small dot (instant follow) */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-gold-primary rounded-full pointer-events-none z-9999 mix-blend-difference transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0) scale(${isHovering ? 0 : 1})` }}
      />
      
      {/* The larger trailing ring (smooth follow) */}
      <div 
        className={`fixed top-0 left-0 rounded-full border border-gold-primary/50 pointer-events-none z-9998 transition-all duration-300 ease-out
        ${isHovering ? 'w-12 h-12 bg-gold-primary/20 border-transparent' : 'w-8 h-8 bg-transparent'}`}
        style={{ 
          transform: `translate3d(${trailPos.x - (isHovering ? 24 : 16)}px, ${trailPos.y - (isHovering ? 24 : 16)}px, 0)` 
        }}
      />
    </>
  );
}
