'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

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
        </nav>
        <button
          onClick={() => window.location.href = '/'}
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
          Çıkış
        </button>
      </div>

      {/* Main Content */}
      <div style={{flex: 1, padding: '2rem'}}>
        {activeSection === 'dashboard' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Toplam Kullanıcı</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>156</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Aktif Davalar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>24</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Aylık Gelir</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>₺45,600</p>
              </div>
              <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
                <h3 style={{color: '#6b7280', fontSize: '0.875rem'}}>Yeni Kayıtlar</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>12</p>
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
              >
                Kaydet
              </button>
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
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Kullanıcı Yönetimi</h1>
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
                    <td style={{padding: '1rem'}}>Admin User</td>
                    <td style={{padding: '1rem'}}>admin@avukatajanda.com</td>
                    <td style={{padding: '1rem'}}>Super Admin</td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                    <td style={{padding: '1rem'}}>
                      <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>Düzenle</button>
                      <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>Sil</button>
                    </td>
                  </tr>
                  <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '1rem'}}>Ahmet Yılmaz</td>
                    <td style={{padding: '1rem'}}>ahmet@example.com</td>
                    <td style={{padding: '1rem'}}>Editor</td>
                    <td style={{padding: '1rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
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
