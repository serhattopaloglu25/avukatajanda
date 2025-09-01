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

  // Logo Component
  const Logo = () => (
    <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
      {/* Briefcase */}
      <rect x="10" y="15" width="35" height="28" rx="3" fill="#1e3a4a" />
      <rect x="10" y="15" width="35" height="5" fill="#2c5470" />
      <rect x="22" y="10" width="11" height="8" rx="2" fill="none" stroke="#1e3a4a" strokeWidth="2" />
      
      {/* Calendar */}
      <rect x="30" y="8" width="25" height="25" rx="2" fill="#fbbf24" opacity="0.9" />
      <rect x="30" y="8" width="25" height="7" fill="#f59e0b" />
      <text x="42" y="25" fontSize="14" fontWeight="bold" fill="#1e3a4a" textAnchor="middle">15</text>
      <text x="42" y="31" fontSize="6" fill="#1e3a4a" textAnchor="middle">MON</text>
      <circle cx="36" cy="11" r="1" fill="#1e3a4a" />
      <circle cx="48" cy="11" r="1" fill="#1e3a4a" />
      
      {/* AJANDA text on briefcase */}
      <text x="27" y="33" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">AJANDA</text>
      
      {/* AVUKATAJANDA text */}
      <text x="65" y="30" fontSize="20" fontWeight="bold" fill="#1e3a4a">AVUKATAJANDA</text>
      <text x="160" y="30" fontSize="20" fontWeight="300" fill="#9ca3af">.COM</text>
    </svg>
  );

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
            <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
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

      {/* Rest of the page content remains the same... */}
      {/* Features, Pricing, Contact sections... */}
      
    </div>
  );
}
