import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username === 'admin' && password === 'admin3893') ||
      (username === 'hector' && password === 'hector1092')
    ) {
      localStorage.setItem('user', username);
      navigate('/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#E6F4FF' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        {/* قسم تسجيل الدخول */}
        <div className="w-full max-w-sm">
          <div style={{ backgroundColor: '#84b1cf' }} className="p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900">تسجيل الدخول</h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="username">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
                  required
                  dir="rtl"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="password">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
                  required
                  dir="rtl"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#0056b3] hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                دخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
