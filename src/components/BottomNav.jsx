import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, User, ShoppingBag } from 'lucide-react';

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: ShoppingBag, label: 'Products', path: '/products' },
        { icon: Package, label: 'Orders', path: '/orders' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
            <div className="max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto flex items-center justify-around py-2 px-4">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center py-2 px-4 md:px-6 lg:px-8 rounded-lg transition-all ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 md:w-7 md:h-7 mb-1 ${isActive ? 'fill-blue-100' : ''}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={`text-xs md:text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
