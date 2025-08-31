'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            AvukatAjanda SaaS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern hukuk bürosu yönetim sistemi
          </p>
          
          <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-medium mb-4">Demo Giriş</h2>
            
            <div className="space-y-3">
              <Link 
                href="/dashboard"
                className="block w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 text-center"
              >
                Dashboard'a Git
              </Link>
              
              <div className="text-xs text-gray-500">
                <p>Demo: demo@avukatajanda.com / demo123</p>
                <p>Backend API: Aktif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
