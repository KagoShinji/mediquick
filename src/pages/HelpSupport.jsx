import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, AlertCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function HelpSupport() {
    const navigate = useNavigate();

    const helpOptions = [
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Chat with our support team',
            action: () => alert('Live chat feature coming soon!'),
        },
        {
            icon: Phone,
            title: 'Call Us',
            description: '+63 912 345 6789',
            action: () => window.location.href = 'tel:+639123456789',
        },
        {
            icon: Mail,
            title: 'Email Support',
            description: 'support@mediquick.com',
            action: () => window.location.href = 'mailto:support@mediquick.com',
        },
        {
            icon: FileText,
            title: 'FAQs',
            description: 'Find answers to common questions',
            action: () => { },
        },
    ];

    const faqs = [
        {
            question: 'How do I track my order?',
            answer: 'Go to Orders tab and click on your order to see real-time tracking.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept Cash on Delivery, GCash, and Credit/Debit Cards.',
        },
        {
            question: 'How long does delivery take?',
            answer: 'Delivery typically takes 30-90 minutes depending on your location and supplier.',
        },
        {
            question: 'Can I cancel my order?',
            answer: 'Yes, you can cancel orders that are still in "Processing" status.',
        },
    ];

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-2xl text-gray-900">Help & Support</h1>
            </div>

            <div className="p-6">
                {/* Contact Options */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-3">Contact Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {helpOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={option.action}
                                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                        <option.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                                        <p className="text-sm text-gray-600">{option.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-3">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-sm text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Emergency Notice */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-red-900 mb-1">Medical Emergency?</h3>
                            <p className="text-sm text-red-700 mb-2">
                                For medical emergencies, please call 911 or go to the nearest hospital immediately.
                            </p>
                            <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                                Call Emergency Services
                            </button>
                        </div>
                    </div>
                </div>

                {/* App Info */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>MediQuick v1.0.0</p>
                    <p className="mt-1">Operating Hours: 24/7</p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
