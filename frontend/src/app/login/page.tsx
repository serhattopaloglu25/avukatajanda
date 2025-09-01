'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: '' 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      setError('Email ve şifre gereklidir');
      setIsLoading(false);
      return;
    }

    try {
      // Demo için direkt giriş yap
      if (loginData.email && loginData.password) {
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
        window.location.href = '/dashboard';
        return;
      }
    } catch (err) {
      setError('Giriş hatası');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır');
      setIsLoading(false);
      return;
    }

    try {
      // Demo için direkt kayıt yap ve giriş yap
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({ 
        name: registerData.name,
        email: registerData.email 
      }));
      
      // Dashboard'a yönlendir
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
      
    } catch (err) {
      setError('Kayıt hatası');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    transition: 'border-color 0.15s',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{
          padding: '2rem 2rem 1rem',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <a href="/" style={{textDecoration: 'none', display: 'inline-block'}}>
            <h1 style={{fontSize: '1.75rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>
              AvukatAjanda
            </h1>
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem'}}>
              Hukuk Bürosu Yönetim Sistemi
            </p>
          </a>
        </div>

        {/* Tab Switcher */}
        <div style={{display: 'flex', borderBottom: '1px solid #e5e7eb'}}>
          <button
            onClick={() => {setIsLogin(true); setError('');}}
            style={{
              flex: 1,
              padding: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: isLogin ? '3px solid #667eea' : '3px solid transparent',
              color: isLogin ? '#667eea' : '#6b7280',
              fontWeight: isLogin ? '600' : '400',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => {setIsLogin(false); setError('');}}
            style={{
              flex: 1,
              padding: '1rem',
              background: 'transparent',
              border: 'none',
              borderBottom: !isLogin ? '3px solid #667eea' : '3px solid transparent',
              color: !isLogin ? '#667eea' : '#6b7280',
              fontWeight: !isLogin ? '600' : '400',
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Form Content */}
        <div style={{padding: '2rem'}}>
          {error && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '0.375rem',
              color: '#991b1b',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="email" style={labelStyle}>
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="ornek@avukatajanda.com"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="password" style={labelStyle}>
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.5rem', textAlign: 'right'}}>
                <a href="#" style={{
                  color: '#667eea',
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}>
                  Şifremi Unuttum
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s',
                  transform: isLoading ? 'scale(1)' : 'scale(1)'
                }}
                onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
              
              <div style={{marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center'}}>
                Demo: Herhangi bir email/şifre ile giriş yapabilirsiniz
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="name" style={labelStyle}>
                  Ad Soyad
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  placeholder="Ahmet Yılmaz"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="reg-email" style={labelStyle}>
                  E-posta Adresi
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  placeholder="ornek@avukatajanda.com"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="phone" style={labelStyle}>
                  Telefon (Opsiyonel)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  placeholder="0555 555 55 55"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.25rem'}}>
                <label htmlFor="reg-password" style={labelStyle}>
                  Şifre (En az 8 karakter)
                </label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  minLength={8}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label htmlFor="confirm-password" style={labelStyle}>
                  Şifre Tekrar
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={8}
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isLoading ? 'Kayıt yapılıyor...' : '14 Gün Ücretsiz Başla'}
              </button>

              <p style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                Kayıt olarak <a href="#" style={{color: '#667eea'}}>Kullanım Şartları</a>'nı kabul edersiniz
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
