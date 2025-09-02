'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#0066cc',
    secondaryColor: '#64748b',
    heroTitle: 'Hukuk Büronuz İçin Komple Çözüm',
    heroSubtitle: 'Bulut tabanlı hukuk bürosu yazılımı',
    phone: '0850 123 45 67',
    email: 'destek@avukatajanda.com',
    address: 'Levent, İstanbul'
  });

  useEffect(() => {
    const token = localStorage.getItem('adminAuth');
    if (token === 'SerhatAdmin_authenticated') {
      setIsAuthenticated(true);
      const saved = localStorage.getItem('siteSettings');
      if (saved) setSiteSettings(JSON.parse(saved));
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
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    alert('Ayarlar kaydedildi!');
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)'
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
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'dashboard' && (
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
            <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
              <h3>Toplam Kullanıcı</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold'}}>156</p>
            </div>
            <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
              <h3>Aktif Abonelik</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold'}}>89</p>
            </div>
            <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
              <h3>Aylık Gelir</h3>
              <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺67,400</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Site Ayarları</h1>
          <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
            <div style={{marginBottom: '1.5rem'}}>
              <label>Ana Renk</label>
              <input
                type="color"
                value={siteSettings.primaryColor}
                onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                style={{display: 'block', marginTop: '0.5rem', width: '100px', height: '40px'}}
              />
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <label>Hero Başlık</label>
              <input
                type="text"
                value={siteSettings.heroTitle}
                onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}
                style={{width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
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
      )}

      {activeTab === 'contact' && (
        <div>
          <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İletişim Bilgileri</h1>
          <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
            <div style={{marginBottom: '1.5rem'}}>
              <label>Telefon</label>
              <input
                type="text"
                value={siteSettings.phone}
                onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                style={{width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <label>E-posta</label>
              <input
                type="email"
                value={siteSettings.email}
                onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                style={{width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
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
      )}
    </AdminLayout>
  );
}
