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
  try {
    const jsonString = JSON.stringify(payload);
    return LZString.compressToEncodedURIComponent(jsonString);
  } catch (e) {
    console.error("Failed to encode payload:", e);
    return "";
  }
}

export function decodePayload(compressed: string): TarotReadingPayload | null {
  try {
    // Next.js params remain URL encoded sometimes, and chats mangle + to spaces
    const decodedUri = decodeURIComponent(compressed);
    const fixedUrl = decodedUri.replace(/ /g, '+');

    const jsonString = LZString.decompressFromEncodedURIComponent(fixedUrl);
    if (!jsonString) return null;

    const parsed = JSON.parse(jsonString);

    if (!parsed || !parsed.cards || !Array.isArray(parsed.cards)) {
      return null;
    }
    
    return parsed as TarotReadingPayload;
  } catch (error) {
    console.error("Failed to decompress payload.", error);
    return null;
  }
}
