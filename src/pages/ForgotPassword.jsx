import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="container-app flex items-center justify-center p-6">
                <div className="text-center animate-slide-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                    <p className="text-gray-600 mb-4">
                        We've sent password reset instructions to
                    </p>
                    <p className="font-semibold text-gray-900 mb-6">{email}</p>
                    <p className="text-sm text-gray-500">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-app p-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mb-6">
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                <p className="text-gray-600">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            className="input-field pl-11"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Send Reset Link
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Remember your password?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
