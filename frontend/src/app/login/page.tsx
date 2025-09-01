'use client';

import { useState } from 'react';
import { Logo } from '../../components/Logo';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    phone: '' 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!loginData.email || !loginData.password) {
      setError('Email ve şifre gereklidir');
      setIsLoading(false);
      return;
    }

    try {
      if (loginData.email && loginData.password) {
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
        window.location.href = '/dashboard';
        return;
      }
    } catch (err) {
      setError('Giriş hatası');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır');
      setIsLoading(false);
      return;
    }

    try {
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({ 
        name: registerData.name,
        email: registerData.email 
      }));
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
      
    } catch (err) {
      setError('Kayıt hatası');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '2rem 2rem 1rem',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <a href="/" style={{textDecoration: 'none', display: 'inline-block'}}>
            <Logo size="normal" />
          </a>
        </div>

        {/* Rest of login form... */}
      </div>
    </div>
  );
}
