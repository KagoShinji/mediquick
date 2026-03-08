import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, CheckCircle, XCircle, Clock, AlertCircle, ImageIcon } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../lib/LanguageContext';

const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    REVIEWING: 'reviewing',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
};

const steps = [
    { icon: '📷', key: 'step1' },
    { icon: '🔍', key: 'step2' },
    { icon: '✅', key: 'step3' },
];

export default function PrescriptionUpload() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target.result);
        reader.readAsDataURL(file);
        setStatus(STATUS.IDLE);
    };

    const handleSubmit = () => {
        if (!preview) return;
        setStatus(STATUS.PENDING);
        // Simulate review process
        setTimeout(() => setStatus(STATUS.REVIEWING), 2000);
        setTimeout(() => setStatus(STATUS.VERIFIED), 5000);
    };

    const handleReject = () => {
        setStatus(STATUS.REJECTED);
    };

    const handleReset = () => {
        setPreview(null);
        setFileName('');
        setStatus(STATUS.IDLE);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const statusConfig = {
        [STATUS.PENDING]: {
            icon: <Clock className="w-5 h-5 text-yellow-600" />,
            label: t('statusPending'),
            color: 'bg-yellow-50 border-yellow-200',
            textColor: 'text-yellow-800',
            badge: 'bg-yellow-100 text-yellow-700',
        },
        [STATUS.REVIEWING]: {
            icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
            label: t('statusReviewing'),
            color: 'bg-blue-50 border-blue-200',
            textColor: 'text-blue-800',
            badge: 'bg-blue-100 text-blue-700',
        },
        [STATUS.VERIFIED]: {
            icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
            label: t('statusVerified'),
            color: 'bg-emerald-50 border-emerald-200',
            textColor: 'text-emerald-800',
            badge: 'bg-emerald-100 text-emerald-700',
        },
        [STATUS.REJECTED]: {
            icon: <XCircle className="w-5 h-5 text-red-600" />,
            label: t('statusRejected'),
            color: 'bg-red-50 border-red-200',
            textColor: 'text-red-800',
            badge: 'bg-red-100 text-red-700',
        },
    };

    const currentStatus = statusConfig[status];

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-b-3xl shadow-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white/90 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">{t('back')}</span>
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl">📋</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold">{t('prescriptionTitle')}</h1>
                        <p className="text-blue-100 text-sm mt-0.5">{t('prescriptionSubtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-5">
                {/* How It Works */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="font-bold text-gray-900 mb-4">{t('howItWorks')}</h2>
                    <div className="flex items-start gap-0">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center text-center relative">
                                {idx < steps.length - 1 && (
                                    <div className="absolute top-5 left-1/2 w-full h-0.5 bg-blue-100 z-0" />
                                )}
                                <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-lg z-10 mb-2">
                                    {step.icon}
                                </div>
                                <p className="text-xs text-gray-600 leading-tight px-1">{t(step.key)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upload Area */}
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        className="hidden"
                        id="rx-file-input"
                    />

                    {!preview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white border-2 border-dashed border-blue-300 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <Upload className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-800">{t('uploadPhoto')}</p>
                                <p className="text-sm text-gray-400 mt-1">{t('tapToUpload')}</p>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <span className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
                                    <Camera className="w-3.5 h-3.5" /> {t('takePhoto')}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
                                    <ImageIcon className="w-3.5 h-3.5" /> {t('chooseGallery')}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="relative">
                                <img
                                    src={preview}
                                    alt="Prescription preview"
                                    className="w-full max-h-64 object-contain bg-gray-50"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-700 font-medium truncate">{fileName}</p>
                                <p className="text-xs text-gray-400 mt-0.5">Prescription photo ready to submit</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Badge */}
                {currentStatus && (
                    <div className={`rounded-2xl border p-4 ${currentStatus.color}`}>
                        <div className="flex items-center gap-3">
                            {currentStatus.icon}
                            <div className="flex-1">
                                <p className={`font-semibold text-sm ${currentStatus.textColor}`}>
                                    {currentStatus.label}
                                </p>
                                {status === STATUS.REVIEWING && (
                                    <p className="text-xs text-gray-500 mt-1">A partner pharmacist is reviewing your prescription…</p>
                                )}
                                {status === STATUS.VERIFIED && (
                                    <p className="text-xs text-emerald-700 mt-1">Your prescription is valid. You may now proceed to order.</p>
                                )}
                                {status === STATUS.REJECTED && (
                                    <p className="text-xs text-red-700 mt-1">Please retake a clearer photo or consult your physician.</p>
                                )}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${currentStatus.badge}`}>
                                {status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                {preview && status === STATUS.IDLE && (
                    <button
                        onClick={handleSubmit}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        <Upload className="w-5 h-5" />
                        {t('submitPrescription')}
                    </button>
                )}

                {status === STATUS.VERIFIED && (
                    <button
                        onClick={() => navigate('/products')}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Browse Medicines
                    </button>
                )}

                {/* Demo buttons for testing */}
                {status === STATUS.REVIEWING && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatus(STATUS.VERIFIED)}
                            className="flex-1 bg-emerald-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-emerald-700"
                        >
                            Simulate Verified
                        </button>
                        <button
                            onClick={handleReject}
                            className="flex-1 bg-red-500 text-white text-sm font-semibold py-2 rounded-xl hover:bg-red-600"
                        >
                            Simulate Rejected
                        </button>
                    </div>
                )}

                {/* Partner Pharmacist Info */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">👨‍⚕️</span>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">Partner Pharmacist Verification</p>
                            <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                                Your prescription is reviewed by a licensed partner pharmacist before your order is fulfilled, ensuring your safety and compliance with Philippine pharmacy regulations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
