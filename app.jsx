import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import AdForm from './components/AdForm';
import AdOutput from './components/AdOutput';
import { generateAd } from './utils/adGenerator';
import logoImage from './assets/logo.png.png';
import './styles/index.css';

function App() {
    const [adData, setAdData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            setError(null);
            const generatedAd = await generateAd(formData);
            setAdData(generatedAd);
        } catch (error) {
            console.error('Error:', error);
            setError('حدث خطأ أثناء إنشاء الإعلان');
        }
    };

    return (
        <div className="min-h-screen" style={{ background: '#87CEEB' }}>
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-sm shadow-lg py-6 sm:py-8 md:py-10 mb-6 sm:mb-8 md:mb-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <img 
                            src={logoImage} 
                            alt="VenoMedia Logo" 
                            className="w-48 sm:w-56 md:w-64 lg:w-72 hover:scale-105 transition-transform duration-300"
                            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))' }}
                        />
                    </div>
                    <div>
                        <h1 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white" 
                            style={{ 
                                fontFamily: 'Arial, sans-serif',
                                letterSpacing: '1.5px',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                padding: '0.5rem 0'
                            }}
                        >
                            A New Era of Advertising
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
                        <AdForm onSubmit={handleSubmit} />
                        {error && (
                            <div className="max-w-2xl mx-auto my-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        {adData && <AdOutput adData={adData} />}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/10 backdrop-blur-sm py-4 sm:py-6 mt-8">
                <p className="text-center text-lg sm:text-xl md:text-2xl text-white">
                    جميع الحقوق محفوظة لشركة{' '}
                    <span className="text-green-400 font-bold">Green</span>
                    <span className="text-orange-400 font-bold">Light</span>
                </p>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
