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
            backgroundColor: '#0a0a0a',
            padding: '40px 60px',
            fontFamily: '"Roboto Mono"',
            color: '#d1d5db',
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%' }}>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  border: '2px solid #b91c1c',
                  color: '#dc2626',
                  padding: '4px 12px',
                  fontSize: 24,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  backgroundColor: 'rgba(127, 29, 29, 0.2)'
                }}
              >
                Classified
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#e5e7eb', letterSpacing: '0.05em' }}>
                DOSSIER // {username}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', fontSize: 32 }}>
               🚀 💻 📖
            </div>
          </div>

          {/* Cards Row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px',
              width: '100%',
              flex: 1,
            }}
          >
            {cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '4px',
                  border: '2px solid #1f2937',
                  backgroundColor: '#111827',
                  position: 'relative'
                }}
              >
                <img
                  src={getCardUrl(card.name)}
                  alt={card.name}
                  style={{
                    width: '300px',
                    height: '514px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(185, 28, 28, 0.95)',
                    color: 'white',
                    fontSize: 14,
                    padding: '4px 8px',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    border: '1px solid #7f1d1d'
                  }}
                >
                  OPEN FILE
                </div>
              </div>
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
