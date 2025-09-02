'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Check if already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken === 'authenticated_SerhatAdmin') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (loginData.username === 'SerhatAdmin' && loginData.password === 'Serhat25') {
      localStorage.setItem('adminToken', 'authenticated_SerhatAdmin');
      setIsAuthenticated(true);
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  if (isLoading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Login Form
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
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h1 style={{textAlign: 'center', marginBottom: '2rem', color: '#1f2937'}}>Admin Panel</h1>
          
          <form onSubmit={handleLogin}>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '1rem'
                }}
                required
                autoFocus
              />
            </div>
            
            <div style={{marginBottom: '2rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>
                Şifre
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            {loginError && (
              <div style={{
                padding: '0.75rem',
                marginBottom: '1rem',
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '0.375rem',
                color: '#991b1b',
                fontSize: '0.875rem'
              }}>
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.875rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Giriş Yap
            </button>
          </form>
          
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <a href="/" style={{color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none'}}>
              ← Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui'}}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: '#1f2937',
        padding: '2rem 1rem',
        color: 'white'
      }}>
        <h2 style={{marginBottom: '2rem'}}>Admin Panel</h2>
        <p style={{fontSize: '0.875rem', color: '#9ca3af', marginBottom: '2rem'}}>
          Hoşgeldin, SerhatAdmin
        </p>
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
        </nav>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '2rem',
            padding: '0.75rem',
            background: '#dc2626',
            border: 'none',
            color: 'white',
            width: '100%',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Çıkış Yap
        </button>
      </div>

      {/* Main Content */}
      <div style={{flex: 1, padding: '2rem', overflowY: 'auto'}}>
        {activeSection === 'dashboard' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Toplam Kullanıcı</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>156</p>
                <span style={{color: '#10b981', fontSize: '0.875rem'}}>↑ 12% bu ay</span>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Aktif Davalar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>24</p>
                <span style={{color: '#0066cc', fontSize: '0.875rem'}}>8 yeni dava</span>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Aylık Gelir</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>₺45,600</p>
                <span style={{color: '#10b981', fontSize: '0.875rem'}}>↑ 23% artış</span>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Belgeler</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>312</p>
                <span style={{color: '#6b7280', fontSize: '0.875rem'}}>42 GB kullanımda</span>
              </div>
            </div>

            <h2 style={{fontSize: '1.5rem', marginTop: '3rem', marginBottom: '1rem'}}>Son Aktiviteler</h2>
            <div style={{background: 'white', borderRadius: '0.5rem', padding: '1rem'}}>
              <div style={{padding: '1rem', borderBottom: '1px solid #e5e7eb'}}>
                <p style={{fontWeight: '500'}}>Yeni kullanıcı kaydı</p>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Ahmet Yılmaz - 5 dakika önce</p>
              </div>
              <div style={{padding: '1rem', borderBottom: '1px solid #e5e7eb'}}>
                <p style={{fontWeight: '500'}}>Dava güncellendi</p>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Boşanma Davası #2023/456 - 1 saat önce</p>
              </div>
              <div style={{padding: '1rem'}}>
                <p style={{fontWeight: '500'}}>Yeni belge yüklendi</p>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Vekalet.pdf - 2 saat önce</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Site Ayarları</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Site Başlığı</label>
                <input
                  type="text"
                  defaultValue="AvukatAjanda - Hukuk Bürosu Yönetim Sistemi"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Ana Renk</label>
                <input
                  type="color"
                  defaultValue="#0066cc"
                  style={{
                    width: '100px',
                    height: '40px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Logo URL</label>
                <input
                  type="text"
                  placeholder="/logo.png"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
              </div>

              <button
                style={{
                  background: '#0066cc',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
                onClick={() => alert('Ayarlar kaydedildi!')}
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        {activeSection === 'modules' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Modüller</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📁</div>
                <h3>Davalar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>24</p>
                <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Yönet
                </button>
              </div>
              
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👥</div>
                <h3>Müvekkiller</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>67</p>
                <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Yönet
                </button>
              </div>
              
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📄</div>
                <h3>Belgeler</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>156</p>
                <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Yönet
                </button>
              </div>

              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📅</div>
                <h3>Takvim</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>8</p>
                <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Yönet
                </button>
              </div>

              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💰</div>
                <h3>Faturalama</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#0066cc'}}>₺45.6K</p>
                <button style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066cc', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}>
                  Yönet
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'files' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dosya Yönetimi</h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <button style={{
                marginBottom: '2rem',
                padding: '0.75rem 1.5rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}>
                + Yeni Dosya Yükle
              </button>
              
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '2px solid #e5e7eb'}}>
                    <th style={{padding: '0.75rem', textAlign: 'left'}}>Dosya Adı</th>
                    <th style={{padding: '0.75rem', textAlign: 'left'}}>Boyut</th>
                    <th style={{padding: '0.75rem', textAlign: 'left'}}>Tarih</th>
                    <th style={{padding: '0.75rem', textAlign: 'left'}}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '0.75rem'}}>📄 Vekalet.pdf</td>
                    <td style={{padding: '0.75rem'}}>2.3 MB</td>
                    <td style={{padding: '0.75rem'}}>01.09.2025</td>
                    <td style={{padding: '0.75rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>İndir</button>
                      <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>Sil</button>
                    </td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '0.75rem'}}>📄 Dilekce.docx</td>
                    <td style={{padding: '0.75rem'}}>156 KB</td>
                    <td style={{padding: '0.75rem'}}>31.08.2025</td>
                    <td style={{padding: '0.75rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>İndir</button>
                      <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>Sil</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'content' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>İçerik Yönetimi</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Ana Sayfa Hero</h3>
                <p style={{color: '#6b7280', marginBottom: '1rem'}}>Ana sayfa başlık ve açıklama metinleri</p>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}>
                  Düzenle
                </button>
              </div>
              
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Özellikler</h3>
                <p style={{color: '#6b7280', marginBottom: '1rem'}}>Özellikler bölümü içerikleri</p>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}>
                  Düzenle
                </button>
              </div>

              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Fiyatlandırma</h3>
                <p style={{color: '#6b7280', marginBottom: '1rem'}}>Paket ve fiyat bilgileri</p>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}>
                  Düzenle
                </button>
              </div>

              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
                <h3 style={{marginBottom: '1rem'}}>İletişim</h3>
                <p style={{color: '#6b7280', marginBottom: '1rem'}}>İletişim bilgileri ve form</p>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}>
                  Düzenle
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Kullanıcı Yönetimi</h1>
            <button style={{
              marginBottom: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              + Yeni Kullanıcı Ekle
            </button>
            <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Ad Soyad</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Email</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Rol</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>Durum</th>
                    <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Serhat Admin</td>
                    <td style={{padding: '1rem'}}>serhat@avukatajanda.com</td>
                    <td style={{padding: '1rem'}}><span style={{background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem'}}>Super Admin</span></td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>● Aktif</span></td>
                    <td style={{padding: '1rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>Düzenle</button>
                    </td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Ahmet Yılmaz</td>
                    <td style={{padding: '1rem'}}>ahmet@example.com</td>
                    <td style={{padding: '1rem'}}><span style={{background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem'}}>Editor</span></td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>● Aktif</span></td>
                    <td style={{padding: '1rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>Düzenle</button>
                      <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>Sil</button>
                    </td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Ayşe Demir</td>
                    <td style={{padding: '1rem'}}>ayse@example.com</td>
                    <td style={{padding: '1rem'}}><span style={{background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem'}}>User</span></td>
                    <td style={{padding: '1rem'}}><span style={{color: '#6b7280'}}>● Pasif</span></td>
                    <td style={{padding: '1rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>Düzenle</button>
                      <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>Sil</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
