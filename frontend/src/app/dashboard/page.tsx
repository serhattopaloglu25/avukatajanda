'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    cases: 24,
    clients: 67,
    documents: 156,
    revenue: 182500
  });

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}}>
      {/* Header */}
      <header style={{background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>AvukatAjanda Dashboard</h1>
          <nav style={{display: 'flex', gap: '2rem'}}>
            <a href="/dashboard" style={{color: '#0ea5e9', textDecoration: 'none'}}>Dashboard</a>
            <a href="/dashboard/cases" style={{color: '#64748b', textDecoration: 'none'}}>Davalar</a>
            <a href="/dashboard/clients" style={{color: '#64748b', textDecoration: 'none'}}>Müvekkiller</a>
            <a href="/dashboard/documents" style={{color: '#64748b', textDecoration: 'none'}}>Belgeler</a>
            <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>Çıkış</a>
          </nav>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{maxWidth: '1280px', margin: '2rem auto', padding: '0 2rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem'}}>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Toplam Dava</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>{stats.cases}</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Aktif Müvekkil</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>{stats.clients}</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Toplam Belge</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>{stats.documents}</p>
          </div>
          <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Aylık Gelir</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>₺{stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem'}}>Hızlı İşlemler</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
            <a href="/dashboard/cases/new" style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#1f2937',
              textAlign: 'center',
              display: 'block'
            }}>
              ➕ Yeni Dava
            </a>
            <a href="/dashboard/clients/new" style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#1f2937',
              textAlign: 'center',
              display: 'block'
            }}>
              👤 Yeni Müvekkil
            </a>
            <a href="/dashboard/documents/upload" style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#1f2937',
              textAlign: 'center',
              display: 'block'
            }}>
              📄 Belge Yükle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
