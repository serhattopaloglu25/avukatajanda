'use client';

export default function HomePage() {
  return (
    <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Sticky Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{height: '72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#0066cc', margin: 0}}>
              AvukatAjanda
            </h1>
            <div style={{display: 'flex', gap: '2rem', alignItems: 'center'}}>
              <a href="#features" style={{color: '#64748b', textDecoration: 'none'}}>Özellikler</a>
              <a href="#pricing" style={{color: '#64748b', textDecoration: 'none'}}>Fiyatlandırma</a>
              <a href="#contact" style={{color: '#64748b', textDecoration: 'none'}}>İletişim</a>
              <a href="/login" style={{color: '#64748b', textDecoration: 'none'}}>Giriş</a>
              <a href="/login" style={{background: '#0066cc', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', textDecoration: 'none'}}>
                Ücretsiz Dene
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding: '5rem 1rem', background: 'linear-gradient(to bottom, #f8fafc, white)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '3rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
            Hukuk Büronuz İçin Komple Çözüm
          </h2>
          <p style={{fontSize: '1.25rem', color: '#64748b', maxWidth: '800px', margin: '0 auto 3rem'}}>
            Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <a href="/login" style={{background: '#0066cc', color: 'white', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '1.125rem'}}>
              14 Gün Ücretsiz Dene
            </a>
            <a href="#demo" style={{border: '2px solid #e5e7eb', padding: '0.875rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', color: '#64748b'}}>
              Demo Talep Et
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{padding: '5rem 1rem', scrollMarginTop: '72px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1e293b'}}>
            Güçlü Özellikler
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
            {[
              {icon: '⚖️', title: 'Dava Takip Sistemi', desc: 'Davalarınızı detaylı olarak takip edin'},
              {icon: '👥', title: 'Müvekkil Yönetimi', desc: 'Müvekkil bilgilerini organize edin'},
              {icon: '📄', title: 'UYAP Entegrasyonu', desc: 'UYAP sistemine direkt bağlantı'},
              {icon: '📅', title: 'Akıllı Takvim', desc: 'Duruşma ve randevu takibi'},
              {icon: '💰', title: 'Finansal Yönetim', desc: 'Tahsilat ve ödemeler'},
              {icon: '📊', title: 'Raporlama', desc: 'Detaylı performans analizleri'}
            ].map((feature, i) => (
              <div key={i} style={{background: '#f8fafc', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{feature.icon}</div>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1e293b'}}>{feature.title}</h3>
                <p style={{color: '#64748b', lineHeight: '1.6'}}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{padding: '5rem 1rem', background: '#f8fafc', scrollMarginTop: '72px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1e293b'}}>
            Fiyatlandırma
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            {[
              {name: 'Başlangıç', price: 299, features: ['1 Kullanıcı', '50 Dava', '100 GB Depolama']},
              {name: 'Profesyonel', price: 699, features: ['5 Kullanıcı', 'Sınırsız Dava', '500 GB Depolama'], popular: true},
              {name: 'Kurumsal', price: 1499, features: ['Sınırsız Kullanıcı', 'Sınırsız Dava', 'Sınırsız Depolama']}
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: plan.popular ? '2px solid #0066cc' : '1px solid #e5e7eb',
                position: 'relative'
              }}>
                {plan.popular && (
                  <div style={{position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0066cc', color: 'white', padding: '0.25rem 1rem', borderRadius: '0.375rem', fontSize: '0.875rem'}}>
                    Popüler
                  </div>
                )}
                <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>{plan.name}</h3>
                <p style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>
                  ₺{plan.price}<span style={{fontSize: '1rem', color: '#64748b', fontWeight: 'normal'}}>/ay</span>
                </p>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{padding: '0.5rem 0', color: '#64748b'}}>✓ {f}</li>
                  ))}
                </ul>
                <a href="/login" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.75rem',
                  background: plan.popular ? '#0066cc' : 'white',
                  color: plan.popular ? 'white' : '#0066cc',
                  border: plan.popular ? 'none' : '2px solid #0066cc',
                  borderRadius: '0.5rem',
                  textDecoration: 'none'
                }}>
                  Başla
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{padding: '5rem 1rem', scrollMarginTop: '72px'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', color: '#1e293b'}}>
            İletişim
          </h2>
          <div style={{background: '#f8fafc', padding: '3rem', borderRadius: '0.75rem'}}>
            <p style={{marginBottom: '2rem', fontSize: '1.125rem', color: '#64748b'}}>
              AvukatAjanda hakkında sorularınız için bizimle iletişime geçin
            </p>
            <div style={{display: 'grid', gap: '1rem', textAlign: 'left', maxWidth: '400px', margin: '0 auto'}}>
              <div><strong>Telefon:</strong> 0850 123 45 67</div>
              <div><strong>E-posta:</strong> destek@avukatajanda.com</div>
              <div><strong>Adres:</strong> Levent, İstanbul</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#1e293b', color: 'white', padding: '3rem 1rem', textAlign: 'center'}}>
        <p style={{marginBottom: '1rem'}}>© 2025 AvukatAjanda. Tüm hakları saklıdır.</p>
        <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
          <a href="/admin" style={{color: '#94a3b8', textDecoration: 'none'}}>Admin Panel</a>
          <a href="#" style={{color: '#94a3b8', textDecoration: 'none'}}>Kullanım Koşulları</a>
          <a href="#" style={{color: '#94a3b8', textDecoration: 'none'}}>Gizlilik Politikası</a>
        </div>
      </footer>
    </div>
  );
}
