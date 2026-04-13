"use client";

import { useState } from 'react';
import { track } from '@vercel/analytics';
import { getCardUrl } from '@/lib/tarot-cards';
import type { TarotReadingPayload } from '@/lib/compression';

export default function TarotClient({ data }: { data: TarotReadingPayload }) {
  // null means no popup is open
  const [expandedCardIdx, setExpandedCardIdx] = useState<number | null>(null);

  const activeCard = expandedCardIdx !== null ? data.cards[expandedCardIdx] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 pb-20 relative font-mono selection:bg-red-900 selection:text-white">
      {/* Main Container */}
      <div className="max-w-md mx-auto pt-16 px-6">
        

        {/* Profile Section */}
        <div className="flex flex-row items-start gap-4 mb-6">
          <div className="w-20 h-20 shrink-0 border border-gray-700 bg-gray-900 overflow-hidden">
            <img
              src={data.profilePic || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
              alt={data.username}
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-xl font-bold truncate text-gray-200 line-clamp-1">{data.username}</h1>
            <h2 className="text-sm text-gray-500 mb-2 truncate">
              {data.username.startsWith('@') ? data.username.slice(1).replace(/_/g, '') : data.username.replace(/_/g, '')}
            </h2>
            <p className="text-xs text-gray-400 leading-snug line-clamp-3">
              {data.twitterBio}
            </p>
          </div>
        </div>


        {/* Emojis */}
        <div className="flex gap-2 text-xl mb-8">
          🚀 💻 📖 🤖 🧢
        </div>

        {/* AI Summary */}
        <div className="border-l-2 border-red-700 pl-4 py-1 mb-10">
          <p className="text-sm leading-relaxed text-gray-300">
            {data.aiSummary}
          </p>
        </div>

        <div className="text-[10px] text-gray-600 tracking-[0.2em] mb-4 uppercase">
          Tap to open file
        </div>
      </div>

      {/* Cards Carousel */}
      <div
        className="flex overflow-x-auto gap-4 px-6 snap-x snap-mandatory pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => setExpandedCardIdx(idx)}
            className="snap-center shrink-0 w-[260px] relative transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-full h-auto bg-[#111] p-[2px] border border-gray-800 relative">
              <img
                src={getCardUrl(card.name)}
                alt={card.name}
                className="w-full h-auto pointer-events-none"
              />

            </div>
          </button>
        ))}
      </div>

      {/* Sticky Wabi CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent flex justify-center pb-8 border-t border-gray-800/50 backdrop-blur-md pointer-events-none z-10">
        <a
          href="https://wabi.ai/@zach_derhake/twitter-tarot-1042500?_v=7"
          onClick={() => track('unveil_twitter_fate_click', { username: data.username })}
          className="relative group block w-full max-w-sm pointer-events-auto"
        >
          {/* Outer glow aura - changed to red to match dossier theme */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-800 to-red-500 rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

          {/* Main button body */}
          <div className="relative flex items-center justify-center gap-3 bg-[#111] border border-red-800 text-red-500 text-center font-mono font-bold uppercase tracking-widest text-sm md:text-base py-4 transition-all duration-300 group-hover:bg-[#1a1111] group-hover:text-red-400 group-hover:-translate-y-0.5">
            <span>UNVEIL YOUR TWITTER FATE</span>
          </div>
        </a>
      </div>

      {/* Modal Popup overlay */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]/98 backdrop-blur-md overflow-y-auto"
          onClick={() => setExpandedCardIdx(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-gray-700 bg-[#111] hover:bg-[#222] flex items-center justify-center text-gray-400 z-50 transition-colors rounded-full"
            onClick={(e) => { e.stopPropagation(); setExpandedCardIdx(null); }}
          >
            ✕
          </button>

          {/* Modal Content */}
          <div
            className="w-full max-w-lg mx-auto p-6 pt-20 pb-32 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border border-gray-800 bg-[#111] p-1 w-full mb-8 shadow-[0_0_30px_rgba(185,28,28,0.05)]">
              <img
                src={getCardUrl(activeCard.name)}
                alt={activeCard.name}
                className="w-full h-auto"
              />

            </div>

            <div className="border-l-2 border-red-700 pl-4 py-1 mb-10 w-full relative">
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeCard.text}
              </p>
            </div>

            {/* Verdict Box */}
            <div className="bg-[#111] w-full p-5 border border-gray-800 flex flex-col items-start relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-800 to-transparent"></div>
              <span className="text-[10px] tracking-widest text-[#b91c1c] uppercase mb-3 block">
                // VERDICT //
              </span>
              <p className="text-sm uppercase tracking-wider leading-relaxed text-gray-200">
                {activeCard.verdict}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
