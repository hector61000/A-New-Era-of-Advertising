import React, { useState } from 'react';

function AdForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        platform: 'google',
        productName: '',
        description: '',
        price: '',
        whatsapp: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const platformInfo = {
        google: {
            label: "Google Ads - إعلانات احترافية",
            icon: "🎯"
        },
        facebook: {
            label: "Facebook - نصوص شاملة ومؤثرة",
            icon: "📱"
        },
        instagram: {
            label: "Instagram - نصوص قصيرة مع رموز",
            icon: "📸"
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            await onSubmit(formData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                إنشاء إعلان جديد
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Platform Selection */}
                <div>
                    <label className="block text-gray-700 text-lg mb-2">اختر المنصة:</label>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(platformInfo).map(([key, info]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleChange({ target: { name: 'platform', value: key } })}
                                className={`p-4 rounded-lg border-2 text-center transition-all ${
                                    formData.platform === key
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-2xl mb-2 block">{info.icon}</span>
                                <span className="block text-sm">{info.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label 
                            htmlFor="productName" 
                            className="block text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3"
                        >
                            اسم المنتج
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-lg sm:text-xl rounded-lg border border-white/20 
                                     bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                                     transition-colors placeholder-gray-500"
                            placeholder="مثال: كتاب تعلم صناعة الشوكولاتة"
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label 
                            htmlFor="price" 
                            className="block text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3"
                        >
                            السعر (اختياري)
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-lg sm:text-xl rounded-lg border border-white/20 
                                     bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                                     transition-colors placeholder-gray-500"
                            placeholder="مثال: 100 جنيه"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label 
                            htmlFor="description" 
                            className="block text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3"
                        >
                            وصف المنتج
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 text-lg sm:text-xl rounded-lg border border-white/20 
                                     bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                                     transition-colors placeholder-gray-500 resize-y min-h-[120px]"
                            placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                        />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                        <label 
                            htmlFor="whatsapp" 
                            className="block text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3"
                        >
                            رقم الواتساب
                        </label>
                        <div className="flex items-center">
                            <span className="text-gray-500 ml-2">+</span>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                required
                                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-lg sm:text-xl rounded-lg border border-white/20 
                                         bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                                         transition-colors placeholder-gray-500"
                                placeholder="مثال: 201002782098"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 sm:pt-8">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xl sm:text-2xl 
                                 font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-lg hover:opacity-90 transition-all duration-200 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                 transform hover:scale-[1.02] active:scale-[0.98] ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                    >
                        {isLoading ? 'جاري إنشاء الإعلان...' : 'إنشاء الإعلان'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AdForm;
