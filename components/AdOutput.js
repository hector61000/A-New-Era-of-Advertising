function AdOutput({ adData }) {
    const [copied, setCopied] = React.useState(false);

    const platformBadge = {
        facebook: { bg: "bg-blue-600", icon: "📱" },
        instagram: { bg: "bg-purple-600", icon: "📸" },
        google: { bg: "bg-red-600", icon: "🎯" }
    };

    function copyToClipboard(text) {
        try {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            reportError(error);
        }
    }

    if (!adData) return null;

    const whatsappUrl = `https://wa.me/${adData.whatsapp}`;

    return (
        <div className="output-section" data-name="ad-output">
            <div className={`platform-badge ${platformBadge[adData.platform].bg} text-white px-3 py-1 rounded-full inline-flex items-center mb-4`}>
                <span className="mr-2">{platformBadge[adData.platform].icon}</span>
                <span>{adData.platform.charAt(0).toUpperCase() + adData.platform.slice(1)}</span>
            </div>

            <div className="preview-section" data-name="preview-section">
                <div className="ad-content" data-name="ad-content">
                    <div className="text-content">
                        {adData.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                        <p className="mt-4 text-lg font-bold">للتواصل عبر واتساب: {whatsappUrl}</p>
                    </div>
                    
                    <div className="hashtags mt-4" data-name="hashtags">
                        {adData.hashtags.map((tag, index) => (
                            <span key={index} className="ml-2 text-blue-600">#{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="marketing-tips mt-6 p-4 bg-green-50 rounded" data-name="marketing-tips">
                    <h3 className="font-bold text-lg mb-3">💡 نصائح تسويقية:</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {adData.marketingTips.map((tip, index) => (
                            <li key={index} className="text-gray-700">{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button
                onClick={() => copyToClipboard(`${adData.content}\n\nللتواصل عبر واتساب: ${whatsappUrl}\n\n${adData.hashtags.map(tag => `#${tag}`).join(' ')}`)}
                className="copy-button mt-4"
                data-name="copy-button"
            >
                {copied ? '✅ تم النسخ!' : '📋 نسخ الإعلان'}
            </button>
        </div>
    );
}
