import React from 'react';

function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">
                    صانع الإعلانات الذكي 🚀
                </h1>
                <p className="text-xl opacity-90">
                    أنشئ إعلانات احترافية باستخدام الذكاء الاصطناعي
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                        <span className="text-2xl mr-2">🎯</span>
                        <span>Google Ads</span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                        <span className="text-2xl mr-2">📱</span>
                        <span>Facebook</span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                        <span className="text-2xl mr-2">📸</span>
                        <span>Instagram</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
