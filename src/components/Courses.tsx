import React, { useState, useEffect } from 'react';

interface Video {
    id: string;
    title: string;
    description: string;
    videoId: string;
}

const DEMO_VIDEOS: Video[] = Array(6).fill({
    id: '1',
    title: 'كيفية إنشاء إعلان احترافي',
    description: 'تعلم كيفية إنشاء إعلانات جذابة ومؤثرة لمنتجاتك وخدماتك',
    videoId: 'e8ynOIVlTsc'
});

const Courses = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="py-6">
            <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
                الكورسات التعليمية
            </h2>

            {/* Featured Video */}
            <div className="mb-12">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/e8ynOIVlTsc"
                        title="كيفية إنشاء إعلان احترافي"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-yellow-100">كيفية إنشاء إعلان احترافي</h3>
                    <p className="text-purple-200 mt-2">تعلم كيفية إنشاء إعلانات جذابة ومؤثرة لمنتجاتك وخدماتك</p>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEMO_VIDEOS.map((video, index) => (
                    <div key={index} className="bg-purple-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-yellow-100 mb-2">{video.title}</h3>
                            <p className="text-purple-200 text-sm line-clamp-2">{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
