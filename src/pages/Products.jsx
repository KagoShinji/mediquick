import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { products, categories } from '../data/mockData';
import BottomNav from '../components/BottomNav';

export default function Products() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort products
    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b">
                <h1 className="font-bold text-2xl text-gray-900 mb-4">All Products</h1>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedCategory === 'All'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedCategory === category.name
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                {/* Sort Options */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600">
                        {filteredProducts.length} products found
                    </p>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">{filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="card-product cursor-pointer"
                    >
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                            <div className="text-6xl">
                                {product.category === 'Medicine' && '💊'}
                                {product.category === 'PPE' && '🦺'}
                                {product.category === 'Equipment' && '🩺'}
                                {product.category === 'Emergency Kits' && '🚑'}
                            </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                                {product.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">{product.supplier}</p>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-blue-600 font-bold text-lg">₱{product.price.toFixed(2)}</span>
                                <div className="flex items-center text-xs text-gray-600">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                    {product.rating}
                                </div>
                            </div>
                            <span
                                className={`badge-stock text-xs ${product.stock > 50
                                    ? 'badge-stock-high'
                                    : product.stock > 20
                                        ? 'badge-stock-medium'
                                        : 'badge-stock-low'
                                    }`}
                            >
                                {product.stock} in stock
                            </span>
                        </div>
                    </div>
                ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found</p>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
