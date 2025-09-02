'use client';

import { useState, useEffect } from 'react';

interface Stats {
  total_cases: number;
  active_cases: number;
  total_clients: number;
  pending_invoices: number;
}

interface Hearing {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

const API_URL = 'http://localhost:8001/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total_cases: 0,
    active_cases: 0,
    total_clients: 0,
    pending_invoices: 0
  });

  const [upcomingEvents, setUpcomingEvents] = useState<Hearing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchUpcomingEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Eğer API çalışmıyorsa demo veri göster
      setStats({
        total_cases: 12,
        active_cases: 8,
        total_clients: 45,
        pending_invoices: 3
      });
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events`);
      const data = await response.json();
      // Sadece gelecek tarihli olanları filtrele
      const upcoming = data
        .filter((event: any) => new Date(event.date) >= new Date())
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Demo veri
      setUpcomingEvents([
        { id: 1, title: 'Boşanma Davası Duruşması', date: '2025-09-05', time: '10:30', description: 'İstanbul 3. Aile Mahkemesi' },
        { id: 2, title: 'Kira Davası', date: '2025-09-07', time: '14:00', description: 'İstanbul 5. Sulh Hukuk' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{padding: '2rem'}}>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Dashboard</h1>
      
      {/* İstatistikler */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Toplam Dava</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{stats.total_cases}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Aktif Davalar</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#10b981'}}>{stats.active_cases}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Müvekkiller</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold'}}>{stats.total_clients}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Bekleyen Faturalar</h3>
          <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b'}}>{stats.pending_invoices}</p>
        </div>
      </div>

      {/* Yaklaşan Duruşmalar */}
      <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
        <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Yaklaşan Duruşmalar</h2>
        {upcomingEvents.length === 0 ? (
          <p style={{color: '#6b7280', padding: '1rem'}}>Yaklaşan duruşma bulunmuyor</p>
        ) : (
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
              {upcomingEvents.map((event) => (
                <tr key={event.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '0.75rem'}}>{event.title}</td>
                  <td style={{padding: '0.75rem'}}>{event.date}</td>
                  <td style={{padding: '0.75rem'}}>{event.time}</td>
                  <td style={{padding: '0.75rem'}}>{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Hızlı İşlemler */}
      <div style={{marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
        <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Hızlı İşlemler</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <button onClick={() => window.location.href = '/dashboard/cases'} style={{
            padding: '1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            + Yeni Dava Ekle
          </button>
          <button onClick={() => window.location.href = '/dashboard/clients'} style={{
            padding: '1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            + Yeni Müvekkil Ekle
          </button>
          <button onClick={() => window.location.href = '/dashboard/calendar'} style={{
            padding: '1rem',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            + Takvime Etkinlik Ekle
          </button>
          <button onClick={() => window.location.href = '/dashboard/invoices'} style={{
            padding: '1rem',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            + Fatura Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
