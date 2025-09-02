'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [settings, setSettings] = useState({
    primary_color: '#0066cc',
    secondary_color: '#64748b',
    hero_title: 'Hukuk Büronuz İçin Komple Çözüm',
    hero_subtitle: 'Bulut tabanlı hukuk bürosu yazılımı'
  });

  useEffect(() => {
    // Admin'den kaydedilen ayarları yükle
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div style={{fontFamily: 'system-ui', minHeight: '100vh'}}>
      <nav style={{background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: settings.primary_color}}>
            AvukatAjanda
          </h1>
          <div style={{display: 'flex', gap: '1rem'}}>
            <a href="/login" style={{color: settings.secondary_color, textDecoration: 'none'}}>Giriş</a>
            <a href="/admin" style={{color: settings.secondary_color, textDecoration: 'none'}}>Admin</a>
          </div>
        </div>
      </nav>

      <section style={{padding: '5rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, #f8fafc, white)'}}>
        <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0f172a'}}>
          {settings.hero_title}
        </h1>
        <p style={{fontSize: '1.25rem', color: settings.secondary_color, marginBottom: '2rem'}}>
          {settings.hero_subtitle}
        </p>
        <button style={{
          background: settings.primary_color,
          color: 'white',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.125rem',
          cursor: 'pointer'
        }}>
          14 Gün Ücretsiz Dene
        </button>
      </section>

      <section style={{padding: '3rem 2rem', background: 'white'}}>
        <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '2rem'}}>Özellikler</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1280px', margin: '0 auto'}}>
          <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem'}}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⚖️</div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Dava Takibi</h3>
            <p style={{color: settings.secondary_color}}>Davalarınızı kolayca takip edin</p>
          </div>
          <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem'}}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>👥</div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Müvekkil Yönetimi</h3>
            <p style={{color: settings.secondary_color}}>Müvekkil bilgilerini organize edin</p>
          </div>
          <div style={{padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem'}}>
            <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📄</div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>UYAP Entegrasyonu</h3>
            <p style={{color: settings.secondary_color}}>UYAP sistemine direkt bağlantı</p>
          </div>
        </div>
      </section>
    </div>
  );
}
