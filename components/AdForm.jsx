import React, { useState } from 'react';

function AdForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        platform: 'google',
        productName: '',
        price: '',
        description: '',
        whatsapp: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
                إنشاء إعلان جديد
            </h2>

            {/* Platform Selection */}
            <div className="mb-6">
                <label className="block text-yellow-100 mb-2">اختر المنصة:</label>
                <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="radio"
                            id="instagram"
                            name="platform"
                            value="instagram"
                            checked={formData.platform === 'instagram'}
                            onChange={handleChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="instagram"
                            className={`block text-center p-4 rounded-lg cursor-pointer transition-all ${
                                formData.platform === 'instagram'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-800'
                            }`}
                        >
                            <span role="img" aria-label="instagram" className="text-2xl mb-2 block">📸</span>
                            <span className="text-sm block">Instagram - نصوص قصيرة مع رموز</span>
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="radio"
                            id="facebook"
                            name="platform"
                            value="facebook"
                            checked={formData.platform === 'facebook'}
                            onChange={handleChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="facebook"
                            className={`block text-center p-4 rounded-lg cursor-pointer transition-all ${
                                formData.platform === 'facebook'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-800'
                            }`}
                        >
                            <span role="img" aria-label="facebook" className="text-2xl mb-2 block">📱</span>
                            <span className="text-sm block">Facebook - نصوص شاملة ومؤثرة</span>
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="radio"
                            id="google"
                            name="platform"
                            value="google"
                            checked={formData.platform === 'google'}
                            onChange={handleChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="google"
                            className={`block text-center p-4 rounded-lg cursor-pointer transition-all ${
                                formData.platform === 'google'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-800'
                            }`}
                        >
                            <span role="img" aria-label="google" className="text-2xl mb-2 block">🎯</span>
                            <span className="text-sm block">Google Ads - إعلانات احترافية</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Product Name */}
            <div>
                <label className="block text-yellow-100 mb-2">اسم المنتج</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="مثال: كتاب تعلم صناعة السوق"
                    className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-yellow-100 mb-2">السعر (اختياري)</label>
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="مثال: 100 جنيه"
                    className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-yellow-100 mb-2">وصف المنتج</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                    rows="4"
                    className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                ></textarea>
            </div>

            {/* WhatsApp */}
            <div>
                <label className="block text-yellow-100 mb-2">رقم الواتساب</label>
                <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="201002782098"
                    className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    dir="ltr"
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                    إنشاء الإعلان
                </button>
            </div>
        </form>
    );
}

export default AdForm;
