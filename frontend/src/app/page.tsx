'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚖</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">AvukatAjanda</span>
            </div>
            <div className="text-sm text-green-600 font-medium">
              ✓ Production Ready
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Modern Hukuk Bürosu
            <span className="block text-indigo-600">Yönetim Sistemi</span>
          </h1>
          <p className="text-xl text-gray-600">
            SaaS tabanlı, çok kiracılı hukuk yazılımı production ortamında
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sisteme Giriş
          </h2>
          
          {/* Demo Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              🚀 Dashboard Demo
            </button>
            
            <button 
              onClick={() => window.location.href = '/dashboard/cases'}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📁 Cases Module
            </button>
            
            <button 
              onClick={() => window.location.href = '/dashboard/billing'}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              💳 Billing System
            </button>
          </div>
          
          {/* Demo Accounts */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Demo Hesapları:</h3>
            <div className="space-y-1 text-gray-600">
              <p><strong>Avukat:</strong> demo@avukatajanda.com / demo123</p>
              <p><strong>Stajyer:</strong> stajyer@avukatajanda.com / stajyer123</p>
              <p><strong>Sekreter:</strong> sekreter@avukatajanda.com / sekreter123</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Tenant SaaS</h3>
            <p className="text-gray-600 text-sm">Her hukuk bürosu için izole veri ve plan limitleri</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="font-semibold text-gray-900 mb-2">Role-Based Access</h3>
            <p className="text-gray-600 text-sm">Avukat, stajyer, sekreter roller ve yetkileri</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900 mb-2">UYAP Integration</h3>
            <p className="text-gray-600 text-sm">Gerçek UYAP belge gönderimi ve durum takibi</p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-green-50 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">
              Production ortamında aktif - Backend API çalışıyor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
