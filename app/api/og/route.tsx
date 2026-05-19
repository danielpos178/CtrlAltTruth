import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters with safe fallbacks
    const nume = searchParams.get('nume')?.slice(0, 40) || 'Vânător de Fake News';
    const scor = searchParams.get('scor') || '0';
    const avatar = searchParams.get('avatar');
    const lectii = searchParams.get('lectii') || '0';
    const totalLectii = searchParams.get('totalLectii') || '5';
    const minute = searchParams.get('minute') || '0';
    const inamic = searchParams.get('inamic') || 'Niciunul';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, #171717 0%, #0a0a0a 100%)',
            color: 'white',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.5,
            }}
          />

          {/* Crimson Accents */}
          <div style={{ position: 'absolute', top: -300, left: -200, width: 800, height: 800, background: 'radial-gradient(circle, rgba(124,31,49,0.3) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', bottom: -300, right: -200, width: 800, height: 800, background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)' }} />

          {/* Main Elevated Glass Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '1060px',
              height: '510px',
              borderRadius: '24px',
              backgroundColor: 'rgba(23, 23, 23, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              padding: '50px',
              position: 'relative',
            }}
          >
            {/* Header: Platform Branding */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#7c1f31', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#f5f5f5', letterSpacing: '-0.5px' }}>
                  Scutul Digital
                </span>
              </div>
              <div style={{ fontSize: '18px', color: '#a3a3a3', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Certificat de Performanță
              </div>
            </div>

            {/* Profile Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Avatar"
                  style={{ width: '80px', height: '80px', borderRadius: '40px', marginRight: '24px', border: '3px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '40px', marginRight: '24px', border: '3px solid rgba(255,255,255,0.1)', backgroundColor: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                  🕵️
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: 'white', lineHeight: 1 }}>{nume}</span>
                <span style={{ fontSize: '20px', color: '#a3a3a3', marginTop: '8px' }}>Vânător Oficial de Fake News</span>
              </div>
            </div>

            {/* Metrics Bento Grid */}
            <div style={{ display: 'flex', gap: '20px', width: '100%', height: '180px' }}>
              
              {/* Highlight Metric - Immunity Score */}
              <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '16px', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Imunitate Cognitivă</span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px' }}>
                  <span style={{ fontSize: '72px', fontWeight: 900, color: '#10b981', lineHeight: 1, letterSpacing: '-2px' }}>{scor}%</span>
                </div>
              </div>

              {/* Secondary Metrics - Minutes & Lessons */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '14px', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lecții Parcurse</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '4px' }}>
                     <span style={{ fontSize: '32px', fontWeight: 800, color: 'white' }}>{lectii}</span>
                     <span style={{ fontSize: '18px', color: '#a3a3a3', marginLeft: '6px' }}>/ {totalLectii}</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '14px', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Timp Economisit</span>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginTop: '4px' }}>{minute} min</span>
                </div>
              </div>

              {/* Fallacy Metric */}
              <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(124,31,49,0.3)', position: 'relative' }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(124,31,49,0.2)" strokeWidth="1" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <span style={{ fontSize: '14px', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Inamic Învins</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#fca5a5', marginTop: '12px', lineHeight: 1.2 }}>{inamic}</span>
              </div>

            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Eroare OG API:', e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
