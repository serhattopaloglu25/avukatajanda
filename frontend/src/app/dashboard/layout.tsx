'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('lawyerAuth');
    if (!auth) {
      router.push('/login');
    } else {
      setUser(JSON.parse(auth));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lawyerAuth');
    router.push('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', path: '/dashboard' },
    { id: 'cases', label: '⚖️ Davalar', path: '/dashboard/cases' },
    { id: 'clients', label: '👥 Müvekkiller', path: '/dashboard/clients' },
    { id: 'calendar', label: '📅 Takvim', path: '/dashboard/calendar' },
    { id: 'documents', label: '📄 Belgeler', path: '/dashboard/documents' },
    { id: 'invoices', label: '💰 Faturalar', path: '/dashboard/invoices' },
    { id: 'notes', label: '📝 Notlar', path: '/dashboard/notes' }
  ];

  if (!user) return null;

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui'}}>
      <aside style={{width: '250px', background: '#1e293b', color: 'white', padding: '2rem 1rem'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.5rem'}}>Avukat Paneli</h2>
        <p style={{marginBottom: '2rem', fontSize: '0.875rem', color: '#94a3b8'}}>
          Hoş geldin, {user.name}
        </p>
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                router.push(item.path);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '0.25rem',
                background: activeMenu === item.id ? '#3b82f6' : 'transparent',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
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
      <main style={{flex: 1, padding: '2rem', overflowY: 'auto'}}>
        {children}
      </main>
    </div>
  );
}
