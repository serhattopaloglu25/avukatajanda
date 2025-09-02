'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userType, setUserType] = useState<'client' | 'lawyer'>('client');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Avukat girişi
    if (userType === 'lawyer') {
      if (formData.email === 'avukat@demo.com' && formData.password === 'demo123') {
        localStorage.setItem('lawyerAuth', JSON.stringify({
          email: formData.email,
          name: 'Demo Avukat',
          role: 'lawyer',
          token: 'lawyer_token_123'
        }));
        router.push('/dashboard');
      } else {
        setError('Geçersiz e-posta veya şifre!');
      }
    } 
    // Müvekkil girişi
    else {
      if (formData.email === 'muvekkil@demo.com' && formData.password === 'demo123') {
        localStorage.setItem('clientAuth', JSON.stringify({
          email: formData.email,
          name: 'Demo Müvekkil',
          role: 'client',
          token: 'client_token_123'
        }));
        router.push('/client-dashboard');
      } else {
        setError('Geçersiz e-posta veya şifre!');
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h1 style={{textAlign: 'center', marginBottom: '2rem', color: '#1e293b'}}>
          AvukatAjanda Giriş
        </h1>

        {/* Kullanıcı tipi seçimi */}
        <div style={{display: 'flex', marginBottom: '2rem', background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.25rem'}}>
          <button
            onClick={() => setUserType('client')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: userType === 'client' ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: userType === 'client' ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            Müvekkil Girişi
          </button>
          <button
            onClick={() => setUserType('lawyer')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: userType === 'lawyer' ? 'white' : 'transparent',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: userType === 'lawyer' ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            Avukat Girişi
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
              E-posta
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder={userType === 'lawyer' ? 'avukat@demo.com' : 'muvekkil@demo.com'}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
              Şifre
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="demo123"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>

          {error && (
            <p style={{color: '#dc2626', marginBottom: '1rem', textAlign: 'center'}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.875rem',
              background: userType === 'lawyer' ? '#0066cc' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {userType === 'lawyer' ? 'Avukat Olarak Giriş Yap' : 'Müvekkil Olarak Giriş Yap'}
          </button>
        </form>

        <div style={{marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem'}}>
          <p>Demo Hesaplar:</p>
          <p>Avukat: avukat@demo.com / demo123</p>
          <p>Müvekkil: muvekkil@demo.com / demo123</p>
        </div>

        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <a href="/" style={{color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem'}}>
            ← Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
