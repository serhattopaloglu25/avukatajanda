'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('clientAuth');
    if (!auth) {
      router.push('/');
    } else {
      setUser(JSON.parse(auth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('clientAuth');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div style={{minHeight: '100vh', background: '#f3f4f6'}}>
      {/* Header */}
      <nav style={{background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc'}}>AvukatAjanda - Müvekkil Paneli</h1>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <span>Hoş geldin, {user.name || user.email}</span>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              Çıkış
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>Müvekkil Dashboard</h2>
        
        {/* Stats */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Aktif Davalarım</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold'}}>3</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Yaklaşan Duruşma</h3>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>15 Eylül 2025</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Belgelerim</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold'}}>12</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Ödemeler</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold'}}>₺5,500</p>
          </div>
        </div>

        {/* My Cases */}
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Davalarım</h3>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #e5e7eb'}}>
                <th style={{padding: '0.75rem', textAlign: 'left'}}>Dava No</th>
                <th style={{padding: '0.75rem', textAlign: 'left'}}>Konu</th>
                <th style={{padding: '0.75rem', textAlign: 'left'}}>Avukat</th>
                <th style={{padding: '0.75rem', textAlign: 'left'}}>Durum</th>
                <th style={{padding: '0.75rem', textAlign: 'left'}}>Sonraki Duruşma</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '0.75rem'}}>2025/123</td>
                <td style={{padding: '0.75rem'}}>Boşanma Davası</td>
                <td style={{padding: '0.75rem'}}>Av. Mehmet Yılmaz</td>
                <td style={{padding: '0.75rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                <td style={{padding: '0.75rem'}}>15.09.2025</td>
              </tr>
              <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '0.75rem'}}>2025/456</td>
                <td style={{padding: '0.75rem'}}>Kira Davası</td>
                <td style={{padding: '0.75rem'}}>Av. Ayşe Demir</td>
                <td style={{padding: '0.75rem'}}><span style={{color: '#10b981'}}>Aktif</span></td>
                <td style={{padding: '0.75rem'}}>20.09.2025</td>
              </tr>
              <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '0.75rem'}}>2024/789</td>
                <td style={{padding: '0.75rem'}}>Tazminat</td>
                <td style={{padding: '0.75rem'}}>Av. Ali Öz</td>
                <td style={{padding: '0.75rem'}}><span style={{color: '#6b7280'}}>Kapalı</span></td>
                <td style={{padding: '0.75rem'}}>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
          <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Hızlı İşlemler</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
            <button style={{
              padding: '1rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              📄 Belge Görüntüle
            </button>
            <button style={{
              padding: '1rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              📅 Randevu Talep Et
            </button>
            <button style={{
              padding: '1rem',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              💬 Mesaj Gönder
            </button>
            <button style={{
              padding: '1rem',
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              💰 Ödemeleri Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
