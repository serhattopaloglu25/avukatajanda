export default function DashboardPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>⚖️ AvukatAjanda</span>
          </div>
          <div>
            <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>← Ana Sayfa</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{padding: '2rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem'}}>
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>TOPLAM DAVA</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>24</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>AKTİF MÜVEKKİL</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>67</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>BELGELER</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>156</p>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem'}}>AYLIK GELİR</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>₺182,500</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <a href="/dashboard/cases" style={{textDecoration: 'none'}}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>📁</span>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b'}}>Dava Yönetimi</h3>
              </div>
              <p style={{color: '#64748b', fontSize: '0.875rem'}}>
                Tüm davalarınızı görüntüleyin ve yönetin
              </p>
            </div>
          </a>

          <a href="/dashboard/clients" style={{textDecoration: 'none'}}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>👥</span>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b'}}>Müvekkil Yönetimi</h3>
              </div>
              <p style={{color: '#64748b', fontSize: '0.875rem'}}>
                Müvekkil bilgileri ve iletişim
              </p>
            </div>
          </a>

          <a href="/dashboard/billing" style={{textDecoration: 'none'}}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                <span style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>💳</span>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b'}}>SaaS Billing</h3>
              </div>
              <p style={{color: '#64748b', fontSize: '0.875rem'}}>
                Plan yönetimi ve ödemeler
              </p>
            </div>
          </a>
        </div>

        {/* Status */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#dcfce7',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{color: '#166534', fontSize: '0.875rem', fontWeight: '500'}}>
            ✅ Backend API Aktif | ✅ Multi-tenant SaaS | ✅ UYAP Integration Ready
          </p>
        </div>
      </div>
    </div>
  );
}
