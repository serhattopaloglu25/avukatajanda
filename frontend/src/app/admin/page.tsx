'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { auth } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
 const router = useRouter();
 const [activeTab, setActiveTab] = useState('dashboard');
 const [loading, setLoading] = useState(false);
 
 // Data states
 const [stats, setStats] = useState({ total_users: 0, total_cases: 0, active_cases: 0, total_clients: 0 });
 const [settings, setSettings] = useState({});
 const [features, setFeatures] = useState([]);
 const [pricing, setPricing] = useState([]);
 const [users, setUsers] = useState([]);
 const [clients, setClients] = useState([]);
 const [cases, setCases] = useState([]);
 const [auditLogs, setAuditLogs] = useState([]);

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
     switch(activeTab) {
       case 'dashboard':
         const statsRes = await api.get('/api/stats');
         setStats(statsRes.data);
         break;
       case 'settings':
         const settingsRes = await api.get('/api/settings');
         setSettings(settingsRes.data);
         break;
       case 'features':
         const featuresRes = await api.get('/api/features');
         setFeatures(featuresRes.data);
         break;
       case 'pricing':
         const pricingRes = await api.get('/api/pricing');
         setPricing(pricingRes.data);
         break;
       case 'users':
         const usersRes = await api.get('/api/users');
         setUsers(usersRes.data);
         break;
       case 'clients':
         const clientsRes = await api.get('/api/clients');
         setClients(clientsRes.data);
         break;
       case 'cases':
         const casesRes = await api.get('/api/cases');
         setCases(casesRes.data);
         break;
       case 'audit':
         const auditRes = await api.get('/api/audit-logs');
         setAuditLogs(auditRes.data);
         break;
     }
   } catch (error) {
     toast.error('Veri yüklenirken hata oluştu');
   } finally {
     setLoading(false);
   }
 };

 const updateSettings = async () => {
   try {
     await api.put('/api/settings', settings);
     toast.success('Ayarlar güncellendi');
   } catch (error) {
     toast.error('Güncelleme başarısız');
   }
 };

 const addFeature = async (feature: any) => {
   try {
     await api.post('/api/features', feature);
     fetchData();
     toast.success('Özellik eklendi');
   } catch (error) {
     toast.error('Ekleme başarısız');
   }
 };

 const deleteFeature = async (id: number) => {
   try {
     await api.delete(`/api/features/${id}`);
     fetchData();
     toast.success('Özellik silindi');
   } catch (error) {
     toast.error('Silme başarısız');
   }
 };

 const menuItems = [
   { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
   { id: 'settings', label: '⚙️ Site Ayarları', icon: '⚙️' },
   { id: 'features', label: '✨ Özellikler', icon: '✨' },
   { id: 'pricing', label: '💰 Fiyatlandırma', icon: '💰' },
   { id: 'users', label: '👥 Kullanıcılar', icon: '👥' },
   { id: 'clients', label: '👤 Müvekkiller', icon: '👤' },
   { id: 'cases', label: '⚖️ Davalar', icon: '⚖️' },
   { id: 'audit', label: '📝 Audit Log', icon: '📝' }
 ];

 return (
   <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
     <aside style={{ width: '250px', background: '#1e293b', color: 'white', padding: '2rem 1rem' }}>
       <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Admin Panel</h2>
       <nav>
         {menuItems.map(item => (
           <button
             key={item.id}
             onClick={() => setActiveTab(item.id)}
             style={{
               width: '100%',
               padding: '0.75rem',
               marginBottom: '0.25rem',
               background: activeTab === item.id ? '#3b82f6' : 'transparent',
               border: 'none',
               borderRadius: '0.5rem',
               color: 'white',
               textAlign: 'left',
               cursor: 'pointer'
             }}
           >
             {item.label}
           </button>
         ))}
       </nav>
       <button
         onClick={() => auth.logout()}
         style={{
           width: '100%',
           marginTop: '2rem',
           padding: '0.75rem',
           background: '#dc2626',
           border: 'none',
           borderRadius: '0.5rem',
           color: 'white',
           cursor: 'pointer'
         }}
       >
         Çıkış
       </button>
     </aside>

     <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
       {loading ? (
         <div>Yükleniyor...</div>
       ) : (
         <>
           {activeTab === 'dashboard' && (
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
                 <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem' }}>
                   <h3 style={{ color: '#64748b', fontSize: '0.875rem' }}>Aktif Davalar</h3>
                   <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.active_cases}</p>
                 </div>
                 <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem' }}>
                   <h3 style={{ color: '#64748b', fontSize: '0.875rem' }}>Müvekkiller</h3>
                   <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_clients}</p>
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'settings' && (
             <div>
               <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Site Ayarları</h1>
               <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem' }}>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem' }}>Ana Renk</label>
                   <input
                     type="text"
                     value={settings.primary_color || ''}
                     onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                     style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                   />
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem' }}>Hero Başlık</label>
                   <input
                     type="text"
                     value={settings.hero_title || ''}
                     onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                     style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                   />
                 </div>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem' }}>Hero Alt Başlık</label>
                   <textarea
                     value={settings.hero_subtitle || ''}
                     onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                     style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '100px' }}
                   />
                 </div>
                 <button
                   onClick={updateSettings}
                   style={{
                     padding: '0.75rem 2rem',
                     background: '#0066cc',
                     color: 'white',
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

           {activeTab === 'features' && (
             <div>
               <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Özellikler</h1>
               <button
                 onClick={() => {
                   const icon = prompt('İkon (emoji):');
                   const title = prompt('Başlık:');
                   const description = prompt('Açıklama:');
                   if (icon && title && description) {
                     addFeature({ icon, title, description, order: 0 });
                   }
                 }}
                 style={{
                   marginBottom: '1rem',
                   padding: '0.75rem 1.5rem',
                   background: '#10b981',
                   color: 'white',
                   border: 'none',
                   borderRadius: '0.375rem',
                   cursor: 'pointer'
                 }}
               >
                 + Yeni Özellik
               </button>
               <div style={{ display: 'grid', gap: '1rem' }}>
                 {features.map((feature: any) => (
                   <div key={feature.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                     <div>
                       <h3>{feature.icon} {feature.title}</h3>
                       <p>{feature.description}</p>
                     </div>
                     <button
                       onClick={() => deleteFeature(feature.id)}
                       style={{
                         padding: '0.5rem 1rem',
                         background: '#dc2626',
                         color: 'white',
                         border: 'none',
                         borderRadius: '0.375rem',
                         cursor: 'pointer'
                       }}
                     >
                       Sil
                     </button>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'audit' && (
             <div>
               <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Audit Log</h1>
               <div style={{ background: 'white', borderRadius: '0.5rem', overflow: 'hidden' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                   <thead>
                     <tr style={{ background: '#f8fafc' }}>
                       <th style={{ padding: '1rem', textAlign: 'left' }}>Kullanıcı</th>
                       <th style={{ padding: '1rem', textAlign: 'left' }}>İşlem</th>
                       <th style={{ padding: '1rem', textAlign: 'left' }}>Tarih</th>
                     </tr>
                   </thead>
                   <tbody>
                     {auditLogs.map((log: any) => (
                       <tr key={log.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                         <td style={{ padding: '1rem' }}>{log.user?.username}</td>
                         <td style={{ padding: '1rem' }}>{log.action}</td>
                         <td style={{ padding: '1rem' }}>{new Date(log.created_at).toLocaleString('tr-TR')}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           )}
         </>
       )}
     </main>
   </div>
 );
}
