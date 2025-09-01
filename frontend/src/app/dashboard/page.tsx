'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    cases: 24,
    clients: 67,
    documents: 156,
    revenue: 182500
  });

  const Logo = () => (
    <svg width="180" height="45" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="35" height="28" rx="3" fill="#1e3a4a" />
      <rect x="10" y="15" width="35" height="5" fill="#2c5470" />
      <rect x="22" y="10" width="11" height="8" rx="2" fill="none" stroke="#1e3a4a" strokeWidth="2" />
      <rect x="30" y="8" width="25" height="25" rx="2" fill="#fbbf24" opacity="0.9" />
      <rect x="30" y="8" width="25" height="7" fill="#f59e0b" />
      <text x="42" y="25" fontSize="14" fontWeight="bold" fill="#1e3a4a" textAnchor="middle">15</text>
      <text x="42" y="31" fontSize="6" fill="#1e3a4a" textAnchor="middle">MON</text>
      <circle cx="36" cy="11" r="1" fill="#1e3a4a" />
      <circle cx="48" cy="11" r="1" fill="#1e3a4a" />
      <text x="27" y="33" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">AJANDA</text>
      <text x="65" y="30" fontSize="20" fontWeight="bold" fill="#1e3a4a">AVUKATAJANDA</text>
      <text x="160" y="30" fontSize="20" fontWeight="300" fill="#9ca3af">.COM</text>
    </svg>
  );

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}}>
      <header style={{background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
            <Logo />
          </a>
          <nav style={{display: 'flex', gap: '2rem'}}>
            <a href="/dashboard" style={{color: '#0ea5e9', textDecoration: 'none'}}>Dashboard</a>
            <a href="/dashboard/cases" style={{color: '#64748b', textDecoration: 'none'}}>Davalar</a>
            <a href="/dashboard/clients" style={{color: '#64748b', textDecoration: 'none'}}>Müvekkiller</a>
            <a href="/dashboard/documents" style={{color: '#64748b', textDecoration: 'none'}}>Belgeler</a>
            <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>Çıkış</a>
          </nav>
        </div>
      </header>

      <div style={{maxWidth: '1280px', margin: '2rem auto', padding: '0 2rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem'}}>Dashboard</h1>
        
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
      </div>
    </div>
  );
}
