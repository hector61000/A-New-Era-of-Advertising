import React, { useState } from 'react';
import AdForm from './components/AdForm';
import Courses from './components/Courses';
import './styles/index.css';
import FacebookIcon from './assets/images/تصميم بدون عنوان (3).png';
import InstagramIcon from './assets/images/لقطة شاشة 2025-01-15 112104.png';
import GoogleIcon from './assets/images/312.png';
import Logo from './assets/images/12.png';

function App() {
    const [showCourses, setShowCourses] = useState(false);

    return (
        <div className="min-h-screen bg-purple-900">
            {/* Header */}
            <header className="relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-600/50 blur-xl"></div>
                    <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-orange-500/30 blur-xl"></div>
                    <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full bg-purple-400/40 blur-lg"></div>
                </div>

                {/* Logo and Title */}
                <div className="relative pt-20 pb-16 text-center">
                    <img src={Logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
                    <h1 className="text-7xl font-bold text-white mb-4 tracking-wider">
                        اعلنك عندنا - نجاحك في إعلانك
                    </h1>
                    <p className="text-2xl text-yellow-100/90 tracking-widest">
                        - CREATING ADVERTION -
                    </p>
                </div>

                {/* Navigation */}
                <nav className="relative flex justify-center gap-4 pb-8">
                    <button
                        onClick={() => setShowCourses(false)}
                        className={`px-6 py-2 rounded-lg transition-all ${
                            !showCourses 
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-purple-800/50 text-purple-200 hover:bg-purple-800'
                        }`}
                    >
                        إنشاء إعلان
                    </button>
                    <button
                        onClick={() => setShowCourses(true)}
                        className={`px-6 py-2 rounded-lg transition-all ${
                            showCourses 
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-purple-800/50 text-purple-200 hover:bg-purple-800'
                        }`}
                    >
                        كورسات
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 pb-12">
                <div className="max-w-4xl mx-auto">
                    {showCourses ? <Courses /> : <AdForm />}
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-4">
                <p className="text-white">جميع الحقوق محفوظة لشركة جرين لايت</p>
            </footer>
        </div>
    );
}

export default App;
