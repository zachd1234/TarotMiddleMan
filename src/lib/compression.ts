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
    return Buffer.from(jsonString, 'utf-8').toString('base64url');
  } catch (e) {
    console.error("Failed to encode payload:", e);
    return "";
  }
}

export function decodePayload(compressed: string): TarotReadingPayload | null {
  try {
    const jsonString = Buffer.from(compressed, 'base64url').toString('utf-8');
    const parsed = JSON.parse(jsonString);

    if (!parsed || !parsed.cards || !Array.isArray(parsed.cards)) {
      return null;
    }
    
    return parsed as TarotReadingPayload;
  } catch (error) {
    console.error("Failed to decode base64 payload.", error);
    return null;
  }
}
