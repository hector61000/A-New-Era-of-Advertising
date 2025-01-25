import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import AdForm from './components/AdForm';
import Navbar from './components/Navbar';
import './styles/index.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [showCourses, setShowCourses] = React.useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="min-h-screen" style={{ backgroundColor: '#E6F4FF' }}>
                  {/* Header with Logo */}
                  <header className="py-8 text-center">
                    <div className="max-w-xl mx-auto">
                      <div className="bg-[#E6F4FF] p-4 rounded-lg">
                        <img 
                          src="assets/images/logo.png" 
                          alt="إعلانيكس" 
                          className="w-full h-auto object-contain"
                          style={{ maxHeight: '120px' }}
                        />
                      </div>
                    </div>
                  </header>

                  {/* Navigation */}
                  <nav className="relative flex justify-center gap-4 pb-8">
                    <button
                      onClick={() => setShowCourses(false)}
                      className={`px-6 py-2 rounded-lg transition-all ${
                        !showCourses
                          ? 'bg-[#0056b3] text-white shadow-lg'
                          : 'bg-[#84b1cf] text-gray-900 hover:bg-[#0056b3] hover:text-white'
                      }`}
                    >
                      إنشاء إعلان
                    </button>
                    <button
                      onClick={() => setShowCourses(true)}
                      className={`px-6 py-2 rounded-lg transition-all ${
                        showCourses
                          ? 'bg-[#10B981] text-white shadow-lg'
                          : 'bg-[#84b1cf] text-gray-900 hover:bg-[#10B981] hover:text-white'
                      }`}
                    >
                      كورسات
                    </button>
                  </nav>

                  {/* Main Content */}
                  <main className="container mx-auto px-4 pb-12">
                    <div className="max-w-4xl mx-auto">
                      {!showCourses && <AdForm />}
                      {showCourses && (
                        <div className="text-center text-2xl text-gray-600">
                          قريباً...
                        </div>
                      )}
                    </div>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
