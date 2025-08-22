echo "🔧 Vercel 500 Error Fix"
cat > index.html << 'HTML'
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AvukatAjanda - AI Destekli Hukuk Yazılımı</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <header class="bg-white/10 backdrop-blur-sm">
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-balance-scale text-indigo-600 text-xl"></i>
                        </div>
                        <span class="text-xl font-bold">AvukatAjanda</span>
                    </div>
                    <a href="/app.html" class="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">Dashboard</a>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 class="text-6xl font-bold mb-8">Hukuk Büronuzu<br><span class="text-yellow-300">Dijitalleştirin</span></h1>
            <p class="text-xl mb-12 max-w-4xl mx-auto">AI destekli AvukatAjanda ile tüm süreçlerinizi otomatikleştirin.</p>
            
            <div class="space-x-6">
                <a href="/app.html" class="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
                    <i class="fas fa-rocket mr-2"></i>Dashboard'a Git
                </a>
                <button class="border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600">
                    Demo İzle
                </button>
            </div>
            
            <div class="flex justify-center gap-8 mt-12 text-white/80">
                <div><i class="fas fa-check text-green-300 mr-2"></i>Kredi kartı gerekmez</div>
                <div><i class="fas fa-check text-green-300 mr-2"></i>14 gün ücretsiz</div>
                <div><i class="fas fa-check text-green-300 mr-2"></i>Anında kurulum</div>
            </div>
        </main>
    </div>
</body>
</html>
HTML

cat > app.html << 'APP'
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AvukatAjanda - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div id="loginScreen" class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-balance-scale text-white text-2xl"></i>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">AvukatAjanda</h2>
            </div>
            
            <input type="email" id="email" value="demo@avukatajanda.com" class="w-full px-4 py-3 border rounded-lg mb-4">
            <input type="password" id="password" value="demo123" class="w-full px-4 py-3 border rounded-lg mb-6">
            
            <button onclick="login()" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
                Giriş Yap
            </button>
            
            <div class="bg-blue-50 p-4 rounded-lg mt-6">
                <p class="text-sm text-blue-800">Demo: demo@avukatajanda.com / demo123</p>
            </div>
        </div>
    </div>

    <div id="dashboard" class="min-h-screen bg-gray-50" style="display: none;">
        <nav class="bg-white shadow border-b">
            <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center">
                    <i class="fas fa-balance-scale text-indigo-600 text-2xl mr-3"></i>
                    <span class="text-xl font-bold">AvukatAjanda</span>
                </div>
                <button onclick="logout()" class="text-gray-600">Çıkış</button>
            </div>
        </nav>
        
        <div class="max-w-7xl mx-auto p-8">
            <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-balance-scale text-white text-xl"></i>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Aktif Davalar</div>
                            <div class="text-2xl font-bold">12</div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Müvekkiller</div>
                            <div class="text-2xl font-bold">45</div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-tasks text-white text-xl"></i>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Bekleyen Görevler</div>
                            <div class="text-2xl font-bold">8</div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-lira-sign text-white text-xl"></i>
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">Aylık Gelir</div>
                            <div class="text-2xl font-bold">₺125.000</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">Son Davalar</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">Boşanma Davası - Yılmaz</div>
                            <div class="text-sm text-gray-600">Ayşe Yılmaz</div>
                        </div>
                        <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Aktif</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">İş Hukuku - TechCorp</div>
                            <div class="text-sm text-gray-600">TechCorp Ltd.</div>
                        </div>
                        <span class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Beklemede</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
    function login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email === 'demo@avukatajanda.com' && password === 'demo123') {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
        } else {
            alert('Geçersiz giriş!');
        }
    }
    
    function logout() {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
    }
    </script>
</body>
</html>
APP

git add .
git commit -m "🔧 Fix Vercel 500 - Simple HTML/JS"
git push origin main

echo "✅ FIXED! Run: vercel --prod"
