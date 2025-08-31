export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          AvukatAjanda SaaS
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          opacity: '0.9'
        }}>
          Modern Hukuk Bürosu Yönetim Sistemi - Production Ready
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '16px',
          padding: '2rem',
          color: '#333',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem'}}>
            🚀 Production Demo
          </h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <a 
              href="/dashboard"
              style={{
                background: '#4F46E5',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'block'
              }}
            >
              📊 Dashboard Demo
            </a>
            
            <a 
              href="/dashboard/cases"
              style={{
                background: '#059669',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'block'
              }}
            >
              📁 Cases Module
            </a>
            
            <a 
              href="/dashboard/billing"
              style={{
                background: '#7C3AED',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'block'
              }}
            >
              💳 SaaS Billing
            </a>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#666',
            textAlign: 'left'
          }}>
            <strong>Demo Hesapları:</strong><br/>
            • Avukat: demo@avukatajanda.com / demo123<br/>
            • Stajyer: stajyer@avukatajanda.com / stajyer123<br/>
            • Sekreter: sekreter@avukatajanda.com / sekreter123
          </div>
        </div>
        
        <div style={{
          marginTop: '2rem',
          fontSize: '0.9rem',
          opacity: '0.8'
        }}>
          ✅ Backend API: Aktif | ✅ Multi-tenant SaaS | ✅ UYAP Integration
        </div>
      </div>
    </div>
  );
}
