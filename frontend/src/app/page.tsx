'use client';

export default function HomePage() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'white',
      color: '#1a202c',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        background: 'white',
        padding: '0 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#3182ce',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{color: 'white', fontWeight: '600'}}>A</span>
            </div>
            <span style={{fontSize: '20px', fontWeight: '600'}}>AvukatAjanda</span>
          </div>
          
          <a href="/dashboard" style={{
            background: '#3182ce',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Giriş Yap
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{padding: '80px 2rem', background: 'white'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1a202c',
            margin: '0 0 1.5rem 0'
          }}>
            Hukuk büronuzu modernleştirin
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#4a5568',
            margin: '0 0 2rem 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Dava yönetimi, müvekkil takibi ve belge organizasyonu için kapsamlı platform
          </p>
          
          <a href="/dashboard" style={{
            background: '#3182ce',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            display: 'inline-block',
            marginBottom: '3rem'
          }}>
            Sisteme Giriş
          </a>

          <div style={{
            background: '#f7fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '1rem'}}>
              Demo Hesapları
            </h3>
            <div style={{fontSize: '14px', color: '#4a5568', textAlign: 'left'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Avukat:</strong> demo@avukatajanda.com / demo123
              </div>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Stajyer:</strong> stajyer@avukatajanda.com / stajyer123
              </div>
              <div>
                <strong>Sekreter:</strong> sekreter@avukatajanda.com / sekreter123
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
