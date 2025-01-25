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

  const handleCustomerSupport = () => {
    window.open('https://wa.me/201030435987', '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundColor: '#E6F4FF' }}>
      {/* زر خدمة العملاء */}
      <button
        onClick={handleCustomerSupport}
        className="fixed top-4 left-4 transition-transform hover:scale-105 focus:outline-none"
        title="تواصل مع خدمة العملاء"
      >
        <img 
          src="assets/images/customer-service.png" 
          alt="خدمة العملاء" 
          className="w-16 h-auto"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        {/* الشعار */}
        <div className="w-full max-w-sm mb-8">
          <div className="bg-[#E6F4FF] rounded-lg flex justify-center items-center" style={{ height: '120px' }}>
            <img 
              src="assets/images/logo.png" 
              alt="إعلانيكس - ثورة التكنولوجيا في عالم الإعلانات" 
              className="max-h-full w-auto p-4"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

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
