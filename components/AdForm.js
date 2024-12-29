function AdForm({ onSubmit }) {
    const [formData, setFormData] = React.useState({
        platform: 'facebook',
        productName: '',
        description: '',
        price: '',
        whatsapp: ''
    });

    const platformInfo = {
        facebook: {
            label: "Facebook - نصوص شاملة ومؤثرة",
            icon: "📱"
        },
        instagram: {
            label: "Instagram - نصوص قصيرة مع رموز",
            icon: "📸"
        },
        google: {
            label: "Google Ads - نصوص موجزة وواضحة",
            icon: "🎯"
        }
    };

    function handleChange(e) {
        try {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } catch (error) {
            reportError(error);
        }
    }

    function handleSubmit(e) {
        try {
            e.preventDefault();
            onSubmit(formData);
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card" data-name="ad-form">
            <div className="form-group platform-selector" data-name="platform-group">
                <label className="block text-gray-700 mb-2">اختر المنصة:</label>
                <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="input-field"
                    data-name="platform-select"
                >
                    {Object.entries(platformInfo).map(([value, { label, icon }]) => (
                        <option key={value} value={value}>
                            {icon} {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group" data-name="product-name-group">
                <label className="block text-gray-700 mb-2">اسم المنتج/الخدمة:</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="أدخل اسم المنتج أو الخدمة"
                    required
                    data-name="product-name-input"
                />
            </div>

            <div className="form-group" data-name="description-group">
                <label className="block text-gray-700 mb-2">وصف المنتج:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    rows="4"
                    placeholder="اكتب وصفاً تفصيلياً للمنتج أو الخدمة"
                    required
                    data-name="description-input"
                />
            </div>

            <div className="form-group" data-name="price-group">
                <label className="block text-gray-700 mb-2">السعر (اختياري):</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="أدخل السعر (اختياري)"
                    data-name="price-input"
                />
            </div>

            <div className="form-group" data-name="whatsapp-group">
                <label className="block text-gray-700 mb-2">رقم الواتساب:</label>
                <div className="flex items-center">
                    <span className="text-gray-500 ml-2">https://wa.me/</span>
                    <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="20XXXXXXXXX"
                        pattern="[0-9]+"
                        required
                        data-name="whatsapp-input"
                    />
                </div>
            </div>

            <button type="submit" className="submit-button" data-name="submit-button">
                ✨ إنشاء الإعلان
            </button>
        </form>
    );
}
