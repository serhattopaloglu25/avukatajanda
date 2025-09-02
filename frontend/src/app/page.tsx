'use client';

import { useState } from 'react';

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userType, setUserType] = useState<'client' | 'lawyer'>('client');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: ''
  });

  const settings = {
    primaryColor: '#0066cc',
    secondaryColor: '#64748b',
    heroTitle: 'Hukuk Büronuz İçin Komple Çözüm',
    heroSubtitle: 'Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'lawyer' && loginData.email && loginData.password) {
      localStorage.setItem('lawyerAuth', JSON.stringify({
        email: loginData.email,
        name: 'Avukat Kullanıcı',
        role: 'lawyer'
      }));
      window.location.href = '/dashboard';
    } else if (userType === 'client' && loginData.email && loginData.password) {
      localStorage.setItem('clientAuth', JSON.stringify({
        email: loginData.email,
        name: 'Müvekkil Kullanıcı',
        role: 'client'
      }));
      window.location.href = '/client-dashboard';
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    // Kayıt işlemi simülasyonu
    alert('Kayıt başarılı! Giriş yapabilirsiniz.');
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Modal Background */}
      {(showLoginModal || showRegisterModal) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => {setShowLoginModal(false); setShowRegisterModal(false)}}>
          
          {/* Login Modal */}
          {showLoginModal && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2.5rem',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{marginBottom: '1.5rem', fontSize: '1.75rem', textAlign: 'center'}}>Giriş Yap</h2>
              
              <div style={{display: 'flex', marginBottom: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.25rem'}}>
                <button onClick={() => setUserType('client')} style={{
                  flex: 1, padding: '0.75rem', background: userType === 'client' ? 'white' : 'transparent',
                  border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: userType === 'client' ? '600' : '400'
                }}>Müvekkil</button>
                <button onClick={() => setUserType('lawyer')} style={{
                  flex: 1, padding: '0.75rem', background: userType === 'lawyer' ? 'white' : 'transparent',
                  border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: userType === 'lawyer' ? '600' : '400'
                }}>Avukat</button>
              </div>

              <form onSubmit={handleLogin}>
                <input type="email" placeholder="E-posta" required value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                <input type="password" placeholder="Şifre" required value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                
                <button type="submit" style={{
                  width: '100%', padding: '0.875rem', background: settings.primaryColor, color: 'white',
                  border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '1rem'
                }}>Giriş Yap</button>
              </form>

              <div style={{marginBottom: '1rem'}}>
                <button style={{
                  width: '100%', padding: '0.875rem', background: 'white', color: '#333',
                  border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem'
                }}>
                  <img src="https://www.google.com/favicon.ico" alt="Google" style={{width: '20px', height: '20px'}} />
                  Google ile Giriş Yap
                </button>
                <button style={{
                  width: '100%', padding: '0.875rem', background: 'black', color: 'white',
                  border: 'none', borderRadius: '0.5rem', fontSize: '1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                  🍎 Apple ile Giriş Yap
                </button>
              </div>

              <p style={{textAlign: 'center', color: '#6b7280'}}>
                Hesabın yok mu? 
                <button onClick={() => {setShowLoginModal(false); setShowRegisterModal(true);}} 
                  style={{color: settings.primaryColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600'}}>
                  Üye Ol
                </button>
              </p>
            </div>
          )}

          {/* Register Modal */}
          {showRegisterModal && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2.5rem',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{marginBottom: '1.5rem', fontSize: '1.75rem', textAlign: 'center'}}>Üye Ol</h2>
              
              <div style={{display: 'flex', marginBottom: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.25rem'}}>
                <button onClick={() => setUserType('client')} style={{
                  flex: 1, padding: '0.75rem', background: userType === 'client' ? 'white' : 'transparent',
                  border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: userType === 'client' ? '600' : '400'
                }}>Müvekkil</button>
                <button onClick={() => setUserType('lawyer')} style={{
                  flex: 1, padding: '0.75rem', background: userType === 'lawyer' ? 'white' : 'transparent',
                  border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: userType === 'lawyer' ? '600' : '400'
                }}>Avukat</button>
              </div>

              <form onSubmit={handleRegister}>
                <input type="text" placeholder="Ad Soyad" required value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                <input type="email" placeholder="E-posta" required value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                <input type="tel" placeholder="Telefon" required value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                <input type="password" placeholder="Şifre" required value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                <input type="password" placeholder="Şifre Tekrar" required value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  style={{width: '100%', padding: '0.875rem', marginBottom: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem'}}
                />
                
                <button type="submit" style={{
                  width: '100%', padding: '0.875rem', background: settings.primaryColor, color: 'white',
                  border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginBottom: '1rem'
                }}>Üye Ol</button>
              </form>

              <p style={{textAlign: 'center', color: '#6b7280'}}>
                Zaten hesabın var mı? 
                <button onClick={() => {setShowRegisterModal(false); setShowLoginModal(true);}} 
                  style={{color: settings.primaryColor, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600'}}>
                  Giriş Yap
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{height: '72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: settings.primaryColor, margin: 0}}>
              AvukatAjanda
            </h1>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <button onClick={() => setShowLoginModal(true)} style={{
                padding: '0.5rem 1.25rem',
                background: 'white',
                color: settings.primaryColor,
                border: `2px solid ${settings.primaryColor}`,
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                Giriş Yap
              </button>
              <button onClick={() => setShowRegisterModal(true)} style={{
                padding: '0.5rem 1.25rem',
                background: settings.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                Üye Ol
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{padding: '5rem 1rem', background: 'linear-gradient(to bottom, #f8fafc, white)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '3rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
            {settings.heroTitle}
          </h2>
          <p style={{fontSize: '1.25rem', color: settings.secondaryColor, maxWidth: '800px', margin: '0 auto 3rem'}}>
            {settings.heroSubtitle}
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <button onClick={() => setShowRegisterModal(true)} style={{
              background: settings.primaryColor,
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1.125rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              14 Gün Ücretsiz Dene
            </button>
            <button style={{
              border: `2px solid #e5e7eb`,
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              background: 'white',
              color: settings.secondaryColor,
              fontSize: '1.125rem',
              cursor: 'pointer'
            }}>
              Demo Talep Et
            </button>
          </div>
        </div>
      </section>

      {/* Features - Pricing - Contact sections... */}
    </div>
  );
}
