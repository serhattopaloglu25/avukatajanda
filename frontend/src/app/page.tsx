'use client';

export default function HomePage() {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: 'white',
      color: '#333',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      maxWidth: '500px',
      margin: '0 auto'
    },
    button: {
      background: '#4F46E5',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      margin: '8px 0',
      fontSize: '16px',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{textAlign: 'center', padding: '4rem 2rem'}}>
        <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          AvukatAjanda SaaS
        </h1>
        <p style={{fontSize: '1.25rem', marginBottom: '3rem', opacity: '0.9'}}>
          Modern Hukuk Bürosu Yönetim Sistemi
        </p>
        
        <div style={styles.card}>
          <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center'}}>
            Production Demo
          </h2>
          
          <button 
            style={styles.button}
            onClick={() => window.location.href = '/dashboard'}
          >
            🚀 Dashboard Demo
          </button>
          
          <button 
            style={{...styles.button, background: '#059669'}}
            onClick={() => window.location.href = '/dashboard/cases'}
          >
            📁 Cases Module
          </button>
          
          <button 
            style={{...styles.button, background: '#7C3AED'}}
            onClick={() => window.location.href = '/dashboard/billing'}
          >
            💳 Billing System
          </button>
          
          <div style={{marginTop: '1.5rem', fontSize: '0.875rem', color: '#666'}}>
            <strong>Demo Hesapları:</strong><br/>
            Avukat: demo@avukatajanda.com / demo123<br/>
            Stajyer: stajyer@avukatajanda.com / stajyer123<br/>
            Sekreter: sekreter@avukatajanda.com / sekreter123
          </div>
        </div>
      </div>
    </div>
  );
}
