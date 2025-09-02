'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveMessage, setSaveMessage] = useState('');
  
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

  const [features, setFeatures] = useState([
    { id: 1, icon: '⚖️', title: 'Dava Takibi', description: 'Davalarınızı takip edin' },
    { id: 2, icon: '👥', title: 'Müvekkil Yönetimi', description: 'Müvekkillerinizi yönetin' },
    { id: 3, icon: '📄', title: 'UYAP Entegrasyonu', description: 'UYAP bağlantısı' }
  ]);

  const [pricing, setPricing] = useState([
    { id: 1, name: 'Başlangıç', price: 299, features: ['1 Kullanıcı', '50 Dava', '100 GB'] },
    { id: 2, name: 'Profesyonel', price: 699, features: ['5 Kullanıcı', 'Sınırsız Dava', '500 GB'] },
    { id: 3, name: 'Kurumsal', price: 1499, features: ['Sınırsız Kullanıcı', 'Sınırsız Dava', 'Sınırsız'] }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'user', plan: 'Profesyonel', status: 'active', joinDate: '2025-01-15' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'SerhatAdmin', action: 'Giriş yapıldı', details: 'Admin panele giriş', date: new Date().toLocaleString('tr-TR'), ip: '192.168.1.1' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', plan: 'Başlangıç' });
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminAuth');
    if (token === 'SerhatAdmin_authenticated') {
      setIsAuthenticated(true);
      
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
      
      const savedFeatures = localStorage.getItem('features');
      if (savedFeatures) setFeatures(JSON.parse(savedFeatures));
      
      const savedPricing = localStorage.getItem('pricing');
      if (savedPricing) setPricing(JSON.parse(savedPricing));
      
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      
      const savedLogs = localStorage.getItem('auditLogs');
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
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
    setSaveMessage('✅ Ayarlar kaydedildi!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const saveFeatures = () => {
    localStorage.setItem('features', JSON.stringify(features));
    setSaveMessage('✅ Özellikler kaydedildi!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const savePricing = () => {
    localStorage.setItem('pricing', JSON.stringify(pricing));
    setSaveMessage('✅ Fiyatlandırma kaydedildi!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const addFeature = () => {
    const newFeature = { id: Date.now(), icon: '🆕', title: 'Yeni Özellik', description: 'Açıklama' };
    setFeatures([...features, newFeature]);
  };

  const deleteFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const updateFeature = (id: number, field: string, value: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const updatePricing = (id: number, field: string, value: any) => {
    setPricing(pricing.map(p => p.id === id ? { ...p, [field]: value } : p));
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
            style={{width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem'}}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={{width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem'}}
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
    return (
      <>
        {saveMessage && (
          <div style={{position: 'fixed', top: '20px', right: '20px', background: '#10b981', color: 'white', padding: '1rem 1.5rem', borderRadius: '0.5rem', zIndex: 1000}}>
            {saveMessage}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Toplam Kullanıcı</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{users.length}</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Aktif Özellikler</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{features.length}</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Fiyat Planları</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{pricing.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
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
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
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

        {activeTab === 'media' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Logo ve Görseller</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Logo URL</label>
                <input
                  type="text"
                  value={siteSettings.logoUrl}
                  onChange={(e) => setSiteSettings({...siteSettings, logoUrl: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
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

        {activeTab === 'content' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İçerik Yönetimi</h1>
            <button onClick={addFeature} style={{marginBottom: '1rem', padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
              + Yeni Özellik Ekle
            </button>
            {features.map(feature => (
              <div key={feature.id} style={{background: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '80px 1fr 2fr auto', gap: '1rem', alignItems: 'center'}}>
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                  style={{padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', textAlign: 'center'}}
                />
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                  style={{padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                  style={{padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
                <button onClick={() => deleteFeature(feature.id)} style={{padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Sil
                </button>
              </div>
            ))}
            <button onClick={saveFeatures} style={{marginTop: '1rem', padding: '0.75rem 2rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
              Özellikleri Kaydet
            </button>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Fiyatlandırma</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              {pricing.map(plan => (
                <div key={plan.id} style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => updatePricing(plan.id, 'name', e.target.value)}
                    style={{width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '1.25rem', fontWeight: '600'}}
                  />
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePricing(plan.id, 'price', parseInt(e.target.value))}
                    style={{width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                  />
                  <textarea
                    value={plan.features.join('\n')}
                    onChange={(e) => updatePricing(plan.id, 'features', e.target.value.split('\n'))}
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '100px'}}
                  />
                </div>
              ))}
            </div>
            <button onClick={savePricing} style={{marginTop: '2rem', padding: '0.75rem 2rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
              Kaydet
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İletişim Bilgileri</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Telefon</label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>E-posta</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                  style={{width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                />
              </div>
              <button onClick={saveSettings} style={{padding: '0.75rem 2rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                Kaydet
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
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
                  {users.map(user => (
                    <tr key={user.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                      <td style={{padding: '1rem'}}>{user.name}</td>
                      <td style={{padding: '1rem'}}>{user.email}</td>
                      <td style={{padding: '1rem'}}>{user.plan}</td>
                      <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
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
                  {auditLogs.map(log => (
                    <tr key={log.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                      <td style={{padding: '1rem'}}>{log.user}</td>
                      <td style={{padding: '1rem'}}>{log.action}</td>
                      <td style={{padding: '1rem'}}>{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </AdminLayout>
  );
}
