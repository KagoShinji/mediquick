import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingBag, RotateCcw } from 'lucide-react';
import { symptomsList, medicineDatabase } from '../data/symptoms';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../lib/LanguageContext';

export default function SymptomChecker() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [selected, setSelected] = useState(new Set());
    const [results, setResults] = useState(null);

    const toggleSymptom = (id) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
        setResults(null); // reset results on change
    };

    const handleCheck = () => {
        if (selected.size === 0) return;
        const selectedArr = Array.from(selected);
        const scored = medicineDatabase
            .map((med) => {
                const matches = med.triggers.filter((t) => selectedArr.includes(t)).length;
                return { ...med, score: matches };
            })
            .filter((med) => med.score > 0)
            .sort((a, b) => b.score - a.score);
        setResults(scored);
    };

    const handleClear = () => {
        setSelected(new Set());
        setResults(null);
    };

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 rounded-b-3xl shadow-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white/90 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">{t('back')}</span>
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl">🩺</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold">{t('symptomCheckerTitle')}</h1>
                        <p className="text-emerald-100 text-sm mt-0.5">{t('symptomCheckerSubtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Symptom Selection */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900 text-base">{t('selectSymptoms')}</h2>
                        {selected.size > 0 && (
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                {t('clearAll')}
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {symptomsList.map((symptom) => {
                            const isSelected = selected.has(symptom.id);
                            return (
                                <button
                                    key={symptom.id}
                                    onClick={() => toggleSymptom(symptom.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${isSelected
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300'
                                        }`}
                                >
                                    <span>{symptom.icon}</span>
                                    {symptom.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Check Button */}
                <button
                    onClick={handleCheck}
                    disabled={selected.size === 0}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${selected.size > 0
                            ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 active:scale-95'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Search className="w-5 h-5" />
                    {t('checkMedicines')}
                    {selected.size > 0 && (
                        <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {selected.size} symptom{selected.size > 1 ? 's' : ''}
                        </span>
                    )}
                </button>

                {/* No Selections Message */}
                {results !== null && results.length === 0 && (
                    <div className="bg-gray-100 rounded-2xl p-6 text-center">
                        <p className="text-gray-500 text-sm">{t('noSymptoms')}</p>
                    </div>
                )}

                {/* Results */}
                {results && results.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                            <h2 className="font-bold text-gray-900 text-base">{t('suggestedMedicines')}</h2>
                            <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                                {results.length} found
                            </span>
                        </div>

                        <div className="space-y-4">
                            {results.map((med, idx) => (
                                <div
                                    key={med.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                    style={{ borderLeftWidth: '4px', borderLeftColor: med.color }}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                                                        style={{ backgroundColor: med.bg, color: med.color }}
                                                    >
                                                        {med.category}
                                                    </span>
                                                    {idx === 0 && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">
                                                            ⭐ Best Match
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-sm">{med.name}</h3>
                                                <p className="text-xs text-gray-400 mt-0.5">{med.brand}</p>
                                            </div>
                                            <button
                                                onClick={() => navigate('/products')}
                                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl flex-shrink-0 transition-all active:scale-95"
                                                style={{ backgroundColor: med.bg, color: med.color }}
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                                {t('findInStore')}
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs font-semibold text-gray-600 mb-1">💊 {med.use}</p>
                                                <p className="text-xs text-gray-500 leading-relaxed">Dosage: {med.dosage}</p>
                                            </div>
                                            <div
                                                className="rounded-xl p-3 border"
                                                style={{ backgroundColor: med.bg, borderColor: `${med.color}30` }}
                                            >
                                                <p className="text-xs font-semibold mb-1" style={{ color: med.color }}>
                                                    👨‍⚕️ {t('pharmacistNote')}
                                                </p>
                                                <p className="text-xs text-gray-600 leading-relaxed">{med.pharmacistNote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                {results && results.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <div className="flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <p className="text-xs text-amber-800 leading-relaxed">{t('disclaimer')}</p>
                        </div>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
