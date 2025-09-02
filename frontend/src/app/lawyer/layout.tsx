'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LawyerLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', path: '/lawyer' },
    { id: 'cases', label: '⚖️ Davalar', path: '/lawyer/cases' },
    { id: 'clients', label: '👥 Müvekkiller', path: '/lawyer/clients' },
    { id: 'calendar', label: '📅 Takvim', path: '/lawyer/calendar' },
    { id: 'documents', label: '📄 Belgeler', path: '/lawyer/documents' },
    { id: 'invoices', label: '💰 Faturalar', path: '/lawyer/invoices' },
    { id: 'notes', label: '📝 Notlar', path: '/lawyer/notes' }
  ];

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui'}}>
      <aside style={{width: '250px', background: '#1e293b', color: 'white', padding: '2rem 1rem'}}>
        <h2 style={{marginBottom: '2rem', fontSize: '1.5rem'}}>Avukat Paneli</h2>
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
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => router.push('/')}
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
