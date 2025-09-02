'use client';

import { useState, useEffect } from 'react';

interface Hearing {
  id: number;
  case: string;
  date: string;
  time: string;
  court: string;
}

interface Stats {
  total_cases: number;
  active_cases: number;
  total_clients: number;
  pending_invoices: number;
}

export default function LawyerDashboard() {
  const [stats, setStats] = useState<Stats>({
    total_cases: 0,
    active_cases: 0,
    total_clients: 0,
    pending_invoices: 0
  });

  const [upcomingHearings, setUpcomingHearings] = useState<Hearing[]>([]);

  useEffect(() => {
    // Demo veriler
    setStats({
      total_cases: 24,
      active_cases: 18,
      total_clients: 67,
      pending_invoices: 5
    });

    setUpcomingHearings([
      { id: 1, case: 'Boşanma Davası #2025/123', date: '2025-09-05', time: '10:30', court: 'İstanbul 3. Aile Mahkemesi' },
      { id: 2, case: 'Kira Davası #2025/456', date: '2025-09-07', time: '14:00', court: 'İstanbul 5. Sulh Hukuk' }
    ]);
  }, []);

  return (
    <div>
      <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
      
      {/* İstatistikler */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Toplam Dava</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{stats.total_cases}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Aktif Davalar</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#10b981'}}>{stats.active_cases}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Müvekkiller</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{stats.total_clients}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Bekleyen Faturalar</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b'}}>{stats.pending_invoices}</p>
        </div>
      </div>

      {/* Yaklaşan Duruşmalar */}
      <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
        <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Yaklaşan Duruşmalar</h2>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #e5e7eb'}}>
              <th style={{padding: '0.75rem', textAlign: 'left'}}>Dava</th>
              <th style={{padding: '0.75rem', textAlign: 'left'}}>Tarih</th>
              <th style={{padding: '0.75rem', textAlign: 'left'}}>Saat</th>
              <th style={{padding: '0.75rem', textAlign: 'left'}}>Mahkeme</th>
            </tr>
          </thead>
          <tbody>
            {upcomingHearings.map((hearing) => (
              <tr key={hearing.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '0.75rem'}}>{hearing.case}</td>
                <td style={{padding: '0.75rem'}}>{hearing.date}</td>
                <td style={{padding: '0.75rem'}}>{hearing.time}</td>
                <td style={{padding: '0.75rem'}}>{hearing.court}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
