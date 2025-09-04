'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

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
 const [recentActivities, setRecentActivities] = useState([]);
 const [upcomingEvents, setUpcomingEvents] = useState([]);
 const [caseDistribution, setCaseDistribution] = useState([]);

 useEffect(() => {
   fetchDashboardData();
 }, []);

 const fetchDashboardData = async () => {
   try {
     // Stats
     const statsRes = await api.get('/api/stats');
     setStats({
       ...statsRes.data,
       upcoming_events: 5,
       total_documents: 28,
       completed_cases: 8,
       monthly_revenue: 45000
     });

     // Recent Activities
     setRecentActivities([
       { id: 1, action: 'Yeni dava açıldı', detail: 'Boşanma Davası #2025/789', time: '2 saat önce', icon: '📋', color: '#3b82f6' },
       { id: 2, action: 'Belge yüklendi', detail: 'Vekaletname.pdf', time: '5 saat önce', icon: '📄', color: '#10b981' },
       { id: 3, action: 'Duruşma tamamlandı', detail: 'Kira Davası #2025/456', time: '1 gün önce', icon: '⚖️', color: '#f59e0b' },
       { id: 4, action: 'Yeni müvekkil', detail: 'Ali Yılmaz eklendi', time: '2 gün önce', icon: '👤', color: '#8b5cf6' }
     ]);

     // Upcoming Events
     const eventsRes = await api.get('/api/calendar');
     setUpcomingEvents(eventsRes.data.slice(0, 5));

     // Case Distribution
     setCaseDistribution([
       { type: 'Boşanma', count: 12, percentage: 35, color: '#3b82f6' },
       { type: 'Kira', count: 8, percentage: 25, color: '#10b981' },
       { type: 'Tazminat', count: 7, percentage: 20, color: '#f59e0b' },
       { type: 'Ceza', count: 5, percentage: 15, color: '#ef4444' },
       { type: 'Diğer', count: 2, percentage: 5, color: '#8b5cf6' }
     ]);
   } catch (error) {
     console.error('Dashboard data fetch error:', error);
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
     <div style={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
     }}>
       <div style={{
         padding: '3rem',
         background: 'white',
         borderRadius: '1rem',
         boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
         textAlign: 'center'
       }}>
         <div style={{
           width: '60px',
           height: '60px',
           border: '4px solid #e5e7eb',
           borderTopColor: '#3b82f6',
           borderRadius: '50%',
           margin: '0 auto 1rem',
           animation: 'spin 1s linear infinite'
         }}></div>
         <p style={{color: '#6b7280'}}>Dashboard yükleniyor...</p>
       </div>
       <style jsx>{`
         @keyframes spin {
           to { transform: rotate(360deg); }
         }
       `}</style>
     </div>
   );
 }

 return (
   <div style={{background: '#f3f4f6', minHeight: '100vh', padding: '2rem'}}>
     {/* Header */}
     <div style={{marginBottom: '2rem'}}>
       <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem'}}>
         Dashboard
       </h1>
       <p style={{color: '#64748b'}}>
         Hoş geldiniz! İşte bugünkü özet bilgileriniz.
       </p>
     </div>

     {/* Quick Actions */}
     <div style={{
       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
       gap: '1rem',
       marginBottom: '2rem'
     }}>
       {quickActions.map((action, i) => (
         <button
           key={i}
           onClick={() => router.push(action.path)}
           style={{
             padding: '1.5rem',
             background: 'white',
             border: 'none',
             borderRadius: '1rem',
             cursor: 'pointer',
             transition: 'all 0.3s',
             boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             gap: '0.5rem'
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.transform = 'translateY(-4px)';
             e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.transform = 'translateY(0)';
             e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
           }}
         >
           <div style={{
             width: '50px',
             height: '50px',
             background: `${action.color}15`,
             borderRadius: '12px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontSize: '1.5rem'
           }}>
             {action.icon}
           </div>
           <span style={{color: '#374151', fontWeight: '500'}}>{action.title}</span>
         </button>
       ))}
     </div>

     {/* Stat Cards */}
     <div style={{
       display: 'grid',
       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
       gap: '1.5rem',
       marginBottom: '2rem'
     }}>
       {statCards.map((card, i) => (
         <div key={i} style={{
           background: 'white',
           borderRadius: '1rem',
           padding: '1.5rem',
           boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
           position: 'relative',
           overflow: 'hidden'
         }}>
           <div style={{
             position: 'absolute',
             top: '-20px',
             right: '-20px',
             width: '100px',
             height: '100px',
             background: `${card.color}10`,
             borderRadius: '50%'
           }}></div>
           <div style={{position: 'relative', zIndex: 1}}>
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
               <div style={{
                 width: '48px',
                 height: '48px',
                 background: `${card.color}15`,
                 borderRadius: '12px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 fontSize: '1.5rem'
               }}>
                 {card.icon}
               </div>
               <span style={{
                 padding: '0.25rem 0.75rem',
                 background: card.change.startsWith('+') ? '#dcfce7' : '#fee2e2',
                 color: card.change.startsWith('+') ? '#166534' : '#991b1b',
                 borderRadius: '0.375rem',
                 fontSize: '0.875rem',
                 fontWeight: '500'
               }}>
                 {card.change}
               </span>
             </div>
             <h3 style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem'}}>{card.title}</h3>
             <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>{card.value}</p>
           </div>
         </div>
       ))}
     </div>

     {/* Main Content Grid */}
     <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem'}}>
       {/* Left Column */}
       <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
         {/* Recent Activities */}
         <div style={{
           background: 'white',
           borderRadius: '1rem',
           padding: '1.5rem',
           boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
         }}>
           <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b'}}>
             Son Aktiviteler
           </h2>
           <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             {recentActivities.map((activity) => (
               <div key={activity.id} style={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 padding: '1rem',
                 background: '#f8fafc',
                 borderRadius: '0.75rem'
               }}>
                 <div style={{
                   width: '40px',
                   height: '40px',
                   background: `${activity.color}15`,
                   borderRadius: '10px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   flexShrink: 0
                 }}>
                   {activity.icon}
                 </div>
                 <div style={{flex: 1}}>
                   <p style={{fontWeight: '500', color: '#1e293b'}}>{activity.action}</p>
                   <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{activity.detail}</p>
                 </div>
                 <span style={{fontSize: '0.875rem', color: '#94a3b8'}}>{activity.time}</span>
               </div>
             ))}
           </div>
         </div>

         {/* Case Distribution */}
         <div style={{
           background: 'white',
           borderRadius: '1rem',
           padding: '1.5rem',
           boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
         }}>
           <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b'}}>
             Dava Dağılımı
           </h2>
           <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             {caseDistribution.map((item, i) => (
               <div key={i}>
                 <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                   <span style={{color: '#374151', fontWeight: '500'}}>{item.type}</span>
                   <span style={{color: '#6b7280'}}>{item.count} dava ({item.percentage}%)</span>
                 </div>
                 <div style={{
                   width: '100%',
                   height: '8px',
                   background: '#e5e7eb',
                   borderRadius: '4px',
                   overflow: 'hidden'
                 }}>
                   <div style={{
                     width: `${item.percentage}%`,
                     height: '100%',
                     background: item.color,
                     transition: 'width 1s ease-out'
                   }}></div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>

       {/* Right Column */}
       <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
         {/* Upcoming Events */}
         <div style={{
           background: 'white',
           borderRadius: '1rem',
           padding: '1.5rem',
           boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
         }}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
             <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b'}}>
               Yaklaşan Etkinlikler
             </h2>
             <button onClick={() => router.push('/dashboard/calendar')} style={{
               color: '#3b82f6',
               background: 'none',
               border: 'none',
               cursor: 'pointer',
               fontSize: '0.875rem'
             }}>
               Tümü →
             </button>
           </div>
           <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
             {[
               { date: '05 Eyl', title: 'Boşanma Duruşması', time: '10:30', type: 'Duruşma' },
               { date: '07 Eyl', title: 'Müvekkil Görüşmesi', time: '14:00', type: 'Görüşme' },
               { date: '10 Eyl', title: 'Dilekçe Son Tarihi', time: '17:00', type: 'Deadline' },
               { date: '12 Eyl', title: 'Kira Davası', time: '11:00', type: 'Duruşma' },
               { date: '15 Eyl', title: 'Uzlaşma Görüşmesi', time: '15:30', type: 'Görüşme' }
             ].map((event, i) => (
               <div key={i} style={{
                 display: 'flex',
                 gap: '1rem',
                 padding: '0.75rem',
                 background: '#f8fafc',
                 borderRadius: '0.75rem',
                 alignItems: 'center'
               }}>
                 <div style={{
                   padding: '0.5rem',
                   background: 'white',
                   borderRadius: '0.5rem',
                   textAlign: 'center',
                   minWidth: '50px'
                 }}>
                   <div style={{fontSize: '0.75rem', color: '#6b7280'}}>{event.date.split(' ')[1]}</div>
                   <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b'}}>{event.date.split(' ')[0]}</div>
                 </div>
                 <div style={{flex: 1}}>
                   <p style={{fontWeight: '500', color: '#1e293b'}}>{event.title}</p>
                   <p style={{fontSize: '0.875rem', color: '#6b7280'}}>{event.time} • {event.type}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Monthly Summary */}
         <div style={{
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           borderRadius: '1rem',
           padding: '1.5rem',
           color: 'white'
         }}>
           <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem'}}>
             Aylık Özet
           </h2>
           <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <span style={{opacity: 0.9}}>Gelir</span>
               <span style={{fontWeight: 'bold'}}>₺{stats.monthly_revenue.toLocaleString('tr-TR')}</span>
             </div>
             <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <span style={{opacity: 0.9}}>Tamamlanan</span>
               <span style={{fontWeight: 'bold'}}>{stats.completed_cases} dava</span>
             </div>
             <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <span style={{opacity: 0.9}}>Yeni Müvekkil</span>
               <span style={{fontWeight: 'bold'}}>12</span>
             </div>
             <hr style={{border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '0.5rem 0'}} />
             <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <span style={{opacity: 0.9}}>Başarı Oranı</span>
               <span style={{fontWeight: 'bold'}}>%87</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}
