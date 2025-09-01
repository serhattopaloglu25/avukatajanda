'use client';

import { useEffect, useState } from 'react';
import { Logo } from './components/Logo';

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

      {/* Hero Section ve geri kalan içerik aynı kalacak */}
    </div>
  );
}
