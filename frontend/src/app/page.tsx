'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    document.documentElement.style.scrollBehavior = 'smooth';
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
  };

  // Logo Component inline
  const Logo = () => (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <div style={{position: 'relative', width: '50px', height: '40px'}}>
        {/* Briefcase */}
        <div style={{
          position: 'absolute',
          width: '35px',
          height: '30px',
          background: '#1e3a4a',
          borderRadius: '4px',
          bottom: '0',
          left: '0'
        }}>
          <div style={{
            width: '10px',
            height: '5px',
            background: '#1e3a4a',
            position: 'absolute',
            top: '-3px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '2px 2px 0 0'
          }}></div>
          <span style={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '8px',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>AJANDA</span>
        </div>
        
        {/* Calendar */}
        <div style={{
          position: 'absolute',
          width: '28px',
          height: '28px',
          background: '#fbbf24',
          borderRadius: '3px',
          top: '0',
          right: '0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            background: '#f59e0b',
            height: '8px',
            borderRadius: '3px 3px 0 0'
          }}></div>
          <div style={{
            textAlign: 'center',
            paddingTop: '2px'
          }}>
            <div style={{fontSize: '14px', fontWeight: 'bold', color: '#1e3a4a'}}>15</div>
            <div style={{fontSize: '6px', color: '#1e3a4a'}}>MON</div>
          </div>
        </div>
      </div>
      
      <div>
        <span style={{fontSize: '20px', fontWeight: 'bold', color: '#1e3a4a'}}>AVUKATAJANDA</span>
        <span style={{fontSize: '20px', fontWeight: '300', color: '#9ca3af'}}>.COM</span>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
            <a href="/" style={{textDecoration: 'none'}}>
              <Logo />
            </a>
            <div style={{display: 'flex', gap: '2rem'}}>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>Özellikler</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>Fiyatlandırma</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>İletişim</a>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            {isLoggedIn ? (
              <>
                <span style={{color: '#475569', fontSize: '0.875rem'}}>
                  Hoşgeldin, {user?.name || user?.email?.split('@')[0]}
                </span>
                <a href="/dashboard" style={{color: '#475569', textDecoration: 'none'}}>Dashboard</a>
                <button onClick={handleLogout} style={{background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.875rem'}}>
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
            Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin
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
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{border: '2px solid #e5e7eb', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', color: '#475569'}}>
                  Demo Talep Et
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
