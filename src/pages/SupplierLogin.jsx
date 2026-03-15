import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ShieldCheck, Eye, EyeOff, Lock, UserSquare2 } from 'lucide-react';
import { useAuthStore } from '../store';
import { supplierProfiles } from '../data/supplierMockData';

export default function SupplierLogin() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        supplierCode: supplierProfiles[0]?.id || '',
        supplierName: supplierProfiles[0]?.companyName || '',
        password: '',
    });

    const supplierOptions = useMemo(() => supplierProfiles, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedSupplier = supplierProfiles.find(
            (profile) => profile.id === formData.supplierCode && profile.companyName === formData.supplierName
        ) || supplierProfiles[0];

        login({
            id: selectedSupplier?.id || `SUP-${Date.now()}`,
            name: selectedSupplier?.managerName || `${formData.supplierName} Manager`,
            email: selectedSupplier?.email || `${formData.supplierCode || 'supplier'}@mediquick.local`,
            role: 'supplier',
            supplierName: selectedSupplier?.companyName || formData.supplierName,
            supplierCode: selectedSupplier?.id || formData.supplierCode,
            supplierPhone: selectedSupplier?.phone,
            warehouseAddress: selectedSupplier?.warehouseAddress,
            serviceAreas: selectedSupplier?.serviceAreas || [],
        });

        navigate('/supplier/portal');
    };

    return (
        <div className="container-app min-h-screen bg-gradient-to-b from-amber-50 via-white to-white p-6 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-600 shadow-lg mb-4">
                        <Building2 className="w-10 h-10 text-white" strokeWidth={2.2} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Supplier Portal</h1>
                    <p className="text-gray-600 mt-2">Sign in to manage inventory, orders, and rider handoffs.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-6">
                    <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mb-5 text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Access for verified supplier partners only.
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Code</label>
                            <div className="relative">
                                <UserSquare2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.supplierCode}
                                    onChange={(e) => setFormData({ ...formData, supplierCode: e.target.value })}
                                    placeholder="e.g. SUP-3901"
                                    className="input-field pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
                            <select
                                className="input-field"
                                value={formData.supplierName}
                                onChange={(e) => {
                                    const selectedProfile = supplierProfiles.find(
                                        (profile) => profile.companyName === e.target.value
                                    );

                                    setFormData({
                                        ...formData,
                                        supplierName: e.target.value,
                                        supplierCode: selectedProfile?.id || formData.supplierCode,
                                    });
                                }}
                                required
                            >
                                {supplierOptions.map((supplier) => (
                                    <option key={supplier.id} value={supplier.companyName}>
                                        {supplier.companyName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your portal password"
                                    className="input-field pl-11 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors">
                            Open Supplier Workspace
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-5">
                        Not a supplier?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                            Go to customer login
                        </Link>
                    </p>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Delivery rider?{' '}
                        <Link to="/rider/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                            Open rider portal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
