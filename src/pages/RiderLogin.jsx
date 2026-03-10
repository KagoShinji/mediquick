import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bike, ShieldCheck, Eye, EyeOff, UserSquare2, Lock } from 'lucide-react';
import { useAuthStore } from '../store';

export default function RiderLogin() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        login({
            id: `RID-${Date.now()}`,
            name: 'Assigned Rider',
            email: 'rider@mediquick.local',
            role: 'rider',
            employeeId: formData.employeeId,
        });

        navigate('/rider/delivery');
    };

    return (
        <div className="container-app min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white p-6 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-600 shadow-lg mb-4">
                        <Bike className="w-10 h-10 text-white" strokeWidth={2.2} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Rider Portal</h1>
                    <p className="text-gray-600 mt-2">Sign in to manage your daily delivery route.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-5 text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        Access for verified delivery riders only.
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                            <div className="relative">
                                <UserSquare2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    placeholder="e.g. RID-1042"
                                    className="input-field pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
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

                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors">
                            Start Delivery Shift
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-5">
                        Not a rider?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                            Go to customer login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
