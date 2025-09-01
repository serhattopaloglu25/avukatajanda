'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {/* Logo */}
            <a href="/" style={{textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a4a'}}>
              AvukatAjanda
            </a>

            {/* Desktop Menu */}
            {!isMobile && (
              <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} style={{color: '#475569', textDecoration: 'none'}}>Özellikler</a>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} style={{color: '#475569', textDecoration: 'none'}}>Fiyatlandırma</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{color: '#475569', textDecoration: 'none'}}>İletişim</a>
                {isLoggedIn ? (
                  <>
                    <a href="/dashboard" style={{color: '#475569', textDecoration: 'none'}}>Dashboard</a>
                    <button onClick={handleLogout} style={{background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer'}}>
                      Çıkış
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" style={{color: '#475569', textDecoration: 'none'}}>Giriş</a>
                    <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none'}}>
                      Ücretsiz Dene
                    </a>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{width: '24px', height: '2px', background: '#1e3a4a', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#1e3a4a', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#1e3a4a'}}></div>
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
              padding: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Özellikler</a>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Fiyatlandırma</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>İletişim</a>
                {isLoggedIn ? (
                  <>
                    <a href="/dashboard" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Dashboard</a>
                    <button onClick={handleLogout} style={{background: '#ef4444', color: 'white', padding: '0.75rem', borderRadius: '6px', border: 'none', width: '100%'}}>
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" style={{color: '#475569', textDecoration: 'none', padding: '0.5rem'}}>Giriş Yap</a>
                    <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '0.75rem', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'block'}}>
                      Ücretsiz Dene
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(to bottom, #f8fafc, white)', padding: isMobile ? '2rem 1rem' : '5rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3.5rem',
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: '1.5rem'
          }}>
            Hukuk Büronuz İçin Komple Çözüm
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: '#64748b',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            padding: '0 1rem'
          }}>
            Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin
          </p>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            justifyContent: 'center',
            padding: '0 1rem'
          }}>
            {isLoggedIn ? (
              <a href="/dashboard" style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '1.125rem',
                display: 'block'
              }}>
                Dashboard'a Git
              </a>
            ) : (
              <>
                <a href="/login" style={{
                  background: '#0ea5e9',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  textAlign: 'center',
                  display: 'block'
                }}>
                  14 Gün Ücretsiz Dene
                </a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{
                  border: '2px solid #e5e7eb',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#475569',
                  textAlign: 'center',
                  display: 'block'
                }}>
                  Demo Talep Et
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{padding: isMobile ? '2rem 1rem' : '5rem 2rem', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Güçlü Özellikler
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⚖️</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Dava Takip Sistemi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Davalarınızı detaylı olarak takip edin. Otomatik hatırlatmalar ile hiçbir tarihi kaçırmayın.
              </p>
            </div>
            
            <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>👥</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Müvekkil Yönetimi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Müvekkil bilgilerini ve iletişim geçmişini organize edin.
              </p>
            </div>
            
            <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📄</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>UYAP Entegrasyonu</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                UYAP sistemine direkt entegrasyon ile evrak takibi yapın.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
