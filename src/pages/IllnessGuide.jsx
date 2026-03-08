import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, ShoppingBag, Stethoscope, CheckCircle } from 'lucide-react';
import { illnesses } from '../data/mockData';
import BottomNav from '../components/BottomNav';

export default function IllnessGuide() {
    const { id } = useParams();
    const navigate = useNavigate();
    const illness = illnesses.find((ill) => ill.id === Number(id));

    if (!illness) {
        return (
            <div className="container-app pb-20 flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">Illness not found.</p>
                <button onClick={() => navigate('/home')} className="btn-primary mt-4">Go Home</button>
            </div>
        );
    }

    return (
        <div className="container-app pb-20">
            {/* Header */}
            <div
                className="p-6 rounded-b-3xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${illness.color}cc, ${illness.color})` }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white/90 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Back</span>
                </button>
                <div className="flex items-center space-x-4">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shadow-lg"
                        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                    >
                        {illness.icon}
                    </div>
                    <div>
                        <h1 className="text-white text-2xl font-bold">{illness.name}</h1>
                        <p className="text-white/75 text-sm mt-1">OTC Medicine Guide</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Symptoms */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: illness.bg }}>
                            <Stethoscope className="w-5 h-5" style={{ color: illness.color }} />
                        </div>
                        <h2 className="font-bold text-gray-900 text-base">Common Symptoms</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {illness.symptoms.map((symptom, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                                style={{ backgroundColor: illness.bg, color: illness.color }}
                            >
                                <CheckCircle className="w-3.5 h-3.5" />
                                {symptom}
                            </span>
                        ))}
                    </div>
                </div>

                {/* OTC Medicines */}
                <div>
                    <h2 className="font-bold text-gray-900 text-base mb-3">Suggested OTC Medicines</h2>
                    <div className="space-y-3">
                        {illness.otcMedicines.map((med, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                style={{ backgroundColor: illness.color }}
                                            >
                                                {idx + 1}
                                            </span>
                                            <h3 className="font-semibold text-gray-900 text-sm">{med.name}</h3>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed ml-8">{med.note}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all"
                                        style={{ backgroundColor: illness.bg, color: illness.color }}
                                    >
                                        <ShoppingBag className="w-3.5 h-3.5" />
                                        Find
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pharmacist Tip */}
                <div
                    className="rounded-2xl p-4 border"
                    style={{ backgroundColor: illness.bg, borderColor: `${illness.color}33` }}
                >
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: illness.color }} />
                        <div>
                            <p className="font-semibold text-gray-900 text-sm mb-1">💊 Pharmacist Tip</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{illness.pharmacistTip}</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                        ⚠️ This guide is for reference only. Always consult a licensed pharmacist or physician before taking any medication.
                    </p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
