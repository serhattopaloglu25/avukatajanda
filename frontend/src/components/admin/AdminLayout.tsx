'use client';

export default function AdminLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  onLogout 
}: { 
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'settings', label: '⚙️ Site Ayarları' },
    { id: 'media', label: '🖼️ Logo ve Görseller' },
    { id: 'content', label: '📝 İçerik Yönetimi' },
    { id: 'pricing', label: '💰 Fiyatlandırma' },
    { id: 'contact', label: '📞 İletişim Bilgileri' },
    { id: 'users', label: '👥 Kullanıcı Yönetimi' },
    { id: 'logs', label: '📋 Audit Log' }
  ];

  return (
    <div style={{display: 'flex', minHeight: '100vh', background: '#f3f4f6'}}>
      <aside style={{
        width: '280px',
        background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '2rem 1rem'
      }}>
        <h1 style={{fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem'}}>
          Admin Panel
        </h1>
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
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
          onClick={onLogout}
          style={{
            width: '100%',
            marginTop: '2rem',
            padding: '0.875rem',
            background: '#dc2626',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Çıkış Yap
        </button>
      </aside>
      <main style={{flex: 1, padding: '2rem', overflowY: 'auto'}}>
        {children}
      </main>
    </div>
  );
}
