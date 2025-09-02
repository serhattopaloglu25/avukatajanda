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
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
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

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Toplam Kullanıcı</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>156</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Aktif Abonelik</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>89</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Aylık Gelir</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺67,400</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Toplam Dava</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>1,234</p>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Site Ayarları</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Ana Renk</label>
                <input
                  type="color"
                  value={siteSettings.primaryColor}
                  onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                  style={{width: '100px', height: '40px', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Hero Başlık</label>
                <input
                  type="text"
                  value={siteSettings.heroTitle}
                  onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
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
        );

      case 'media':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Logo ve Görseller</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Logo URL</label>
                <input
                  type="text"
                  value={siteSettings.logoUrl}
                  onChange={(e) => setSiteSettings({...siteSettings, logoUrl: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Favicon URL</label>
                <input
                  type="text"
                  value={siteSettings.faviconUrl}
                  onChange={(e) => setSiteSettings({...siteSettings, faviconUrl: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
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
        );

      case 'content':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İçerik Yönetimi</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Hero Alt Başlık</label>
                <textarea
                  value={siteSettings.heroSubtitle}
                  onChange={(e) => setSiteSettings({...siteSettings, heroSubtitle: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '100px'}}
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
        );

      case 'pricing':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Fiyatlandırma</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb'}}>
                <h3>Başlangıç</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺299/ay</p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li>✓ 1 Kullanıcı</li>
                  <li>✓ 50 Dava</li>
                  <li>✓ 100 GB</li>
                </ul>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #0066cc'}}>
                <h3>Profesyonel</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺699/ay</p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li>✓ 5 Kullanıcı</li>
                  <li>✓ Sınırsız Dava</li>
                  <li>✓ 500 GB</li>
                </ul>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb'}}>
                <h3>Kurumsal</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺1499/ay</p>
                <ul style={{listStyle: 'none', padding: 0}}>
                  <li>✓ Sınırsız Kullanıcı</li>
                  <li>✓ Sınırsız Dava</li>
                  <li>✓ Sınırsız Depolama</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İletişim Bilgileri</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Telefon</label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>E-posta</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Adres</label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
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
        );

      case 'users':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Kullanıcı Yönetimi</h1>
            <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc'}}>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Ad Soyad</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>E-posta</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Plan</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Ahmet Yılmaz</td>
                    <td style={{padding: '1rem'}}>ahmet@example.com</td>
                    <td style={{padding: '1rem'}}>Profesyonel</td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Ayşe Demir</td>
                    <td style={{padding: '1rem'}}>ayse@example.com</td>
                    <td style={{padding: '1rem'}}>Başlangıç</td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Audit Log</h1>
            <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc'}}>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Kullanıcı</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>İşlem</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>SerhatAdmin</td>
                    <td style={{padding: '1rem'}}>Site ayarları güncellendi</td>
                    <td style={{padding: '1rem'}}>02.09.2025 14:30</td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>SerhatAdmin</td>
                    <td style={{padding: '1rem'}}>Yeni kullanıcı eklendi</td>
                    <td style={{padding: '1rem'}}>02.09.2025 13:15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </AdminLayout>
  );
}
