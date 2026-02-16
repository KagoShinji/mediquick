import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Package, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore, useOrderStore } from '../store';
import BottomNav from '../components/BottomNav';

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const orders = useOrderStore((state) => state.orders);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        {
            icon: Package,
            label: 'Order History',
            count: orders.length,
            action: () => navigate('/orders'),
        },
        {
            icon: MapPin,
            label: 'Saved Addresses',
            count: 2,
            action: () => navigate('/saved-addresses'),
        },
        {
            icon: CreditCard,
            label: 'Payment Methods',
            action: () => navigate('/payment-methods'),
        },
        {
            icon: Settings,
            label: 'Account Settings',
            action: () => navigate('/account-settings'),
        },
        {
            icon: HelpCircle,
            label: 'Help & Support',
            action: () => navigate('/help-support'),
        },
    ];

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-lg mb-6">
                <div className="flex items-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4">
                        <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1 text-white">
                        <h1 className="text-2xl font-bold mb-1">{user?.name || 'Guest User'}</h1>
                        <p className="text-blue-100 text-sm">{user?.email || 'guest@example.com'}</p>
                        <p className="text-blue-100 text-sm">{user?.userType || 'Individual'}</p>
                    </div>
                </div>
            </div>

            <div className="px-6">
                {/* Stats */}
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                        <p className="text-xs text-gray-600 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-green-600">
                            {orders.filter(o => o.status === 'Delivered').length}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Completed</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold text-yellow-600">
                            {orders.filter(o => o.status !== 'Delivered').length}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Ongoing</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                    <item.icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-900">{item.label}</span>
                            </div>
                            <div className="flex items-center">
                                {item.count !== undefined && (
                                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mr-2">
                                        {item.count}
                                    </span>
                                )}
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Recent Orders */}
                {orders.length > 0 && (
                    <div className="mb-6">
                        <h2 className="font-bold text-lg text-gray-900 mb-3">Recent Orders</h2>
                        <div className="space-y-3">
                            {orders.slice(0, 3).map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => navigate(`/order-tracking/${order.id}`)}
                                    className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-900">{order.id}</span>
                                        <span
                                            className={`status-badge ${order.status === 'Processing'
                                                ? 'status-processing'
                                                : order.status === 'Out for Delivery'
                                                    ? 'status-delivery'
                                                    : 'status-delivered'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            {new Date(order.date).toLocaleDateString()}
                                        </span>
                                        <span className="font-bold text-blue-600">
                                            ₱{order.total?.toFixed(2) || '0.00'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center bg-red-50 text-red-600 font-semibold py-4 rounded-xl hover:bg-red-100 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </button>

                <div className="text-center text-sm text-gray-500 mt-6 mb-4">
                    <p>MediQuick v1.0.0</p>
                    <p className="mt-1">© 2024 All rights reserved</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
