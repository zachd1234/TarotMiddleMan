import type { Metadata } from 'next';
import { decodePayload } from '@/lib/compression';
import { getCardUrl } from '@/lib/tarot-cards';

import TarotClient from './TarotClient';

// Metadata generation for Twitter/OpenGraph previews
export async function generateMetadata(
  { params }: { params: Promise<{ username: string, payload: string }> }
): Promise<Metadata> {
  const { username, payload } = await params;
  const data = decodePayload(payload);

  if (!data) {
    return { title: 'Tarot Reading | Wabi' };
  }

  return {
    title: `${data.username}'s Tarot Reading`,
    description: data.aiSummary,
    openGraph: {
      title: `${data.username}'s Tarot Reading`,
      description: data.aiSummary,
      images: [{ url: `/api/og/${username}/${payload}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.username}'s Tarot Reading`,
      description: data.aiSummary,
      images: [`/api/og/${username}/${payload}`],
    },
  };
}

export default async function TarotPage({ params }: { params: Promise<{ username: string, payload: string }> }) {
  const { payload } = await params;
  const data = decodePayload(payload);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-serif">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-yellow-600">The cards are clouded...</h1>
          <p className="text-gray-400">Invalid or corrupted reading link.</p>
        </div>
      </div>
    );
  }

  return <TarotClient data={data} />;
}
