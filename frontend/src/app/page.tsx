'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: 'white'}}>
      {/* Navigation */}
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '3rem'}}>
            <a href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Crect x='5' y='10' width='30' height='25' rx='2' fill='%23203a4a'/%3E%3Crect x='15' y='5' width='25' height='20' rx='2' fill='%23ffc107' opacity='0.8'/%3E%3Ctext x='45' y='25' font-family='Arial' font-size='10' fill='white'%3EAJANDA%3C/text%3E%3Ctext x='45' y='35' font-family='Arial' font-size='18' font-weight='bold' fill='%23203a4a'%3EAVUKATAJANDA%3C/text%3E%3C/svg%3E" 
                alt="AvukatAjanda" 
                style={{height: '45px'}}
              />
            </a>
            <div style={{display: 'flex', gap: '2rem'}}>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>Özellikler</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>Fiyatlandırma</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{color: '#475569', textDecoration: 'none', cursor: 'pointer'}}>İletişim</a>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            {isLoggedIn ? (
              <>
                <span style={{color: '#475569', fontSize: '0.875rem'}}>
                  Hoşgeldin, {user?.name || user?.email?.split('@')[0]}
                </span>
                <a href="/dashboard" style={{color: '#475569', textDecoration: 'none'}}>Dashboard</a>
                <button onClick={handleLogout} style={{background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.875rem'}}>
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <a href="/login" style={{color: '#475569', textDecoration: 'none'}}>Giriş Yap</a>
                <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none'}}>Ücretsiz Dene</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{background: 'linear-gradient(to bottom, #f8fafc, white)', padding: '5rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem'}}>
            Hukuk Büronuz İçin Komple Çözüm
          </h1>
          <p style={{fontSize: '1.25rem', color: '#64748b', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem'}}>
            Bulut tabanlı hukuk bürosu yazılımı ile davalarınızı, müvekkillerinizi ve belgelerinizi tek platformdan yönetin
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem'}}>
            {isLoggedIn ? (
              <a href="/dashboard" style={{background: '#0ea5e9', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem'}}>
                Dashboard'a Git
              </a>
            ) : (
              <>
                <a href="/login" style={{background: '#0ea5e9', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '1.125rem'}}>
                  14 Gün Ücretsiz Dene
                </a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} style={{border: '2px solid #e5e7eb', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', color: '#475569'}}>
                  Demo Talep Et
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{padding: '5rem 2rem', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem'}}>
            Güçlü Özellikler, Kolay Kullanım
          </h2>
          <p style={{textAlign: 'center', color: '#64748b', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem'}}>
            Hukuk büronuzun ihtiyaç duyduğu tüm araçlar tek bir platformda
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>⚖️</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Dava Takip Sistemi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Davalarınızı detaylı olarak takip edin. Duruşma tarihleri, belgeler ve notları tek yerden yönetin. Otomatik hatırlatmalar ile hiçbir tarihi kaçırmayın.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>👥</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Müvekkil Yönetimi</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Müvekkil bilgilerini, iletişim geçmişini ve dava dosyalarını organize edin. Her müvekkil için ayrı portal ile şeffaf iletişim sağlayın.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📄</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>UYAP Entegrasyonu</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                UYAP sistemine direkt entegrasyon ile evrak takibi ve gönderimi yapın. Otomatik senkronizasyon ile güncel kalın.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📅</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Akıllı Takvim</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Duruşmalar, toplantılar ve önemli tarihler için akıllı takvim. Google Calendar ve Outlook ile senkronize çalışır.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>💰</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Finansal Yönetim</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Vekalet ücretleri, masraflar ve tahsilatları takip edin. Otomatik faturalama ve e-Fatura entegrasyonu ile muhasebe süreçlerini kolaylaştırın.
              </p>
            </div>
            
            <div style={{padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📊</div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Detaylı Raporlama</h3>
              <p style={{color: '#64748b', lineHeight: '1.6'}}>
                Büronuzun performansını analiz edin. Dava istatistikleri, gelir raporları ve verimlilik analizleri ile büyümeyi takip edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{padding: '5rem 2rem', background: '#f8fafc'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem'}}>
            Size Uygun Plan Seçin
          </h2>
          <p style={{textAlign: 'center', color: '#64748b', marginBottom: '3rem'}}>
            14 gün ücretsiz deneme, kredi kartı gerektirmez
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'}}>
            {/* Başlangıç Plan */}
            <div style={{background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e5e7eb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem'}}>Başlangıç</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem'}}>Tek avukat ve küçük bürolar için</p>
              <div style={{marginBottom: '1.5rem'}}>
                <span style={{fontSize: '2.5rem', fontWeight: 'bold'}}>₺299</span>
                <span style={{color: '#64748b'}}>/ay</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ 1 Kullanıcı</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ 50 Aktif Dava</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ 100 GB Depolama</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Temel UYAP Entegrasyonu</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Mobil Uygulama</li>
                <li style={{padding: '0.5rem 0'}}>✓ E-posta Desteği</li>
              </ul>
              <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                border: '2px solid #0ea5e9',
                borderRadius: '8px',
                color: '#0ea5e9',
                textDecoration: 'none'
              }}>
                Başla
              </a>
            </div>

            {/* Profesyonel Plan */}
            <div style={{background: 'white', borderRadius: '12px', padding: '2rem', border: '2px solid #0ea5e9', position: 'relative'}}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0ea5e9',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '0.875rem'
              }}>
                En Popüler
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem'}}>Profesyonel</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem'}}>Büyüyen bürolar için ideal</p>
              <div style={{marginBottom: '1.5rem'}}>
                <span style={{fontSize: '2.5rem', fontWeight: 'bold'}}>₺699</span>
                <span style={{color: '#64748b'}}>/ay</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ 5 Kullanıcı</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Sınırsız Dava</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ 500 GB Depolama</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Gelişmiş UYAP Entegrasyonu</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Müvekkil Portalı</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ e-İmza Entegrasyonu</li>
                <li style={{padding: '0.5rem 0'}}>✓ 7/24 Telefon Desteği</li>
              </ul>
              <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                background: '#0ea5e9',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none'
              }}>
                Başla
              </a>
            </div>

            {/* Kurumsal Plan */}
            <div style={{background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e5e7eb'}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem'}}>Kurumsal</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem'}}>Büyük hukuk büroları için</p>
              <div style={{marginBottom: '1.5rem'}}>
                <span style={{fontSize: '2.5rem', fontWeight: 'bold'}}>₺1499</span>
                <span style={{color: '#64748b'}}>/ay</span>
              </div>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Sınırsız Kullanıcı</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Sınırsız Dava</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Sınırsız Depolama</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Tam UYAP Entegrasyonu</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ API Erişimi</li>
                <li style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6'}}>✓ Özel Eğitim</li>
                <li style={{padding: '0.5rem 0'}}>✓ Özel Hesap Yöneticisi</li>
              </ul>
              <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                padding: '0.75rem',
                border: '2px solid #0ea5e9',
                borderRadius: '8px',
                color: '#0ea5e9',
                textDecoration: 'none'
              }}>
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{padding: '5rem 2rem', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem'}}>
            İletişime Geçin
          </h2>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem'}}>
            <div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>
                Sorularınız mı var?
              </h3>
              <p style={{color: '#64748b', marginBottom: '2rem', lineHeight: '1.6'}}>
                AvukatAjanda hakkında merak ettikleriniz için bizimle iletişime geçebilirsiniz. 
                Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
              </p>
              
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{fontWeight: '600', marginBottom: '0.5rem'}}>Telefon</h4>
                <p style={{color: '#64748b'}}>0850 123 45 67</p>
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{fontWeight: '600', marginBottom: '0.5rem'}}>E-posta</h4>
                <p style={{color: '#64748b'}}>destek@avukatajanda.com</p>
              </div>
              
              <div style={{marginBottom: '1.5rem'}}>
                <h4 style={{fontWeight: '600', marginBottom: '0.5rem'}}>Adres</h4>
                <p style={{color: '#64748b'}}>
                  Levent, Büyükdere Cad. No:123<br/>
                  34394 Şişli/İstanbul
                </p>
              </div>
              
              <div>
                <h4 style={{fontWeight: '600', marginBottom: '0.5rem'}}>Çalışma Saatleri</h4>
                <p style={{color: '#64748b'}}>
                  Pazartesi - Cuma: 09:00 - 18:00<br/>
                  Cumartesi: 10:00 - 14:00
                </p>
              </div>
            </div>
            
            <div>
              <form style={{background: '#f8fafc', padding: '2rem', borderRadius: '12px'}}>
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    Ad Soyad
                  </label>
                  <input 
                    type="text"
                    placeholder="Adınız Soyadınız"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    E-posta
                  </label>
                  <input 
                    type="email"
                    placeholder="ornek@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    Telefon
                  </label>
                  <input 
                    type="tel"
                    placeholder="0555 555 55 55"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                    Mesajınız
                  </label>
                  <textarea
                    placeholder="Mesajınızı buraya yazın..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#1f2937', color: 'white', padding: '3rem 2rem 2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '2rem'}}>
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>AvukatAjanda</h4>
              <p style={{fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.6'}}>
                Türkiye'nin lider bulut tabanlı hukuk bürosu yönetim yazılımı
              </p>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Özellikler</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Dava Takibi</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Müvekkil Yönetimi</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>UYAP Entegrasyonu</a></li>
                <li><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Raporlama</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Destek</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Yardım Merkezi</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>API Dokümantasyonu</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Video Eğitimler</a></li>
                <li><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>SSS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem'}}>Yasal</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Kullanım Koşulları</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Gizlilik Politikası</a></li>
                <li style={{marginBottom: '0.5rem'}}><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>KVKK</a></li>
                <li><a href="#" style={{color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem'}}>Çerez Politikası</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center'}}>
            <p style={{fontSize: '0.875rem', color: '#9ca3af'}}>
              © 2025 AvukatAjanda. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
