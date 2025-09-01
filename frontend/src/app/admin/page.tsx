'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.avukatajanda.com';

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/admin/login';
    }
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`${API_BASE}/api/admin/settings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setSettings(data);
  };

  const updateSettings = async (newSettings: any) => {
    setIsLoading(true);
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`${API_BASE}/api/admin/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSettings)
    });
    
    if (res.ok) {
      alert('Ayarlar güncellendi');
      loadSettings();
    }
    setIsLoading(false);
  };

  const Sidebar = () => (
    <div style={{
      width: '250px',
      background: '#1f2937',
      height: '100vh',
      padding: '2rem 1rem',
      color: 'white'
    }}>
      <h2 style={{marginBottom: '2rem', fontSize: '1.5rem'}}>Admin Panel</h2>
      <nav style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <button
          onClick={() => setActiveSection('dashboard')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'dashboard' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setActiveSection('settings')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'settings' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          ⚙️ Site Ayarları
        </button>
        <button
          onClick={() => setActiveSection('content')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'content' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          📝 İçerik Yönetimi
        </button>
        <button
          onClick={() => setActiveSection('modules')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'modules' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          📦 Modüller
        </button>
        <button
          onClick={() => setActiveSection('users')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'users' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          👥 Kullanıcılar
        </button>
        <button
          onClick={() => setActiveSection('files')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'files' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          📁 Dosyalar
        </button>
        <button
          onClick={() => setActiveSection('logs')}
          style={{
            padding: '0.75rem',
            background: activeSection === 'logs' ? '#374151' : 'transparent',
            border: 'none',
            color: 'white',
            textAlign: 'left',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          📋 Loglar
        </button>
      </nav>
    </div>
  );

  const SettingsPanel = () => (
    <div style={{padding: '2rem'}}>
      <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>Site Ayarları</h2>
      
      <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
        <h3 style={{marginBottom: '1rem'}}>Görünüm Ayarları</h3>
        
        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem'}}>Ana Renk</label>
          <input
            type="color"
            value={settings.primary_color || '#0066cc'}
            onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
            style={{width: '100px', height: '40px', border: '1px solid #ddd', borderRadius: '4px'}}
          />
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem'}}>Logo URL</label>
          <input
            type="text"
            value={settings.logo_url || ''}
            onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
          />
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem'}}>Hero Başlık</label>
          <input
            type="text"
            value={settings.hero_title || ''}
            onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
          />
        </div>

        <button
          onClick={() => updateSettings(settings)}
          disabled={isLoading}
          style={{
            background: '#0066cc',
            color: 'white',
            padding: '0.75rem 2rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );

  const ContentPanel = () => {
    const [content, setContent] = useState<any>({});
    
    return (
      <div style={{padding: '2rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>İçerik Yönetimi</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
            <h3>Özellikler Bölümü</h3>
            <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px'}}>
              Düzenle
            </button>
          </div>
          
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
            <h3>Fiyatlandırma Bölümü</h3>
            <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px'}}>
              Düzenle
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ModulesPanel = () => (
    <div style={{padding: '2rem'}}>
      <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>Modüller</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📁</div>
          <h3>Davalar</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>24</p>
        </div>
        
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👥</div>
          <h3>Müvekkiller</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>67</p>
        </div>
        
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📄</div>
          <h3>Belgeler</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>156</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'settings':
        return <SettingsPanel />;
      case 'content':
        return <ContentPanel />;
      case 'modules':
        return <ModulesPanel />;
      default:
        return (
          <div style={{padding: '2rem'}}>
            <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3>Toplam Kullanıcı</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>156</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3>Aktif Davalar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>24</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3>Aylık Gelir</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺45,600</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3>Yeni Kayıtlar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>12</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}}>
      <Sidebar />
      <div style={{flex: 1, overflow: 'auto'}}>
        {renderContent()}
      </div>
    </div>
  );
}
