import { GEMINI_API_URL, getGeminiHeaders } from './apiConfig';

// وظيفة مساعدة للتحقق من صحة البيانات
function validateInput(productName, description) {
    if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
        throw new Error('اسم المنتج مطلوب');
    }
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
        throw new Error('وصف المنتج مطلوب');
    }
}

// وظيفة مساعدة لمعالجة استجابة Gemini API
async function callGeminiAPI(prompt) {
    console.log('Calling Gemini API with prompt:', prompt);
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                ...getGeminiHeaders(),
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        console.log('Gemini API Response Status:', response.status);
        const data = await response.json();
        console.log('Gemini API Response:', data);

        if (!response.ok) {
            throw new Error(data.error?.message || 'خطأ في الاتصال مع Gemini API');
        }

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error('استجابة غير صالحة من Gemini API');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        throw error;
    }
}

async function generateAdText(productName, description) {
    console.log('Generating ad text for:', { productName, description });
    
    try {
        validateInput(productName, description);

        const prompt = `
        قم بإنشاء نص إعلاني جذاب باللغة العربية للمنتج التالي:
        
        اسم المنتج: ${productName}
        الوصف: ${description}
        
        المطلوب:
        - نص إعلاني لا يقل عن 150 كلمة
        - يجب أن يكون النص جذاباً ومقنعاً
        - استخدام أسلوب تسويقي احترافي
        - التركيز على مميزات وفوائد المنتج
        - إضافة عبارات تحفيزية مناسبة
        - تجنب المبالغة والادعاءات غير الواقعية
        
        قم بتنسيق النص بشكل جيد مع استخدام الرموز التعبيرية المناسبة.
        `;

        const adText = await callGeminiAPI(prompt);
        console.log('Generated ad text:', adText);
        return adText;
    } catch (error) {
        console.error('Error in generateAdText:', error);
        throw new Error('حدث خطأ أثناء إنشاء نص الإعلان: ' + error.message);
    }
}

async function analyzeTargeting(productName, description) {
    console.log('Analyzing targeting for:', { productName, description });
    
    try {
        validateInput(productName, description);

        const prompt = `
        قم بتحليل معلومات المنتج التالية وتحديد أفضل خيارات الاستهداف:

        اسم المنتج: ${productName}
        الوصف: ${description}

        المطلوب تحديد:
        1. الجنس المستهدف (ذكور/إناث/الجميع)
        2. الفئات العمرية المناسبة
        3. الاهتمامات ذات الصلة (10 اهتمامات على الأقل)
        4. المناطق الجغرافية المقترحة

        قم بإرجاع النتائج بتنسيق JSON فقط، بدون أي نص إضافي:
        {
            "gender": "all/male/female",
            "ageRanges": ["18-24", "25-34", "35-44", "45-54", "55+"],
            "interests": ["اهتمام1", "اهتمام2", ...],
            "location": "المنطقة المقترحة"
        }
        `;

        const targetingText = await callGeminiAPI(prompt);
        console.log('Raw targeting response:', targetingText);

        // تنظيف النص وتحويله إلى JSON
        const cleanedText = targetingText.replace(/```json\n?|\n?```/g, '').trim();
        console.log('Cleaned targeting text:', cleanedText);

        try {
            const targeting = JSON.parse(cleanedText);
            console.log('Parsed targeting:', targeting);
            return targeting;
        } catch (parseError) {
            console.error('Error parsing targeting JSON:', parseError);
            throw new Error('خطأ في تحليل استجابة الاستهداف');
        }
    } catch (error) {
        console.error('Error in analyzeTargeting:', error);
        // إرجاع استهدافات افتراضية في حالة الخطأ
        return {
            gender: 'all',
            ageRanges: ['18-24', '25-34'],
            interests: ['تسوق_اونلاين', 'عروض_خاصة'],
            location: ''
        };
    }
}

export async function generateAd(formData) {
    console.log('Starting ad generation with data:', formData);
    
    try {
        // التحقق من البيانات المدخلة
        if (!formData || !formData.productName || !formData.description) {
            throw new Error('البيانات المدخلة غير مكتملة');
        }

        // توليد نص الإعلان
        const adText = await generateAdText(formData.productName, formData.description);
        
        // تحليل الاستهدافات
        const targeting = await analyzeTargeting(formData.productName, formData.description);

        // إنشاء هاشتاجات ديناميكية
        const baseHashtags = ['تسوق_اونلاين', 'عروض_خاصة'];
        const productHashtags = formData.productName
            .split(' ')
            .map(word => word.replace(/[^\u0621-\u064A0-9]/g, ''))
            .filter(word => word.length > 2)
            .map(word => word);

        // إضافة هاشتاجات من الاستهدافات
        const targetingHashtags = [
            ...targeting.interests.map(interest => interest.replace(/\s+/g, '_')),
            targeting.location ? targeting.location.replace(/\s+/g, '_') : ''
        ].filter(Boolean);

        // دمج وتنقية الهاشتاجات
        const allHashtags = [...new Set([
            ...baseHashtags,
            ...productHashtags,
            ...targetingHashtags
        ])].slice(0, 8);

        // معالجة رقم الواتساب
        const whatsappNumber = (formData.whatsapp || '').replace(/^\+/, '');
        if (!/^\d{10,}$/.test(whatsappNumber)) {
            throw new Error('رقم الواتساب غير صالح');
        }

        const result = {
            originalText: adText,
            hashtags: allHashtags,
            whatsapp: whatsappNumber,
            targeting: {
                gender: targeting.gender,
                ageRange: targeting.ageRanges,
                interests: targeting.interests,
                location: targeting.location
            }
        };

        console.log('Generated ad result:', result);
        return result;
    } catch (error) {
        console.error('Error in generateAd:', error);
        throw new Error('حدث خطأ أثناء إنشاء الإعلان: ' + error.message);
    }
}
