async function generateAd(productData) {
    try {
        const platformPrompts = {
            facebook: "نص شامل وعاطفي يركز على المشاعر وبناء العلاقات. يجب أن يكون النص طويلاً ومفصلاً مع 300 كلمة على الأقل.",
            instagram: "نص قصير وجذاب مع رموز تعبيرية 🌟 يناسب منصة انستجرام. يجب أن يكون النص 300 كلمة.",
            google: "نص موجز وواضح مع كلمات مفتاحية محددة. يجب أن يكون النص 300 كلمة."
        };

        const systemPrompt = `أنت خبير في كتابة الإعلانات التسويقية. مهمتك هي إنشاء إعلان احترافي باللغة العربية مناسب لمنصة ${productData.platform}. ${platformPrompts[productData.platform]}

المعلومات المتوفرة:
- اسم المنتج: ${productData.productName}
- الوصف: ${productData.description}
${productData.price ? `- السعر: ${productData.price}` : ''}

يجب أن يكون الإعلان:
1. جذاباً ومقنعاً ومنسقاً بشكل احترافي
2. يحتوي على مزايا وفوائد المنتج بشكل مفصل
3. يتضمن دعوة للتواصل
4. يحتوي على 5-7 هاشتاجات مناسبة
5. يتضمن 3-5 نصائح تسويقية مفيدة`;

        const userPrompt = "قم بإنشاء إعلان احترافي مع هاشتاجات ونصائح تسويقية";

        const response = await invokeAIAgent(systemPrompt, userPrompt);
        
        // Extract hashtags from the response
        const hashtags = response.match(/#[\u0600-\u06FFa-zA-Z0-9_]+/g) || [];
        const content = response.replace(/#[\u0600-\u06FFa-zA-Z0-9_]+/g, '').trim();

        // Generate marketing tips
        const marketingTips = [
            "استخدم صوراً جذابة وعالية الجودة لمنتجك",
            "قم بتحديث إعلانك بشكل دوري لضمان فعاليته",
            "استهدف جمهورك في أوقات نشاطهم على المنصة",
            "اجعل عنوان إعلانك مميزاً وملفتاً للانتباه",
            "استخدم عروضاً حصرية لتحفيز التفاعل"
        ];

        return {
            content,
            hashtags: hashtags.map(tag => tag.replace('#', '')),
            whatsapp: productData.whatsapp,
            platform: productData.platform,
            marketingTips
        };
    } catch (error) {
        reportError(error);
        throw new Error('فشل في إنشاء الإعلان');
    }
}
