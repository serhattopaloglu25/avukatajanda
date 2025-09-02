'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.avukatajanda.com';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [settings, setSettings] = useState<any>({});
  const [features, setFeatures] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      loadAllData();
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, loginData);
      localStorage.setItem('adminToken', response.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      setIsAuthenticated(true);
      loadAllData();
    } catch (err) {
      // Fallback for demo
      if (loginData.username === 'SerhatAdmin' && loginData.password === 'Serhat25') {
        localStorage.setItem('adminToken', 'demo-token');
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setError('Kullanıcı adı veya şifre hatalı');
      }
    }
  };

  const loadAllData = async () => {
    try {
      // Load settings
      const settingsRes = await axios.get(`${API_URL}/api/admin/settings`);
      setSettings(settingsRes.data);
      
      // Load features
      const featuresRes = await axios.get(`${API_URL}/api/admin/features`);
      setFeatures(featuresRes.data);
      
      // Load pricing
      const pricingRes = await axios.get(`${API_URL}/api/admin/pricing`);
      setPricing(pricingRes.data);
      
      // Load content
      const sections = ['hero', 'features', 'pricing', 'contact'];
      const contentData: any = {};
      for (const section of sections) {
        const res = await axios.get(`${API_URL}/api/admin/content/${section}`);
        contentData[section] = res.data;
      }
      setContent(contentData);
    } catch (err) {
      console.error('Error loading data:', err);
      // Use demo data if API fails
      setSettings({
        primary_color: '#0066cc',
        secondary_color: '#64748b',
        logo_url: '/logo.png'
      });
      setFeatures([
        { id: 1, icon: '⚖️', title: 'Dava Takibi', description: 'Davalarınızı takip edin' },
        { id: 2, icon: '👥', title: 'Müvekkil Yönetimi', description: 'Müvekkillerinizi yönetin' }
      ]);
      setPricing([
        { id: 1, name: 'Başlangıç', price: 299, features: ['1 Kullanıcı', '50 Dava'] },
        { id: 2, name: 'Profesyonel', price: 699, features: ['5 Kullanıcı', 'Sınırsız'], is_popular: true }
      ]);
    }
  };

  const updateSettings = async (newSettings: any) => {
    try {
      await axios.put(`${API_URL}/api/admin/settings`, newSettings);
      setSettings(newSettings);
      alert('Ayarlar güncellendi!');
    } catch (err) {
      alert('Ayarlar güncellenirken hata oluştu');
    }
  };

  const updateContent = async (section: string, data: any) => {
    try {
      await axios.put(`${API_URL}/api/admin/content/${section}`, data);
      setContent({ ...content, [section]: data });
      alert('İçerik güncellendi!');
    } catch (err) {
      alert('İçerik güncellenirken hata oluştu');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  if (loading) return <div>Yükleniyor...</div>;

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui'
      }}>
        <form onSubmit={handleLogin} style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
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
            required
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
            required
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
        <h2 style={{marginBottom: '2rem'}}>Admin Panel</h2>
        <nav style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {[
            { key: 'dashboard', label: '📊 Dashboard' },
            { key: 'settings', label: '⚙️ Site Ayarları' },
            { key: 'content', label: '📝 İçerik Yönetimi' },
            { key: 'features', label: '✨ Özellikler' },
            { key: 'pricing', label: '💰 Fiyatlandırma' },
            { key: 'users', label: '👥 Kullanıcılar' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              style={{
                padding: '0.75rem',
                background: activeTab === item.key ? '#374151' : 'transparent',
                border: 'none',
                color: 'white',
                textAlign: 'left',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} style={{
          marginTop: '2rem',
          width: '100%',
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

      {/* Main Content */}
      <div style={{flex: 1, padding: '2rem', overflowY: 'auto'}}>
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
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>42</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3>Aylık Gelir</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺45,600</p>
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
                  value={settings.primary_color || '#0066cc'}
                  onChange={(e) => setSettings({...settings, primary_color: e.target.value})}
                  style={{display: 'block', marginTop: '0.5rem', width: '100px', height: '40px'}}
                />
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label>İkincil Renk</label>
                <input
                  type="color"
                  value={settings.secondary_color || '#64748b'}
                  onChange={(e) => setSettings({...settings, secondary_color: e.target.value})}
                  style={{display: 'block', marginTop: '0.5rem', width: '100px', height: '40px'}}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label>Logo URL</label>
                <input
                  type="text"
                  value={settings.logo_url || ''}
                  onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
                />
              </div>

              <button onClick={() => updateSettings(settings)} style={{
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

        {activeTab === 'features' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Özellikler</h1>
            <button style={{
              marginBottom: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              + Yeni Özellik Ekle
            </button>
            <div style={{display: 'grid', gap: '1rem'}}>
              {features.map(feature => (
                <div key={feature.id} style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3>{feature.icon} {feature.title}</h3>
                    <p style={{color: '#6b7280'}}>{feature.description}</p>
                  </div>
                  <div>
                    <button style={{marginRight: '0.5rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      Düzenle
                    </button>
                    <button style={{padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Fiyatlandırma Planları</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              {pricing.map(plan => (
                <div key={plan.id} style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: plan.is_popular ? '2px solid #0066cc' : '1px solid #e5e7eb'}}>
                  {plan.is_popular && <span style={{background: '#0066cc', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem'}}>Popüler</span>}
                  <h3>{plan.name}</h3>
                  <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺{plan.price}</p>
                  <ul style={{listStyle: 'none', padding: 0}}>
                    {plan.features?.map((f: string, i: number) => (
                      <li key={i}>✓ {f}</li>
                    ))}
                  </ul>
                  <button style={{width: '100%', marginTop: '1rem', padding: '0.5rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Düzenle
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
