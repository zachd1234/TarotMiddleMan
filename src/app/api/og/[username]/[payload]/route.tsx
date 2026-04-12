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

    const { cards, username } = data;

    // Fetch Roboto Mono for the dossier monospace aesthetic
    const robotoMonoUrl = 'https://cdn.jsdelivr.net/npm/@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff';
    const robotoMono = await fetch(robotoMonoUrl).then((res) => res.arrayBuffer());

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
            backgroundColor: '#0a0a0a',
            padding: '60px 40px',
            fontFamily: '"Roboto Mono"',
            color: '#d1d5db',
          }}
        >
          {/* Header Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: 80, color: '#dc2626', lineHeight: 1, letterSpacing: '0.05em' }}>
              {username}
            </div>
            <div style={{ fontSize: 48, color: '#9ca3af', marginTop: '16px', opacity: 0.9, letterSpacing: '0.1em' }}>
              {data.shortSummary || "CLASSIFIED DOSSIER"}
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
                  width: '260px',
                  height: '445px',
                  border: '2px solid #b91c1c',
                  boxShadow: '0 8px 30px rgba(185, 28, 28, 0.25)', // Red glow shadow
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
            name: 'Roboto Mono',
            data: robotoMono,
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
