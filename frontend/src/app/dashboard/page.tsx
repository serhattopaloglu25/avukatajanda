'use client';

import { useState, useEffect } from 'react';
import { Logo } from '../../components/Logo';

export default function Dashboard() {
  const [stats, setStats] = useState({
    cases: 24,
    clients: 67,
    documents: 156,
    revenue: 182500
  });

  return (
    <div style={{minHeight: '100vh', background: '#f5f7fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'}}>
      <header style={{background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
            <Logo size="normal" />
          </a>
          <nav style={{display: 'flex', gap: '2rem'}}>
            <a href="/dashboard" style={{color: '#3498db', textDecoration: 'none'}}>Dashboard</a>
            <a href="/dashboard/cases" style={{color: '#64748b', textDecoration: 'none'}}>Davalar</a>
            <a href="/dashboard/clients" style={{color: '#64748b', textDecoration: 'none'}}>Müvekkiller</a>
            <a href="/dashboard/documents" style={{color: '#64748b', textDecoration: 'none'}}>Belgeler</a>
            <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>Çıkış</a>
          </nav>
        </div>
      </header>

      {/* Dashboard content... */}
    </div>
  );
}
