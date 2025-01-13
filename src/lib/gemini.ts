import { GoogleGenerativeAI } from '@google/generative-ai';

// يمكنك الحصول على مفتاح API مجاني من:
// https://makersuite.google.com/app/apikey
const API_KEY = 'AIzaSyDL95lk32n9sEUDEdy5ssTeFZllUHmO7e8';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateAdText(
    platform: string,
    productName: string,
    price: string,
    description: string
): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    اكتب إعلاناً جذاباً باللغة العربية للمنتج التالي:
    
    المنتج: ${productName}
    السعر: ${price}
    الوصف: ${description}
    المنصة: ${platform}
    
    يجب أن يتبع الإعلان التنسيق التالي:
    1. عنوان رئيسي قوي في الأعلى
    2. وصف المنتج والمزايا في المنتصف
    3. دعوة للتواصل في النهاية
    
    ملاحظات:
    - استخدم الرموز التعبيرية المناسبة
    - اجعل النص مناسباً لمنصة ${platform}
    - اكتب النص مباشرة بدون أي مقدمات أو تعليقات
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text.trim();
    } catch (error) {
        console.error('Error generating ad text:', error);
        throw new Error('فشل في توليد نص الإعلان. الرجاء المحاولة مرة أخرى.');
    }
}

export async function generateHashtags(
    productName: string,
    platform: string
): Promise<string[]> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    اقترح 5 هاشتاجات مناسبة باللغة العربية للمنتج التالي:
    
    المنتج: ${productName}
    المنصة: ${platform}
    
    ملاحظات:
    - اكتب الهاشتاجات فقط بدون أي نصوص إضافية
    - افصل بين الهاشتاجات بسطر جديد
    - لا تضع علامة # في البداية
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text
            .trim()
            .split('\n')
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => tag.startsWith('#') ? tag.slice(1) : tag);
    } catch (error) {
        console.error('Error generating hashtags:', error);
        return ['اعلان', 'تسويق', productName.replace(/\s+/g, '_')];
    }
}

export async function generateTargeting(
    platform: string,
    productName: string,
    description: string
): Promise<string[]> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    اقترح 5 نصائح للاستهداف الإعلاني على منصة ${platform} للمنتج التالي:
    
    المنتج: ${productName}
    الوصف: ${description}
    
    يجب أن تشمل النصائح:
    - الفئة العمرية المناسبة
    - المناطق الجغرافية المستهدفة
    - الاهتمامات والهوايات
    - المستوى التعليمي أو الوظيفي
    - القدرة الشرائية
    
    ملاحظات:
    - اكتب النصائح مباشرة بدون ترقيم أو علامات
    - اجعل كل نصيحة في سطر منفصل
    - اكتب بأسلوب مباشر وواضح
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text
            .trim()
            .split('\n')
            .map(tip => tip.trim())
            .filter(tip => tip);
    } catch (error) {
        console.error('Error generating targeting tips:', error);
        return [
            'استهدف الفئة العمرية 25-45 سنة',
            'ركز على المدن الرئيسية',
            'استهدف المهتمين بمجال المنتج',
            'استهدف ذوي الدخل المتوسط والمرتفع',
            'ركز على المستخدمين النشطين على المنصة'
        ];
    }
}

export async function generateTips(platform: string): Promise<string[]> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    اقترح 5 نصائح مفيدة للإعلان على منصة ${platform}.
    
    يجب أن تشمل النصائح:
    - أفضل أوقات النشر
    - طريقة كتابة العنوان
    - استخدام الصور والفيديوهات
    - التفاعل مع التعليقات
    - الميزانية والاستهداف
    
    ملاحظات:
    - اكتب النصائح مباشرة بدون ترقيم أو علامات
    - اجعل كل نصيحة في سطر منفصل
    - اكتب بأسلوب مباشر وواضح
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text
            .trim()
            .split('\n')
            .map(tip => tip.trim())
            .filter(tip => tip);
    } catch (error) {
        console.error('Error generating platform tips:', error);
        return [
            'انشر إعلانك في أوقات الذروة',
            'استخدم عنواناً جذاباً وقصيراً',
            'أضف صوراً عالية الجودة',
            'تفاعل مع التعليقات بسرعة',
            'ابدأ بميزانية صغيرة وزد تدريجياً'
        ];
    }
}

export async function generateImageDescription(
    productName: string,
    description: string,
    platform: string
): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
    اقترح وصفاً مثالياً لصورة إعلانية للمنتج التالي على منصة ${platform}:
    
    المنتج: ${productName}
    الوصف: ${description}
    
    يجب أن يشمل الوصف:
    - خلفية الصورة وألوانها
    - وضعية المنتج وطريقة عرضه
    - العناصر المحيطة بالمنتج
    - الإضاءة والتأثيرات
    - النص المقترح على الصورة
    
    ملاحظات:
    - اكتب وصفاً تفصيلياً يمكن لأي مصمم تنفيذه
    - ركز على العناصر التي تجذب انتباه المستخدم
    - اجعل الوصف مناسباً لمنصة ${platform}
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text.trim();
    } catch (error) {
        console.error('Error generating image description:', error);
        return `صورة احترافية للمنتج "${productName}" على خلفية بسيطة مع إضاءة جيدة وشعار العلامة التجارية في الزاوية.`;
    }
}
