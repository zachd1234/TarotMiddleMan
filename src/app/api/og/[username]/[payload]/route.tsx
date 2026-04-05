import { ImageResponse } from 'next/og';
import { decodePayload } from '@/lib/compression';
import { getCardUrl } from '@/lib/tarot-cards';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string, payload: string }> }
) {
  try {
    const { payload } = await params;
    const data = decodePayload(payload);

    if (!data) {
      return new Response('Invalid payload', { status: 400 });
    }

    const { cards, username, shortSummary } = data;

    // Fetch the Playfair Display font from a reliable CDN
    const playfairBoldUrl = 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff';
    const playfairBold = await fetch(playfairBoldUrl).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#0c0c0c',
            padding: '40px 40px',
            fontFamily: '"Playfair Display"',
          }}
        >
          {/* Header Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: 80, color: '#e6b15c', lineHeight: 1 }}>
              {username}
            </div>
            <div style={{ fontSize: 48, color: '#e6b15c', marginTop: '16px', opacity: 0.9 }}>
              {shortSummary || "Tarot Reading"}
            </div>
          </div>

          {/* Cards Row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              width: '100%',
              flex: 1,
            }}
          >
            {cards.map((card, idx) => (
              <img
                key={idx}
                src={getCardUrl(card.name)}
                alt={card.name}
                style={{
                  width: '240px',
                  height: '411px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(230, 177, 92, 0.15)', // Giving the cards a slight golden glow shadow
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Playfair Display',
            data: playfairBold,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
