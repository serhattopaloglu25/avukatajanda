'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveMessage, setSaveMessage] = useState('');
  
  // Site ayarları
  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#0066cc',
    secondaryColor: '#64748b',
    heroTitle: 'Hukuk Büronuz İçin Komple Çözüm',
    heroSubtitle: 'Bulut tabanlı hukuk bürosu yazılımı',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    phone: '0850 123 45 67',
    email: 'destek@avukatajanda.com',
    address: 'Levent, İstanbul'
  });

  // Kullanıcılar
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'user', plan: 'Profesyonel', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', role: 'user', plan: 'Başlangıç', status: 'active', joinDate: '2025-01-20' },
    { id: 3, name: 'Mehmet Öz', email: 'mehmet@example.com', role: 'user', plan: 'Kurumsal', status: 'inactive', joinDate: '2024-12-01' },
    { id: 4, name: 'Fatma Kaya', email: 'fatma@example.com', role: 'editor', plan: 'Profesyonel', status: 'active', joinDate: '2025-02-01' }
  ]);

  // Audit logs
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'SerhatAdmin', action: 'Site ayarları güncellendi', details: 'Ana renk değiştirildi', date: '2025-09-02 14:30', ip: '192.168.1.1' },
    { id: 2, user: 'SerhatAdmin', action: 'Kullanıcı eklendi', details: 'Fatma Kaya eklendi', date: '2025-09-02 10:15', ip: '192.168.1.1' },
    { id: 3, user: 'SerhatAdmin', action: 'Fiyatlandırma güncellendi', details: 'Profesyonel plan fiyatı değişti', date: '2025-09-01 16:45', ip: '192.168.1.1' },
    { id: 4, user: 'EditorUser', action: 'İçerik düzenlendi', details: 'Hero başlık güncellendi', date: '2025-09-01 09:20', ip: '192.168.1.2' }
  ]);

  // Yeni kullanıcı form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    plan: 'Başlangıç'
  });

  const [showNewUserForm, setShowNewUserForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminAuth');
    if (token === 'SerhatAdmin_authenticated') {
      setIsAuthenticated(true);
      
      // Load saved data
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
      
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) setUsers(JSON.parse(savedUsers));
      
      const savedLogs = localStorage.getItem('auditLogs');
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'SerhatAdmin' && loginData.password === 'Serhat25') {
      localStorage.setItem('adminAuth', 'SerhatAdmin_authenticated');
      setIsAuthenticated(true);
      addAuditLog('SerhatAdmin', 'Giriş yapıldı', 'Admin panele giriş');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleLogout = () => {
    addAuditLog('SerhatAdmin', 'Çıkış yapıldı', 'Admin panelden çıkış');
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  const addAuditLog = (user: string, action: string, details: string) => {
    const newLog = {
      id: Date.now(),
      user,
      action,
      details,
      date: new Date().toLocaleString('tr-TR'),
      ip: '192.168.1.1'
    };
    
    const updatedLogs = [newLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    localStorage.setItem('auditLogs', JSON.stringify(updatedLogs));
  };

  const saveSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    addAuditLog('SerhatAdmin', 'Site ayarları güncellendi', 'Ayarlar kaydedildi');
    setSaveMessage('✅ Ayarlar başarıyla kaydedildi!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    addAuditLog('SerhatAdmin', 'Kullanıcı eklendi', `${newUser.name} eklendi`);
    
    setNewUser({ name: '', email: '', role: 'user', plan: 'Başlangıç' });
    setShowNewUserForm(false);
    setSaveMessage('✅ Kullanıcı başarıyla eklendi!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const updateUserStatus = (userId: number, newStatus: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const user = users.find(u => u.id === userId);
    addAuditLog('SerhatAdmin', 'Kullanıcı durumu değiştirildi', `${user?.name} - ${newStatus}`);
  };

  const deleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (confirm(`${user?.name} kullanıcısını silmek istediğinize emin misiniz?`)) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      addAuditLog('SerhatAdmin', 'Kullanıcı silindi', `${user?.name} silindi`);
      setSaveMessage('✅ Kullanıcı silindi!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)'
      }}>
        <form onSubmit={handleLogin} style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Admin Panel</h1>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  const renderContent = () => {
    return (
      <>
        {saveMessage && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}>
            {saveMessage}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
              <h1 style={{fontSize: '2rem'}}>Kullanıcı Yönetimi</h1>
              <button onClick={() => setShowNewUserForm(true)} style={{
                padding: '0.75rem 1.5rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}>
                + Yeni Kullanıcı Ekle
              </button>
            </div>

            {showNewUserForm && (
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{marginBottom: '1rem'}}>Yeni Kullanıcı</h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Ad Soyad</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem'}}>E-posta</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                    />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Rol</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                    >
                      <option value="user">Kullanıcı</option>
                      <option value="editor">Editör</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem'}}>Plan</label>
                    <select
                      value={newUser.plan}
                      onChange={(e) => setNewUser({...newUser, plan: e.target.value})}
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                    >
                      <option value="Başlangıç">Başlangıç</option>
                      <option value="Profesyonel">Profesyonel</option>
                      <option value="Kurumsal">Kurumsal</option>
                    </select>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button onClick={addUser} style={{
                      padding: '0.5rem 1rem',
                      background: '#0066cc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Ekle
                    </button>
                    <button onClick={() => setShowNewUserForm(false)} style={{
                      padding: '0.5rem 1rem',
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc'}}>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Ad Soyad</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>E-posta</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Rol</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Plan</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Durum</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Katılım</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                      <td style={{padding: '1rem'}}>{user.name}</td>
                      <td style={{padding: '1rem'}}>{user.email}</td>
                      <td style={{padding: '1rem'}}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: user.role === 'admin' ? '#dbeafe' : user.role === 'editor' ? '#fef3c7' : '#e0e7ff',
                          color: user.role === 'admin' ? '#1e40af' : user.role === 'editor' ? '#92400e' : '#3730a3',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem'
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{padding: '1rem'}}>{user.plan}</td>
                      <td style={{padding: '1rem'}}>
                        <span style={{color: user.status === 'active' ? '#10b981' : '#6b7280'}}>
                          ● {user.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td style={{padding: '1rem'}}>{user.joinDate}</td>
                      <td style={{padding: '1rem'}}>
                        <button onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')} style={{
                          marginRight: '0.5rem',
                          padding: '0.25rem 0.75rem',
                          background: user.status === 'active' ? '#f59e0b' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}>
                          {user.status === 'active' ? 'Pasifleştir' : 'Aktifleştir'}
                        </button>
                        <button onClick={() => deleteUser(user.id)} style={{
                          padding: '0.25rem 0.75rem',
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}>
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Audit Log</h1>
            <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8fafc'}}>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Kullanıcı</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>İşlem</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Detay</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>Tarih/Saat</th>
                    <th style={{padding: '1rem', textAlign: 'left', fontWeight: '600'}}>IP Adresi</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.slice(0, 20).map(log => (
                    <tr key={log.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                      <td style={{padding: '1rem'}}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: '#e0e7ff',
                          color: '#3730a3',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem'
                        }}>
                          {log.user}
                        </span>
                      </td>
                      <td style={{padding: '1rem', fontWeight: '500'}}>{log.action}</td>
                      <td style={{padding: '1rem', color: '#6b7280', fontSize: '0.875rem'}}>{log.details}</td>
                      <td style={{padding: '1rem', fontSize: '0.875rem'}}>{log.date}</td>
                      <td style={{padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#6b7280'}}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem'}}>
              Son 20 işlem gösteriliyor. Tüm loglar sistem tarafından saklanmaktadır.
            </p>
          </div>
        )}

        {/* Diğer sekmeler için önceki kodları buraya ekleyin */}
        {(activeTab === 'dashboard' || activeTab === 'settings' || activeTab === 'media' || activeTab === 'content' || activeTab === 'pricing' || activeTab === 'contact') && (
          <div>
            <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>
              {activeTab === 'dashboard' ? 'Dashboard' : 
               activeTab === 'settings' ? 'Site Ayarları' :
               activeTab === 'media' ? 'Logo ve Görseller' :
               activeTab === 'content' ? 'İçerik Yönetimi' :
               activeTab === 'pricing' ? 'Fiyatlandırma' :
               'İletişim Bilgileri'}
            </h1>
            <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem'}}>
              <p>Bu bölüm aktif. Düzenlemeler için ilgili sekmeye tıklayın.</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </AdminLayout>
  );
}
