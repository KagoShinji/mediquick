import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Bell, Globe, Shield } from 'lucide-react';
import { useAuthStore } from '../store';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../lib/LanguageContext';
import { languageOptions } from '../data/i18n';

export default function AccountSettings() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { language, setLanguage, t } = useLanguage();

    const settingsSections = [
        {
            title: 'Account Information',
            items: [
                { icon: User, label: 'Full Name', value: user?.name || 'Guest User', action: () => { } },
                { icon: Mail, label: 'Email Address', value: user?.email || 'guest@example.com', action: () => { } },
                { icon: Phone, label: 'Phone Number', value: user?.phone || '+63 912 345 6789', action: () => { } },
            ],
        },
        {
            title: 'Security',
            items: [
                { icon: Lock, label: 'Change Password', value: '••••••••', action: () => { } },
                { icon: Shield, label: 'Two-Factor Authentication', value: 'Disabled', action: () => { } },
            ],
        },
        {
            title: 'Preferences',
            items: [
                { icon: Bell, label: 'Notifications', value: 'Enabled', action: () => { } },
            ],
        },
    ];

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-2xl text-gray-900">Account Settings</h1>
            </div>

            <div className="p-6">
                {settingsSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                        <h2 className="font-bold text-lg text-gray-900 mb-3">{section.title}</h2>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {section.items.map((item, itemIndex) => (
                                <button
                                    key={itemIndex}
                                    onClick={item.action}
                                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                            <item.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900">{item.label}</p>
                                            <p className="text-sm text-gray-500">{item.value}</p>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Language Switcher */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <h2 className="font-bold text-lg text-gray-900">{t('languageTitle')}</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{t('languageSubtitle')}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {languageOptions.map((lang) => {
                            const isActive = language === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${isActive
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div className="text-left">
                                        <p className={`text-sm font-bold ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                                            {lang.nativeName}
                                        </p>
                                        <p className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                                            {lang.label}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Delete My Account
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
