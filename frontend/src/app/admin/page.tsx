'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Site ayarları
  const [settings, setSettings] = useState({
    primary_color: '#0066cc',
    secondary_color: '#64748b',
    hero_title: 'Hukuk Büronuz İçin Komple Çözüm',
    hero_subtitle: 'Bulut tabanlı hukuk bürosu yazılımı'
  });

  useEffect(() => {
    // Auth kontrolü
    const token = localStorage.getItem('adminAuth');
    if (token === 'SerhatAdmin_authenticated') {
      setIsAuthenticated(true);
    }
    
    // Kayıtlı ayarları yükle
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'SerhatAdmin' && loginData.password === 'Serhat25') {
      localStorage.setItem('adminAuth', 'SerhatAdmin_authenticated');
      setIsAuthenticated(true);
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const saveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('Ayarlar kaydedildi! Ana sayfayı yenileyin.');
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'system-ui'
      }}>
        <form onSubmit={handleLogin} style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Admin Panel</h1>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6'}}>
      {/* Sidebar */}
      <div style={{width: '250px', background: '#1f2937', padding: '2rem 1rem', color: 'white'}}>
        <h2>Admin Panel</h2>
        <nav style={{marginTop: '2rem'}}>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: activeTab === 'settings' ? '#374151' : 'transparent',
              border: 'none',
              color: 'white',
              textAlign: 'left',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              marginBottom: '0.5rem'
            }}
          >
            Site Ayarları
          </button>
        </nav>
        <button onClick={handleLogout} style={{
          width: '100%',
          marginTop: '2rem',
          padding: '0.75rem',
          background: '#dc2626',
          border: 'none',
          color: 'white',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          Çıkış Yap
        </button>
      </div>

      {/* Content */}
      <div style={{flex: 1, padding: '2rem'}}>
        <h1>Site Ayarları</h1>
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginTop: '2rem'}}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>Ana Renk</label>
            <input
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
              style={{width: '100px', height: '40px'}}
            />
          </div>
          
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>İkincil Renk</label>
            <input
              type="color"
              value={settings.secondary_color}
              onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
              style={{width: '100px', height: '40px'}}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>Ana Başlık</label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}
            />
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>Alt Başlık</label>
            <input
              type="text"
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({...settings, hero_subtitle: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}
            />
          </div>

          <button onClick={saveSettings} style={{
            padding: '0.75rem 2rem',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
