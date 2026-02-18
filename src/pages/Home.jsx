import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShoppingCart, Star, X } from 'lucide-react';
import { categories, products, suppliers } from '../data/mockData';
import { notifications } from '../data/notifications';
import { useCartStore, useAuthStore } from '../store';
import BottomNav from '../components/BottomNav';

export default function Home() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const cartItemCount = useCartStore((state) => state.getItemCount());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);

    // Close notifications when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredProducts = products.slice(0, 4);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="container-app pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-lg relative z-20">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-blue-100 text-sm">Welcome back,</p>
                        <h1 className="text-white text-xl font-bold">{user?.name || 'Guest'}</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <Bell className="w-6 h-6 text-white" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-blue-600 rounded-full"></span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right border border-gray-100 z-50">
                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <h3 className="font-bold text-gray-800">Notifications</h3>
                                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                            {unreadCount} New
                                        </span>
                                    </div>
                                    <div className="max-h-[320px] overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.bgColor}`}>
                                                        <notification.icon className={`w-4 h-4 ${notification.color}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className={`text-sm font-semibold mb-0.5 ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 leading-snug mb-1.5 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <span className="text-[10px] text-gray-400 font-medium">
                                                            {notification.time}
                                                        </span>
                                                    </div>
                                                    {!notification.read && (
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 bg-gray-50 border-t border-gray-100">
                                        <button className="w-full py-2 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all text-center">
                                            Mark all as read
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/cart')}
                            className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6 text-white" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-white/90 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Bulacao, Talisay City, Cebu</span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search medicines, equipment..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="p-6">
                {/* Categories */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
                    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                                className={`category-card ${selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                style={{ backgroundColor: selectedCategory === category.name ? `${category.color}15` : '#f9fafb' }}
                            >
                                <div className="text-3xl mb-2">{category.icon}</div>
                                <p className="text-xs font-medium text-gray-700 text-center">{category.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Products */}
                {!searchQuery && !selectedCategory && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Featured Products</h2>
                            <button
                                onClick={() => navigate('/products')}
                                className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                            >
                                See All
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {featuredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="card-product cursor-pointer"
                                >
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">{product.supplier}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-600 font-bold text-lg">₱{product.price.toFixed(2)}</span>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                                {product.rating}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Products / Search Results */}
                {(searchQuery || selectedCategory) && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            {searchQuery ? `Search Results (${filteredProducts.length})` : selectedCategory}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="card-product cursor-pointer flex"
                                >
                                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-3">
                                        <h3 className="font-semibold text-sm text-gray-900 mb-1">{product.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{product.supplier}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-blue-600 font-bold">₱{product.price.toFixed(2)}</span>
                                            <span className={`badge-stock ${product.stock > 50 ? 'badge-stock-high' :
                                                product.stock > 20 ? 'badge-stock-medium' :
                                                    'badge-stock-low'
                                                }`}>
                                                {product.stock} in stock
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Nearby Suppliers */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Nearby Suppliers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {suppliers.map((supplier) => (
                            <div key={supplier.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                                        <div className="flex items-center mt-1 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {supplier.distance} away
                                        </div>
                                        <div className="flex items-center mt-1 text-sm text-gray-600">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                            {supplier.rating} • {supplier.deliveryTime}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
