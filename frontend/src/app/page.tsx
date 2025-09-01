export default function HomePage() {
  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <a href="/" style={{textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50'}}>
              AvukatAjanda
            </a>
            <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
              <a href="/login" style={{color: '#475569', textDecoration: 'none'}}>Giriş</a>
              <a href="/login" style={{background: '#3498db', color: 'white', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none'}}>
                Ücretsiz Dene
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{padding: '5rem 2rem', textAlign: 'center'}}>
        <h1 style={{fontSize: '3rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem'}}>
          Hukuk Büronuz İçin Komple Çözüm
        </h1>
        <p style={{fontSize: '1.25rem', color: '#64748b', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem'}}>
          Bulut tabanlı hukuk bürosu yazılımı
        </p>
        <a href="/login" style={{background: '#3498db', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem', display: 'inline-block'}}>
          14 Gün Ücretsiz Dene
        </a>
      </section>

      {/* Features */}
      <section style={{padding: '3rem 2rem', background: '#f8fafc'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>
            Özellikler
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'white', padding: '2rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>📁 Dava Takibi</h3>
              <p style={{color: '#64748b'}}>Tüm davalarınızı tek yerden yönetin</p>
            </div>
            <div style={{background: 'white', padding: '2rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>👥 Müvekkil Yönetimi</h3>
              <p style={{color: '#64748b'}}>Müvekkil bilgilerini organize edin</p>
            </div>
            <div style={{background: 'white', padding: '2rem', borderRadius: '8px'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>📄 UYAP Entegrasyonu</h3>
              <p style={{color: '#64748b'}}>UYAP sistemine direkt bağlantı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#1f2937', color: 'white', padding: '2rem', textAlign: 'center'}}>
        <p>© 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
