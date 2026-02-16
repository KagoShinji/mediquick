import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Smartphone } from 'lucide-react';
import { paymentMethods } from '../data/mockData';
import BottomNav from '../components/BottomNav';

export default function PaymentMethods() {
    const navigate = useNavigate();

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-2xl text-gray-900">Payment Methods</h1>
            </div>

            <div className="p-6">
                {/* Payment Methods List */}
                <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-2xl">{method.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {method.name === 'Cash on Delivery' && 'Pay when you receive'}
                                            {method.name === 'GCash' && 'Mobile wallet payment'}
                                            {method.name === 'Credit/Debit Card' && 'Visa, Mastercard, etc.'}
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method.enabled ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                    }`}>
                                    {method.enabled && (
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Payment Method */}
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Add Payment Method</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Link your GCash account or add a credit/debit card for faster checkout
                    </p>
                    <button className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Payment Method
                    </button>
                </div>

                {/* Info */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">💳 Secure Payments</h3>
                    <p className="text-sm text-gray-600">
                        All payment information is encrypted and secure. We never store your card details.
                    </p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
