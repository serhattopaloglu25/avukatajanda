'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation with Logo */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
            {/* Logo */}
            <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Crect x='5' y='10' width='30' height='25' rx='2' fill='%23203a4a'/%3E%3Crect x='15' y='5' width='25' height='20' rx='2' fill='%23ffc107' opacity='0.8'/%3E%3Ctext x='45' y='25' font-family='Arial' font-size='10' fill='white'%3EAJANDA%3C/text%3E%3Ctext x='45' y='35' font-family='Arial' font-size='18' font-weight='bold' fill='%23203a4a'%3EAVUKATAJANDA%3C/text%3E%3C/svg%3E" 
                alt="AvukatAjanda" 
                style={{height: '45px'}}
              />
            </a>
            <div style={{display: 'flex', gap: '2rem'}}>
              <a href="#features" style={{color: '#475569', textDecoration: 'none'}}>Özellikler</a>
              <a href="#pricing" style={{color: '#475569', textDecoration: 'none'}}>Fiyatlandırma</a>
              <a href="#contact" style={{color: '#475569', textDecoration: 'none'}}>İletişim</a>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            {isLoggedIn ? (
              <>
                <span style={{color: '#475569', fontSize: '0.875rem'}}>
                  Hoşgeldin, {user?.name || user?.email?.split('@')[0]}
                </span>
                <a href="/dashboard" style={{color: '#475569', textDecoration: 'none'}}>Dashboard</a>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <a href="/login" style={{color: '#475569', textDecoration: 'none'}}>Giriş Yap</a>
                <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none'}}>Ücretsiz Dene</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(to bottom, #f8fafc, white)', padding: '5rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem'}}>
            Hukuk Büronuz İçin Komple Çözüm
          </h1>
          <p style={{fontSize: '1.25rem', color: '#64748b', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem'}}>
            Dava takibi, müvekkil yönetimi, belge organizasyonu ve UYAP entegrasyonu ile büronuzu dijitalleştirin
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem'}}>
            {isLoggedIn ? (
              <a href="/dashboard" style={{background: '#0ea5e9', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem'}}>
                Dashboard'a Git
              </a>
            ) : (
              <>
                <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem'}}>
                  14 Gün Ücretsiz Dene
                </a>
                <a href="#contact" style={{border: '2px solid #e5e7eb', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', color: '#475569'}}>
                  İletişime Geç
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{padding: '5rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>
            Tek Platform, Tüm İhtiyaçlar
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📁</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>Dava Yönetimi</h3>
              <p style={{color: '#64748b'}}>Tüm davalarınızı tek yerden takip edin</p>
            </div>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>👥</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>Müvekkil Takibi</h3>
              <p style={{color: '#64748b'}}>Müvekkil bilgileri ve iletişim geçmişi</p>
            </div>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📄</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>UYAP Entegrasyonu</h3>
              <p style={{color: '#64748b'}}>Belgelerinizi UYAP sistemine gönderin</p>
            </div>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📅</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>Takvim</h3>
              <p style={{color: '#64748b'}}>Duruşma ve randevularınızı yönetin</p>
            </div>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>💰</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>Faturalandırma</h3>
              <p style={{color: '#64748b'}}>Ücret takibi ve otomatik faturalama</p>
            </div>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📊</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem'}}>Raporlama</h3>
              <p style={{color: '#64748b'}}>Detaylı performans analizleri</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section style={{background: '#0ea5e9', padding: '4rem 2rem', color: 'white'}}>
          <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
              Hukuk büronuzu dijitalleştirmeye hazır mısınız?
            </h2>
            <p style={{fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9}}>
              14 gün ücretsiz deneme sürümü ile başlayın
            </p>
            <a href="/login" style={{
              background: 'white',
              color: '#0ea5e9',
              padding: '14px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.125rem',
              display: 'inline-block',
              fontWeight: '600'
            }}>
              Hemen Başla
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
