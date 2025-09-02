'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <a href="/" style={{textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc'}}>
              AvukatAjanda
            </a>
            
            {!isMobile ? (
              <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
                <a href="#features" style={{color: '#475569', textDecoration: 'none'}}>Özellikler</a>
                <a href="#pricing" style={{color: '#475569', textDecoration: 'none'}}>Fiyatlandırma</a>
                <a href="#contact" style={{color: '#475569', textDecoration: 'none'}}>İletişim</a>
                <a href="/login" style={{color: '#475569', textDecoration: 'none'}}>Giriş</a>
                <a href="/login" style={{background: '#0066cc', color: 'white', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none'}}>
                  Ücretsiz Dene
                </a>
              </div>
            ) : (
              <button onClick={() => setMenuOpen(!menuOpen)} style={{background: 'none', border: 'none', padding: '8px', cursor: 'pointer'}}>
                <div style={{width: '24px', height: '2px', background: '#0066cc', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#0066cc', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#0066cc'}}></div>
              </button>
            )}
          </div>
          
          {isMobile && menuOpen && (
            <div style={{position: 'absolute', top: '72px', left: 0, right: 0, background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <a href="#features" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Özellikler</a>
                <a href="#pricing" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Fiyatlandırma</a>
                <a href="#contact" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>İletişim</a>
                <a href="/login" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Giriş</a>
                <a href="/login" style={{background: '#0066cc', color: 'white', padding: '0.75rem', borderRadius: '6px', textDecoration: 'none', textAlign: 'center'}}>
                  Ücretsiz Dene
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: 'linear-gradient(to bottom, #f8fafc, white)'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem'}}>
            Hukuk Büronuz İçin Komple Çözüm
          </h1>
          <p style={{fontSize: isMobile ? '1rem' : '1.25rem', color: '#64748b', marginBottom: '3rem', padding: '0 1rem'}}>
            Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin
          </p>
          <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', justifyContent: 'center', padding: '0 1rem'}}>
            <a href="/login" style={{background: '#0066cc', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem', display: 'inline-block'}}>
              14 Gün Ücretsiz Dene
            </a>
            <a href="#demo" style={{border: '2px solid #e5e7eb', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', color: '#475569', display: 'inline-block'}}>
              Demo Talep Et
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>
            Güçlü Özellikler
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>⚖️</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Dava Takip Sistemi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Davalarınızı detaylı olarak takip edin. Duruşma tarihleri, belgeler ve notları tek yerden yönetin.
              </p>
            </div>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>👥</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Müvekkil Yönetimi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Müvekkil bilgilerini, iletişim geçmişini ve dava dosyalarını organize edin.
              </p>
            </div>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📄</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>UYAP Entegrasyonu</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                UYAP sistemine direkt entegrasyon ile evrak takibi ve gönderimi yapın.
              </p>
            </div>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📅</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Akıllı Takvim</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Duruşmalar, toplantılar ve önemli tarihler için akıllı hatırlatma sistemi.
              </p>
            </div>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>💰</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Finansal Yönetim</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Vekalet ücretleri, masraflar ve tahsilatları takip edin.
              </p>
            </div>
            <div style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📊</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Raporlama</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Büronuzun performansını analiz edin, detaylı raporlar alın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: '#f8fafc'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>
            Fiyatlandırma
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <div style={{background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>Başlangıç</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>₺299<span style={{fontSize: '1rem', color: '#64748b'}}>/ay</span></p>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0'}}>✓ 1 Kullanıcı</li>
                <li style={{padding: '0.5rem 0'}}>✓ 50 Aktif Dava</li>
                <li style={{padding: '0.5rem 0'}}>✓ 100 GB Depolama</li>
                <li style={{padding: '0.5rem 0'}}>✓ E-posta Desteği</li>
              </ul>
              <a href="/login" style={{display: 'block', textAlign: 'center', padding: '0.75rem', border: '2px solid #0066cc', borderRadius: '8px', color: '#0066cc', textDecoration: 'none'}}>
                Başla
              </a>
            </div>
            <div style={{background: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #0066cc', position: 'relative'}}>
              <div style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0066cc', color: 'white', padding: '4px 16px', borderRadius: '12px', fontSize: '0.875rem'}}>
                Popüler
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>Profesyonel</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>₺699<span style={{fontSize: '1rem', color: '#64748b'}}>/ay</span></p>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0'}}>✓ 5 Kullanıcı</li>
                <li style={{padding: '0.5rem 0'}}>✓ Sınırsız Dava</li>
                <li style={{padding: '0.5rem 0'}}>✓ 500 GB Depolama</li>
                <li style={{padding: '0.5rem 0'}}>✓ 7/24 Destek</li>
              </ul>
              <a href="/login" style={{display: 'block', textAlign: 'center', padding: '0.75rem', background: '#0066cc', borderRadius: '8px', color: 'white', textDecoration: 'none'}}>
                Başla
              </a>
            </div>
            <div style={{background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>Kurumsal</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>Özel</p>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0'}}>✓ Sınırsız Kullanıcı</li>
                <li style={{padding: '0.5rem 0'}}>✓ Sınırsız Dava</li>
                <li style={{padding: '0.5rem 0'}}>✓ Sınırsız Depolama</li>
                <li style={{padding: '0.5rem 0'}}>✓ Özel Destek</li>
              </ul>
              <a href="#contact" style={{display: 'block', textAlign: 'center', padding: '0.75rem', border: '2px solid #0066cc', borderRadius: '8px', color: '#0066cc', textDecoration: 'none'}}>
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{padding: isMobile ? '3rem 1rem' : '5rem 2rem', background: 'white'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 'bold', marginBottom: '3rem'}}>İletişim</h2>
          <div style={{background: '#f8fafc', padding: isMobile ? '2rem' : '3rem', borderRadius: '12px'}}>
            <p style={{marginBottom: '2rem', fontSize: '1.125rem', color: '#64748b'}}>
              AvukatAjanda hakkında sorularınız için bizimle iletişime geçin
            </p>
            <div style={{marginBottom: '1rem'}}>
              <strong>Telefon:</strong> 0850 123 45 67
            </div>
            <div style={{marginBottom: '1rem'}}>
              <strong>E-posta:</strong> destek@avukatajanda.com
            </div>
            <div>
              <strong>Adres:</strong> Levent, İstanbul
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#1f2937', color: 'white', padding: '3rem 2rem', textAlign: 'center'}}>
        <p style={{marginBottom: '1rem'}}>© 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', justifyContent: 'center'}}>
          <a href="/admin" style={{color: '#9ca3af', textDecoration: 'none'}}>Admin Panel</a>
          <a href="#" style={{color: '#9ca3af', textDecoration: 'none'}}>Kullanım Koşulları</a>
          <a href="#" style={{color: '#9ca3af', textDecoration: 'none'}}>Gizlilik Politikası</a>
          <a href="#" style={{color: '#9ca3af', textDecoration: 'none'}}>KVKK</a>
        </div>
      </footer>
    </div>
  );
}
