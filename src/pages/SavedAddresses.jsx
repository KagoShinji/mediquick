import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Home as HomeIcon, Building2 } from 'lucide-react';
import { savedAddresses } from '../data/mockData';
import BottomNav from '../components/BottomNav';

export default function SavedAddresses() {
    const navigate = useNavigate();

    return (
        <div className="container-app pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-3">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="font-bold text-2xl text-gray-900">Saved Addresses</h1>
            </div>

            <div className="p-6">
                {/* Address List */}
                <div className="space-y-4 mb-6">
                    {savedAddresses.map((address) => (
                        <div
                            key={address.id}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                        {address.label === 'Home' ? (
                                            <HomeIcon className="w-5 h-5 text-blue-600" />
                                        ) : (
                                            <Building2 className="w-5 h-5 text-blue-600" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <h3 className="font-semibold text-gray-900">{address.label}</h3>
                                            {address.isDefault && (
                                                <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start text-gray-600 text-sm">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                <p>{address.address}</p>
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <button className="flex-1 bg-blue-50 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors">
                                    Edit
                                </button>
                                {!address.isDefault && (
                                    <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Address Button */}
                <button className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Address
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
