import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useOrderStore } from '../store';
import BottomNav from '../components/BottomNav';

export default function Orders() {
    const navigate = useNavigate();
    const orders = useOrderStore((state) => state.orders);

    if (orders.length === 0) {
        return (
            <div className="container-app pb-20">
                <div className="sticky top-0 bg-white z-10 p-4 border-b">
                    <h1 className="font-bold text-2xl text-gray-900">My Orders</h1>
                </div>

                <div className="flex flex-col items-center justify-center p-6 min-h-[60vh]">
                    <Package className="w-24 h-24 text-gray-300 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Start shopping for medical supplies and your orders will appear here
                    </p>
                    <button onClick={() => navigate('/home')} className="btn-primary">
                        Start Shopping
                    </button>
                </div>

                <BottomNav />
            </div>
        );
    }

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b">
                <h1 className="font-bold text-2xl text-gray-900">My Orders</h1>
                <p className="text-gray-600 text-sm mt-1">{orders.length} total orders</p>
            </div>

            <div className="p-4">
                {/* Order Tabs */}
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium whitespace-nowrap">
                        All Orders
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium whitespace-nowrap hover:bg-gray-200">
                        Processing
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium whitespace-nowrap hover:bg-gray-200">
                        Delivered
                    </button>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            onClick={() => navigate(`/order-tracking/${order.id}`)}
                            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-bold text-gray-900">{order.id}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="flex items-center justify-between mb-3">
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
                                <span className="font-bold text-blue-600 text-lg">
                                    ₱{order.total?.toFixed(2) || '0.00'}
                                </span>
                            </div>

                            {order.items && order.items.length > 0 && (
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-600">
                                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                            )}

                            {order.status === 'Out for Delivery' && (
                                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <p className="text-sm text-yellow-800 font-medium">
                                        📍 Estimated arrival: {order.estimatedTime}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
