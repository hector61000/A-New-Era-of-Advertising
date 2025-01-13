import React, { useState, useEffect } from 'react';

const Courses = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=YOUR_PLAYLIST_ID&key=YOUR_API_KEY`
                );
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error.message);
                }

                setVideos(data.items);
                setLoading(false);
            } catch (err) {
                setError('فشل في تحميل الكورسات');
                setLoading(false);
                console.error('Error fetching videos:', err);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-400 text-center p-4 bg-purple-800/50 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="py-6">
            <h2 className="text-2xl font-bold text-center text-yellow-100 mb-8">
                الكورسات التعليمية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="bg-purple-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                                title={video.snippet.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-yellow-100 mb-2">{video.snippet.title}</h3>
                            <p className="text-purple-200 text-sm line-clamp-2">{video.snippet.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
