'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}}>
      {/* Header with Logo */}
      <header style={{background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <a href="/" style={{display: 'inline-flex', alignItems: 'center', textDecoration: 'none'}}>
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Crect x='5' y='10' width='30' height='25' rx='2' fill='%23203a4a'/%3E%3Crect x='15' y='5' width='25' height='20' rx='2' fill='%23ffc107' opacity='0.8'/%3E%3Ctext x='45' y='25' font-family='Arial' font-size='10' fill='white'%3EAJANDA%3C/text%3E%3Ctext x='45' y='35' font-family='Arial' font-size='18' font-weight='bold' fill='%23203a4a'%3EAVUKATAJANDA%3C/text%3E%3C/svg%3E" 
              alt="AvukatAjanda" 
              style={{height: '40px'}}
            />
          </a>
        </div>
      </header>

      {/* Login/Register Form */}
      <div style={{maxWidth: '400px', margin: '5rem auto', padding: '0 1rem'}}>
        <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem'}}>
          
          {/* Tab Switcher */}
          <div style={{display: 'flex', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb'}}>
            <button 
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                borderBottom: isLogin ? '2px solid #0ea5e9' : 'none',
                color: isLogin ? '#0ea5e9' : '#64748b',
                fontWeight: isLogin ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Giriş Yap
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                borderBottom: !isLogin ? '2px solid #0ea5e9' : 'none',
                color: !isLogin ? '#0ea5e9' : '#64748b',
                fontWeight: !isLogin ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Üye Ol
            </button>
          </div>

          {isLogin ? (
            // Login Form
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  E-posta
                </label>
                <input 
                  type="email" 
                  placeholder="ornek@email.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  Şifre
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Giriş Yap
              </button>

              <div style={{marginTop: '1rem', textAlign: 'center'}}>
                <a href="#" style={{color: '#0ea5e9', fontSize: '0.875rem', textDecoration: 'none'}}>
                  Şifremi Unuttum
                </a>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  Ad Soyad
                </label>
                <input 
                  type="text" 
                  placeholder="Ad Soyad"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  E-posta
                </label>
                <input 
                  type="email" 
                  placeholder="ornek@email.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  Telefon
                </label>
                <input 
                  type="tel" 
                  placeholder="0555 555 5555"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500'}}>
                  Şifre
                </label>
                <input 
                  type="password" 
                  placeholder="En az 8 karakter"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                14 Gün Ücretsiz Başla
              </button>

              <div style={{marginTop: '1rem', fontSize: '0.75rem', color: '#64748b', textAlign: 'center'}}>
                Üye olarak <a href="#" style={{color: '#0ea5e9'}}>Kullanım Koşulları</a>'nı kabul etmiş olursunuz.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
