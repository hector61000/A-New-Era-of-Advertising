function App() {
    const [adData, setAdData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    async function handleSubmit(formData) {
        try {
            setLoading(true);
            setError(null);
            const generatedAd = await generateAd(formData);
            setAdData(generatedAd);
        } catch (error) {
            reportError(error);
            setError('حدث خطأ أثناء إنشاء الإعلان');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen" data-name="app">
            <Header />
            
            <main className="container mx-auto px-4" data-name="main-content">
                <AdForm onSubmit={handleSubmit} />
                
                {loading && (
                    <div className="text-center my-4" data-name="loading">
                        جاري إنشاء الإعلان...
                    </div>
                )}
                
                {error && (
                    <div className="text-red-500 text-center my-4" data-name="error-message">
                        {error}
                    </div>
                )}
                
                {adData && <AdOutput adData={adData} />}
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
