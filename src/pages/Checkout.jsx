import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { useCartStore, useOrderStore } from '../store';
import { savedAddresses, paymentMethods } from '../data/mockData';

export default function Checkout() {
    const navigate = useNavigate();
    const { items, getTotal, clearCart } = useCartStore();
    const createOrder = useOrderStore((state) => state.createOrder);

    const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePlaceOrder = () => {
        const order = createOrder({
            items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
            total: getTotal() + 50,
            address: selectedAddress,
            paymentMethod: selectedPayment,
            estimatedTime: '30-45 mins',
        });

        clearCart();
        setShowSuccess(true);

        setTimeout(() => {
            navigate(`/order-tracking/${order.id}`);
        }, 2000);
    };

    const paymentIcons = {
        'Cash on Delivery': Banknote,
        'GCash': Wallet,
        'Credit/Debit Card': CreditCard,
    };

    return (
        <div className="container-app pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center p-4 border-b">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-xl">Checkout</h1>
            </div>

            <div className="p-6">
                {/* Delivery Address */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-3">Delivery Address</h2>
                    <div className="space-y-3">
                        {savedAddresses.map((address) => (
                            <div
                                key={address.id}
                                onClick={() => setSelectedAddress(address)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress.id === address.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                                            <span className="font-semibold text-gray-900">{address.label}</span>
                                            {address.isDefault && (
                                                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 ml-6">{address.address}</p>
                                    </div>
                                    {selectedAddress.id === address.id && (
                                        <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                    )}
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-blue-600 font-semibold hover:border-blue-600 hover:bg-blue-50 transition-all">
                            + Add New Address
                        </button>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-3">Payment Method</h2>
                    <div className="space-y-3">
                        {paymentMethods.map((method) => {
                            const Icon = paymentIcons[method.name];
                            return (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPayment.id === method.id
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm">
                                                <Icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <span className="font-semibold text-gray-900">{method.name}</span>
                                        </div>
                                        {selectedPayment.id === method.id && (
                                            <CheckCircle className="w-6 h-6 text-blue-600" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    {item.name} x{item.quantity}
                                </span>
                                <span className="text-gray-900 font-medium">
                                    ₱{(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-3 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₱{getTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Fee</span>
                            <span>₱50.00</span>
                        </div>
                        <div className="border-t pt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-gray-900">Total</span>
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
                        onClick={handlePlaceOrder}
                        className="btn-primary w-full"
                    >
                        Place Order • ₱{(getTotal() + 50).toFixed(2)}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-slide-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
                        <p className="text-gray-600 mb-4">
                            Your order has been successfully placed. Redirecting to order tracking...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
