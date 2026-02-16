import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container-app flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
            <div className="text-center animate-slide-up">
                <div className="flex justify-center mb-6">
                    <div className="bg-white p-6 rounded-full shadow-2xl">
                        <Activity className="w-20 h-20 text-blue-600" strokeWidth={2.5} />
                    </div>
                </div>
                <h1 className="text-5xl font-bold text-white mb-3">MediQuick</h1>
                <p className="text-blue-100 text-lg font-medium">Medical Supplies Delivery</p>
                <div className="mt-8">
                    <div className="inline-block">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
