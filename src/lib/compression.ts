import LZString from 'lz-string';

export interface TarotCardData {
  name: string;
  text: string;
  verdict: string;
}

export interface TarotReadingPayload {
  username: string; // e.g. "@zach_derhake" or just "Zachderhake"
  profilePic: string; // The URL to their profile picture
  twitterBio: string; // E.g. "Math + CS @ BU..."
  aiSummary: string; // The overall "Based on our AI agent's analysis..."
  shortSummary?: string; // The 3-word summary for the OG share image
  cards: [TarotCardData, TarotCardData, TarotCardData];
}

export function encodePayload(payload: TarotReadingPayload): string {
  const jsonStr = JSON.stringify(payload);
  return LZString.compressToEncodedURIComponent(jsonStr);
}

export function decodePayload(compressed: string): TarotReadingPayload | null {
  try {
    // 1. Next.js App Router params remain URL-encoded, so "%2B" must become "+"
    // 2. Chat apps sometimes mutate "+" into spaces, so we replace spaces with "+"
    const decodedUri = decodeURIComponent(compressed);
    const fixed = decodedUri.replace(/ /g, '+');
    
    const jsonStr = LZString.decompressFromEncodedURIComponent(fixed);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr) as TarotReadingPayload;
  } catch (error) {
    console.error("Failed to decode payload", error);
    return null;
  }
}
