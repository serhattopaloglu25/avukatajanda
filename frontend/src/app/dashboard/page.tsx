'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Activity {
 id: number;
 action: string;
 detail: string;
 time: string;
 icon: string;
 color: string;
}

interface Event {
 id: number;
 title: string;
 date: string;
 time: string;
 description: string;
}

interface CaseDistribution {
 type: string;
 count: number;
 percentage: number;
 color: string;
}

export default function DashboardPage() {
 const router = useRouter();
 const [loading, setLoading] = useState(true);
 const [stats, setStats] = useState({
   total_cases: 0,
   active_cases: 0,
   total_clients: 0,
   pending_invoices: 0,
   upcoming_events: 0,
   total_documents: 0,
   completed_cases: 0,
   monthly_revenue: 0
 });
 const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
 const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
 const [caseDistribution, setCaseDistribution] = useState<CaseDistribution[]>([]);

 useEffect(() => {
   fetchDashboardData();
 }, []);

 const fetchDashboardData = async () => {
   try {
     const statsRes = await api.get('/api/stats');
     setStats({
       ...statsRes.data,
       upcoming_events: 5,
       total_documents: 28,
       completed_cases: 8,
       monthly_revenue: 45000
     });

     setRecentActivities([
       { id: 1, action: 'Yeni dava açıldı', detail: 'Boşanma Davası #2025/789', time: '2 saat önce', icon: '📋', color: '#3b82f6' },
       { id: 2, action: 'Belge yüklendi', detail: 'Vekaletname.pdf', time: '5 saat önce', icon: '📄', color: '#10b981' },
       { id: 3, action: 'Duruşma tamamlandı', detail: 'Kira Davası #2025/456', time: '1 gün önce', icon: '⚖️', color: '#f59e0b' },
       { id: 4, action: 'Yeni müvekkil', detail: 'Ali Yılmaz eklendi', time: '2 gün önce', icon: '👤', color: '#8b5cf6' }
     ]);

     const eventsRes = await api.get('/api/calendar');
     setUpcomingEvents(eventsRes.data.slice(0, 5));

     setCaseDistribution([
       { type: 'Boşanma', count: 12, percentage: 35, color: '#3b82f6' },
       { type: 'Kira', count: 8, percentage: 25, color: '#10b981' },
       { type: 'Tazminat', count: 7, percentage: 20, color: '#f59e0b' },
       { type: 'Ceza', count: 5, percentage: 15, color: '#ef4444' },
       { type: 'Diğer', count: 2, percentage: 5, color: '#8b5cf6' }
     ]);
   } catch (error) {
     console.error('Dashboard data fetch error:', error);
     setRecentActivities([
       { id: 1, action: 'Yeni dava açıldı', detail: 'Boşanma Davası #2025/789', time: '2 saat önce', icon: '📋', color: '#3b82f6' },
       { id: 2, action: 'Belge yüklendi', detail: 'Vekaletname.pdf', time: '5 saat önce', icon: '📄', color: '#10b981' }
     ]);
     setCaseDistribution([
       { type: 'Boşanma', count: 12, percentage: 35, color: '#3b82f6' },
       { type: 'Kira', count: 8, percentage: 25, color: '#10b981' }
     ]);
   } finally {
     setLoading(false);
   }
 };

 const quickActions = [
   { title: 'Yeni Dava', icon: '⚖️', color: '#3b82f6', path: '/dashboard/cases' },
   { title: 'Müvekkil Ekle', icon: '👤', color: '#10b981', path: '/dashboard/clients' },
   { title: 'Belge Yükle', icon: '📄', color: '#f59e0b', path: '/dashboard/documents' },
   { title: 'Etkinlik Ekle', icon: '📅', color: '#8b5cf6', path: '/dashboard/calendar' }
 ];

 const statCards = [
   { title: 'Toplam Dava', value: stats.total_cases, icon: '⚖️', color: '#3b82f6', change: '+12%' },
   { title: 'Aktif Davalar', value: stats.active_cases, icon: '📂', color: '#10b981', change: '+5%' },
   { title: 'Müvekkiller', value: stats.total_clients, icon: '👥', color: '#f59e0b', change: '+8%' },
   { title: 'Bekleyen Faturalar', value: stats.pending_invoices, icon: '💰', color: '#ef4444', change: '-3%' }
 ];

 if (loading) {
   return (
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       <div style={{ textAlign: 'center' }}>
         <p>Dashboard yükleniyor...</p>
       </div>
     </div>
   );
 }

 return (
   <div style={{ background: '#f3f4f6', minHeight: '100vh', padding: '2rem' }}>
     <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem' }}>
       Dashboard
     </h1>

     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
       {statCards.map((card, i) => (
         <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
           <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
           <h3 style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{card.title}</h3>
           <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b' }}>{card.value}</p>
           <span style={{ fontSize: '0.875rem', color: card.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
             {card.change}
           </span>
         </div>
       ))}
     </div>

     <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
       <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem' }}>
         <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Hızlı İşlemler</h2>
         <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
           {quickActions.map((action, i) => (
             <button key={i} onClick={() => router.push(action.path)} style={{
               padding: '1rem 1.5rem',
               background: action.color,
               color: 'white',
               border: 'none',
               borderRadius: '0.5rem',
               cursor: 'pointer',
               fontSize: '1rem'
             }}>
               {action.icon} {action.title}
             </button>
           ))}
         </div>
       </div>

       <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem' }}>
         <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Son Aktiviteler</h2>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
           {recentActivities.map((activity) => (
             <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
               <span>{activity.icon}</span>
               <div style={{ flex: 1 }}>
                 <p style={{ fontWeight: '500' }}>{activity.action}</p>
                 <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{activity.detail}</p>
               </div>
               <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{activity.time}</span>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}
