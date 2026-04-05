"use client";

import { useState } from 'react';
import { getCardUrl } from '@/lib/tarot-cards';
import type { TarotReadingPayload } from '@/lib/compression';

export default function TarotClient({ data }: { data: TarotReadingPayload }) {
  // null means no popup is open
  const [expandedCardIdx, setExpandedCardIdx] = useState<number | null>(null);

  const activeCard = expandedCardIdx !== null ? data.cards[expandedCardIdx] : null;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white pb-32 relative">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-16 px-6">
        <div className="w-24 h-24 rounded-full border border-yellow-600/50 overflow-hidden mb-4 shadow-[0_0_15px_rgba(202,138,4,0.3)]">
          <img 
            src={data.profilePic || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"} 
            alt={data.username} 
            className="w-full h-full object-cover" 
          />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2">{data.username}</h1>
        <p className="text-gray-400 text-sm italic text-center max-w-sm mb-6 px-4">
          {data.twitterBio}
        </p>
        
        {/* Emojis */}
        <div className="flex gap-2 text-2xl mb-8">
          🤖 🚀 📱 🎲 🧠
        </div>

        {/* AI Summary */}
        <p className="text-lg italic text-center font-serif leading-relaxed px-4 mb-16 text-gray-200">
          {data.aiSummary}
        </p>
      </div>

      {/* Cards Carousel */}
      <div 
        className="flex overflow-x-auto gap-6 px-6 snap-x snap-mandatory pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.cards.map((card, idx) => (
          <button 
            key={idx} 
            onClick={() => setExpandedCardIdx(idx)}
            className="snap-center shrink-0 w-[280px] flex flex-col transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:ring-2 hover:ring-yellow-500/30 rounded-xl"
          >
             <img 
               src={getCardUrl(card.name)} 
               alt={card.name} 
               className="w-full h-auto rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none" 
             />
             <div className="text-center mt-3 text-sm font-semibold text-gray-400 uppercase tracking-widest pointer-events-none">
               Tap to reveal
             </div>
          </button>
        ))}
      </div>

      {/* Sticky Wabi CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent flex justify-center pb-8 border-t border-white/5 backdrop-blur-sm pointer-events-none z-10">
        <a 
          href="https://wabi.ai/@zach_derhake/twitter-tarot-1042500?_v=4" 
          className="block w-full max-w-sm bg-white text-black text-center font-bold text-lg py-4 rounded-[32px] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] hover:bg-gray-100 transition-all pointer-events-auto"
        >
          Get Your Reading
        </a>
      </div>

      {/* Modal Popup overlay */}
      {activeCard && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md overflow-y-auto"
          onClick={() => setExpandedCardIdx(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-50 transition-colors"
            onClick={(e) => { e.stopPropagation(); setExpandedCardIdx(null); }}
          >
            ✕
          </button>

          {/* Modal Content */}
          <div 
            className="w-full max-w-lg mx-auto p-6 pt-20 pb-32 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
          >
            <img 
               src={getCardUrl(activeCard.name)} 
               alt={activeCard.name} 
               className="w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,1)] border border-white/10 mb-8" 
            />

            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-serif px-2 mb-10 w-full">
              {activeCard.text}
            </p>

            {/* Verdict Box strictly for the modal */}
            <div className="bg-[#151515] w-full p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center shadow-inner">
               <span className="text-xs tracking-[0.2em] text-gray-500 uppercase mb-4 block font-mono">
                 The Verdict
               </span>
               <p className="text-base font-bold uppercase tracking-widest leading-relaxed text-gray-100">
                 {activeCard.verdict}
               </p>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
