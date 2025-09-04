'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { auth } from '@/lib/auth';

export default function AdminDashboard() {
 const router = useRouter();
 const [activeTab, setActiveTab] = useState('dashboard');
 const [loading, setLoading] = useState(false);
 const [stats, setStats] = useState({ total_users: 0, total_cases: 0, active_cases: 0, total_clients: 0 });

 useEffect(() => {
   if (!auth.isAdmin()) {
     router.push('/login');
     return;
   }
   fetchData();
 }, [activeTab]);

 const fetchData = async () => {
   setLoading(true);
   try {
     const statsRes = await api.get('/api/stats');
     setStats(statsRes.data);
   } catch (error) {
     console.error('Error fetching data:', error);
   } finally {
     setLoading(false);
   }
 };

 return (
   <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
     <aside style={{ width: '250px', background: '#1e293b', color: 'white', padding: '2rem 1rem' }}>
       <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Admin Panel</h2>
       <nav>
         <button
           onClick={() => setActiveTab('dashboard')}
           style={{
             width: '100%',
             padding: '0.75rem',
             marginBottom: '0.25rem',
             background: activeTab === 'dashboard' ? '#3b82f6' : 'transparent',
             border: 'none',
             borderRadius: '0.5rem',
             color: 'white',
             textAlign: 'left',
             cursor: 'pointer'
           }}
         >
           📊 Dashboard
         </button>
       </nav>
     </aside>

     <main style={{ flex: 1, padding: '2rem' }}>
       {loading ? (
         <div>Yükleniyor...</div>
       ) : (
         <div>
           <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
             <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem' }}>
               <h3 style={{ color: '#64748b', fontSize: '0.875rem' }}>Toplam Kullanıcı</h3>
               <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_users}</p>
             </div>
             <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem' }}>
               <h3 style={{ color: '#64748b', fontSize: '0.875rem' }}>Toplam Dava</h3>
               <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_cases}</p>
             </div>
           </div>
         </div>
       )}
     </main>
   </div>
 );
}
