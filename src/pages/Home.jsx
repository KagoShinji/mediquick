import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Bell, ShoppingCart, Star } from 'lucide-react';
import { categories, products, suppliers } from '../data/mockData';
import { useCartStore, useAuthStore } from '../store';
import BottomNav from '../components/BottomNav';

export default function Home() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const cartItemCount = useCartStore((state) => state.getItemCount());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="container-app pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-blue-100 text-sm">Welcome back,</p>
                        <h1 className="text-white text-xl font-bold">{user?.name || 'Guest'}</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="relative p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                            <Bell className="w-6 h-6 text-white" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
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
