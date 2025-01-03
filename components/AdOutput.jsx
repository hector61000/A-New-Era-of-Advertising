import React from 'react';

function AdOutput({ adData }) {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    // تنسيق رقم الواتساب
    const formatWhatsappNumber = (number) => {
        // إزالة أي أصفار في البداية
        const cleanNumber = number.replace(/^0+/, '');
        return cleanNumber;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
                الإعلان الجاهز
            </h2>

            {/* Main Ad Content */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-lg leading-relaxed mb-4 whitespace-pre-wrap">
                    {adData.originalText}
                </p>
                
                {/* WhatsApp Link */}
                <p className="text-lg mb-4 dir-ltr">
                    https://wa.me/{formatWhatsappNumber(adData.whatsapp)}
                </p>
                
                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {adData.hashtags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Copy Button */}
            <div className="text-center mb-6">
                <button
                    onClick={() => copyToClipboard(adData.originalText + '\n\nhttps://wa.me/' + formatWhatsappNumber(adData.whatsapp))}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
                >
                    <span className="text-xl">📋</span>
                    نسخ النص
                </button>
            </div>

            {/* Targeting Information */}
            {adData.targeting && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">معلومات الاستهداف</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">الجنس:</p>
                            <p className="font-medium">
                                {adData.targeting.gender === 'all' ? 'الجميع' : 
                                 adData.targeting.gender === 'male' ? 'ذكور' : 'إناث'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">الفئة العمرية:</p>
                            <p className="font-medium">{adData.targeting.ageRange.join(', ')}</p>
                        </div>
                        {adData.targeting.location && (
                            <div>
                                <p className="text-gray-600">المنطقة:</p>
                                <p className="font-medium">{adData.targeting.location}</p>
                            </div>
                        )}
                        {adData.targeting.interests.length > 0 && (
                            <div className="col-span-2">
                                <p className="text-gray-600 mb-2">الاهتمامات:</p>
                                <div className="flex flex-wrap gap-2">
                                    {adData.targeting.interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Marketing Tips */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">نصائح تسويقية 💡</h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        قم بتحديث إعلانك بشكل دوري لضمان فعاليته
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        استهدف جمهورك في أوقات نشاطهم
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        استخدم الهاشتاجات المقترحة لزيادة الوصول
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdOutput;
