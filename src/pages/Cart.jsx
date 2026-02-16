import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store';

export default function Cart() {
    const navigate = useNavigate();
    const { items, updateQuantity, removeFromCart, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="container-app flex flex-col items-center justify-center p-6 min-h-screen">
                <div className="text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some medical supplies to get started</p>
                    <button onClick={() => navigate('/home')} className="btn-primary">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-app pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center p-4 border-b">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-xl">Shopping Cart</h1>
                <span className="ml-auto text-gray-600">({items.length} items)</span>
            </div>

            <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <div className="flex">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 ml-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{item.supplier}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-600 font-bold text-lg">
                                            ₱{(item.price * item.quantity).toFixed(2)}
                                        </span>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-2 p-2 hover:bg-red-50 rounded-lg text-red-600"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₱{getTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>₱50.00</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-blue-600">₱{(getTotal() + 50).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
                <div className="max-w-md mx-auto p-4">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="btn-primary w-full flex items-center justify-center"
                    >
                        Proceed to Checkout
                        <span className="ml-2 font-bold">₱{(getTotal() + 50).toFixed(2)}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
