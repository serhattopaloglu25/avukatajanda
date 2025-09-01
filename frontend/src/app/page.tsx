'use client';

import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';

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
            <a href="/" style={{textDecoration: 'none'}}>
              <Logo size={isMobile ? 'small' : 'normal'} />
            </a>

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
                    <a href="/login" style={{background: '#3498db', color: 'white', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none'}}>
                      Ücretsiz Dene
                    </a>
                  </>
                )}
              </div>
            )}

            {isMobile && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{background: 'none', border: 'none', padding: '8px', cursor: 'pointer'}}
              >
                <div style={{width: '24px', height: '2px', background: '#2c3e50', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#2c3e50', marginBottom: '5px'}}></div>
                <div style={{width: '24px', height: '2px', background: '#2c3e50'}}></div>
              </button>
            )}
          </div>

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
                    <a href="/login" style={{background: '#3498db', color: 'white', padding: '0.75rem', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', display: 'block'}}>
                      Ücretsiz Dene
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Rest of the page content... */}
    </div>
  );
}
