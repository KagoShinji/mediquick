import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { useOrderStore } from '../store';
import { orderStatuses } from '../data/mockData';
import BottomNav from '../components/BottomNav';

export default function OrderTracking() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const orders = useOrderStore((state) => state.orders);

    const order = orders.find(o => o.id === orderId) || {
        id: orderId,
        status: 'Processing',
        date: new Date().toISOString(),
        total: 0,
        estimatedTime: '30-45 mins',
    };

    const statusIndex = orderStatuses.findIndex(s => s.status === order.status);

    const statusIcons = {
        'Processing': Package,
        'Out for Delivery': Truck,
        'Delivered': CheckCircle,
    };

    const StatusIcon = statusIcons[order.status];

    return (
        <div className="container-app pb-20">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center p-4 border-b">
                <button onClick={() => navigate('/home')} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-xl">Order Tracking</h1>
            </div>

            <div className="p-6">
                {/* Order ID and Status */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">Order ID</p>
                            <p className="font-bold text-lg">{order.id}</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-full">
                            <StatusIcon className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="text-sm">Estimated: {order.estimatedTime}</span>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="mb-8">
                    <h2 className="font-bold text-lg text-gray-900 mb-4">Order Status</h2>
                    <div className="space-y-4">
                        {orderStatuses.map((status, index) => {
                            const isCompleted = index <= statusIndex;
                            const isCurrent = index === statusIndex;

                            return (
                                <div key={status.id} className="flex items-start">
                                    <div className="flex flex-col items-center mr-4">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-400'
                                                }`}
                                        >
                                            <span className="text-2xl">{status.icon}</span>
                                        </div>
                                        {index < orderStatuses.length - 1 && (
                                            <div
                                                className={`w-0.5 h-12 ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3
                                            className={`font-semibold ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                                                }`}
                                        >
                                            {status.status}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">{status.description}</p>
                                        {isCurrent && (
                                            <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                Current Status
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Delivery Info */}
                {order.status === 'Out for Delivery' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Delivery Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <Truck className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Rider: Juan Santos</p>
                                    <p className="text-sm text-gray-600">Vehicle: Motorcycle (ABC-1234)</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Contact: +63 912 345 6789</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Currently at: 2.5 km away from your location
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg">
                            Call Rider
                        </button>
                    </div>
                )}

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Order Date</span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Payment Method</span>
                            <span>{order.paymentMethod?.name || 'Cash on Delivery'}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span className="text-gray-900">Total Amount</span>
                                <span className="text-blue-600">₱{order.total?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                    {order.status === 'Delivered' && (
                        <button className="btn-primary w-full">
                            Rate Your Experience
                        </button>
                    )}
                    <button className="btn-secondary w-full">
                        Need Help?
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
