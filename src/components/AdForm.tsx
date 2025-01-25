import React, { useState } from 'react';
import { generateAdText, generateHashtags, generateTargeting, generateTips, generateImageDescription } from '../lib/gemini';

interface FormData {
    platform: string;
    productName: string;
    price: string;
    description: string;
    whatsapp: string;
}

interface GeneratedAd {
    text: string;
    targeting?: string[];
    tips?: string[];
    imageDescription?: string;
}

const platforms = [
    {
        id: 'google-ads',
        name: 'Google Ads',
        icon: '/assets/images/google-ads-icon.png',
        description: 'إعلانات احترافية'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: '/assets/images/facebook-icon.png',
        description: 'نصوص شاملة ومؤثرة'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: '/assets/images/instagram-icon.png',
        description: 'نصوص قصيرة مع رموز'
    }
];

function AdForm() {
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        platform: 'google',
        productName: '',
        price: '',
        description: '',
        whatsapp: ''
    });

    const [generatedAd, setGeneratedAd] = useState<GeneratedAd | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // توليد نص الإعلان باستخدام Gemini
            const adText = await generateAdText(
                formData.platform,
                formData.productName,
                formData.price,
                formData.description
            );

            // توليد الهاشتاجات
            const hashtags = await generateHashtags(formData.productName, formData.platform);

            // توليد نصائح الاستهداف
            const targeting = await generateTargeting(formData.platform, formData.productName, formData.description);

            // توليد نصائح للمستخدم
            const tips = await generateTips(formData.platform);

            // توليد وصف الصورة
            const imageDescription = await generateImageDescription(formData.productName, formData.description, formData.platform);

            // إضافة رابط الواتساب والهاشتاجات
            const finalText = `${adText}\n\n📱 للتواصل واتساب:\nwa.me/${formData.whatsapp}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}`;

            setGeneratedAd({ 
                text: finalText,
                targeting,
                tips,
                imageDescription
            });
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء الإعلان');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4">
            {/* Platform Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {platforms.map((platform) => (
                    <button
                        key={platform.id}
                        onClick={() => {
                            setSelectedPlatform(platform.id);
                            setFormData(prev => ({ ...prev, platform: platform.id === 'google-ads' ? 'google' : platform.id === 'facebook' ? 'facebook' : 'instagram' }));
                        }}
                        className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                            selectedPlatform === platform.id
                                ? 'bg-[#0056b3] shadow-lg scale-105'
                                : 'bg-[#84b1cf] hover:shadow-lg'
                        }`}
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <img 
                                src={platform.icon}
                                alt={platform.name}
                                className="w-16 h-16 object-contain"
                            />
                            <h3 className={`text-xl font-semibold ${
                                selectedPlatform === platform.id ? 'text-white' : 'text-gray-900'
                            }`}>
                                {platform.name}
                            </h3>
                            <p className={`text-sm text-center ${
                                selectedPlatform === platform.id ? 'text-white' : 'text-gray-900'
                            }`}>
                                {platform.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Form Content */}
            {selectedPlatform && (
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} style={{ backgroundColor: '#84b1cf' }} className="space-y-6 p-6 rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            إنشاء إعلان {platforms.find(p => p.id === selectedPlatform)?.name}
                        </h2>

                        {/* Product Name */}
                        <div>
                            <label className="block text-gray-900 font-bold mb-2">اسم المنتج</label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="مثال: كتاب تعلم صناعة السوق"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-900 font-bold mb-2">السعر (اختياري)</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="مثال: 100 جنيه"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-900 font-bold mb-2">وصف المنتج</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                required
                            ></textarea>
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="block text-gray-900 font-bold mb-2">رقم الواتساب</label>
                            <input
                                type="text"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="201002782098"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                dir="ltr"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg transition-colors ${
                                    isLoading 
                                    ? 'bg-orange-400 cursor-not-allowed' 
                                    : 'bg-orange-500 hover:bg-orange-600'
                                } text-white`}
                            >
                                {isLoading ? 'جاري إنشاء الإعلان...' : 'إنشاء الإعلان'}
                            </button>
                        </div>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                            <p className="text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Generated Ad */}
                    {generatedAd && (
                        <div className="mt-8 space-y-6">
                            {/* Ad Text */}
                            <div className="p-6 bg-purple-800/50 rounded-lg">
                                <h3 className="text-xl font-bold text-yellow-100 mb-4">الإعلان المُنشأ:</h3>
                                <div className="relative">
                                    <pre className="whitespace-pre-wrap text-purple-200 font-mono bg-purple-900/50 p-4 rounded-lg">
                                        {generatedAd.text}
                                    </pre>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedAd.text);
                                            alert('تم نسخ الإعلان!');
                                        }}
                                        className="absolute top-2 left-2 p-2 bg-purple-700 text-purple-200 rounded hover:bg-purple-600 transition-colors"
                                        title="نسخ الإعلان"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>

                            {/* Targeting Tips */}
                            {generatedAd.targeting && (
                                <div className="p-6 bg-purple-800/50 rounded-lg">
                                    <h3 className="text-xl font-bold text-yellow-100 mb-4">
                                        <span className="ml-2">🎯</span>
                                        نصائح الاستهداف:
                                    </h3>
                                    <ul className="space-y-2">
                                        {generatedAd.targeting.map((tip, index) => (
                                            <li key={index} className="flex items-start space-x-2 text-purple-200">
                                                <span className="text-orange-400 ml-2">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Platform Tips */}
                            {generatedAd.tips && (
                                <div className="p-6 bg-purple-800/50 rounded-lg">
                                    <h3 className="text-xl font-bold text-yellow-100 mb-4">
                                        <span className="ml-2">💡</span>
                                        نصائح مفيدة:
                                    </h3>
                                    <ul className="space-y-2">
                                        {generatedAd.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start space-x-2 text-purple-200">
                                                <span className="text-orange-400 ml-2">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Image Description */}
                            {generatedAd.imageDescription && (
                                <div className="p-6 bg-purple-800/50 rounded-lg">
                                    <h3 className="text-xl font-bold text-yellow-100 mb-4">
                                        <span className="ml-2">📸</span>
                                        وصف الصورة المقترحة:
                                    </h3>
                                    <div className="bg-purple-900/50 p-4 rounded-lg">
                                        <p className="text-purple-200 whitespace-pre-wrap leading-relaxed">
                                            {generatedAd.imageDescription}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdForm;
