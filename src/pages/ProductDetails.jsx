import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, MapPin, Clock } from 'lucide-react';
import { products } from '../data/mockData';
import { useCartStore } from '../store';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);
    const [quantity, setQuantity] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="container-app p-6">Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="container-app pb-24">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-lg">Product Details</h1>
                <button onClick={() => navigate('/cart')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ShoppingCart className="w-6 h-6" />
                </button>
            </div>

            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-9xl">
                    {product.category === 'Medicine' && '💊'}
                    {product.category === 'PPE' && '🦺'}
                    {product.category === 'Equipment' && '🩺'}
                    {product.category === 'Emergency Kits' && '🚑'}
                </div>
            </div>

            <div className="p-6">
                {/* Product Info */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <h1 className="text-2xl font-bold text-gray-900 flex-1">{product.name}</h1>
                        <span className={`badge-stock ${product.stock > 50 ? 'badge-stock-high' :
                                product.stock > 20 ? 'badge-stock-medium' :
                                    'badge-stock-low'
                            }`}>
                            {product.stock} in stock
                        </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{product.supplier}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold text-gray-900">{product.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({product.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-blue-600 mb-4">
                        ₱{product.price.toFixed(2)}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-2">Description</h2>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Dosage/Specifications */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-2">
                        {product.category === 'Medicine' ? 'Dosage & Usage' : 'Specifications'}
                    </h2>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-700">{product.dosage}</p>
                    </div>
                </div>

                {/* Reviews Preview */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-3">Customer Reviews</h2>
                    <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="ml-2 text-sm font-semibold text-gray-900">Maria Santos</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Great product! Fast delivery and authentic. Highly recommended.
                            </p>
                            <p className="text-xs text-gray-400 mt-2">2 days ago</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <Star className="w-4 h-4 text-gray-300" />
                                </div>
                                <span className="ml-2 text-sm font-semibold text-gray-900">John Reyes</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                Good quality. Price is reasonable. Will order again.
                            </p>
                            <p className="text-xs text-gray-400 mt-2">1 week ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
                <div className="max-w-md mx-auto p-4">
                    <div className="flex items-center space-x-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-3 hover:bg-gray-100"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <span className="px-4 font-semibold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                className="p-3 hover:bg-gray-100"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 btn-primary flex items-center justify-center"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
                    ✓ Added to cart successfully!
                </div>
            )}
        </div>
    );
}
