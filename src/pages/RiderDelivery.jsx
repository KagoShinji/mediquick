import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Clock3, MapPin, PackageCheck, Phone, LogOut, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuthStore } from '../store';

const hubLocation = {
    name: 'MediCare Dispatch Hub',
    position: [10.2927, 123.9010],
};

function RecenterMap({ center }) {
    const map = useMap();

    useEffect(() => {
        map.setView(center, 12, { animate: true });
    }, [center, map]);

    return null;
}

const initialDeliveries = [
    {
        id: 'DLV-1001',
        customer: 'Maria Santos',
        address: '42 Don Sergio St., Cebu City',
        eta: '10 mins',
        items: 3,
        status: 'Assigned',
        area: 'Cebu City Proper',
        position: [10.3157, 123.8854],
    },
    {
        id: 'DLV-1002',
        customer: 'Ramon Villareal',
        address: '88 South Road, Talisay City',
        eta: '22 mins',
        items: 2,
        status: 'Assigned',
        area: 'Talisay South Road',
        position: [10.2546, 123.8495],
    },
    {
        id: 'DLV-1003',
        customer: 'Liza Fernandez',
        address: 'Unit 5B Marigold Condo, Cebu City',
        eta: '35 mins',
        items: 5,
        status: 'Picked Up',
        area: 'North Cebu Uptown',
        position: [10.3370, 123.9065],
    },
];

export default function RiderDelivery() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(initialDeliveries[0].id);

    const stats = useMemo(() => {
        const assigned = deliveries.filter((d) => d.status === 'Assigned').length;
        const pickedUp = deliveries.filter((d) => d.status === 'Picked Up').length;
        const delivered = deliveries.filter((d) => d.status === 'Delivered').length;
        return { assigned, pickedUp, delivered };
    }, [deliveries]);

    const selectedDelivery = useMemo(
        () => deliveries.find((delivery) => delivery.id === selectedDeliveryId) || deliveries[0],
        [deliveries, selectedDeliveryId]
    );

    const routePath = useMemo(() => {
        if (!selectedDelivery) {
            return [hubLocation.position];
        }

        return [hubLocation.position, selectedDelivery.position];
    }, [selectedDelivery]);

    const markPickedUp = (id) => {
        setDeliveries((prev) =>
            prev.map((delivery) => (delivery.id === id ? { ...delivery, status: 'Picked Up' } : delivery))
        );
    };

    const markDelivered = (id) => {
        setDeliveries((prev) =>
            prev.map((delivery) => (delivery.id === id ? { ...delivery, status: 'Delivered' } : delivery))
        );
    };

    const handleLogout = () => {
        logout();
        navigate('/rider/login');
    };

    return (
        <div className="container-app min-h-screen bg-slate-50">
            <header className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 rounded-b-3xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-emerald-100 text-sm">On shift</p>
                        <h1 className="text-white text-2xl font-bold">{user?.name || 'Rider'}</h1>
                        <p className="text-emerald-100 text-sm mt-1">ID: {user?.employeeId || 'RID-0000'}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Bike className="w-7 h-7 text-white" />
                    </div>
                </div>
            </header>

            <main className="p-6 pb-8">
                <section className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <p className="text-xs text-gray-500">Assigned</p>
                        <p className="text-xl font-bold text-slate-900">{stats.assigned}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <p className="text-xs text-gray-500">Picked Up</p>
                        <p className="text-xl font-bold text-amber-600">{stats.pickedUp}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <p className="text-xs text-gray-500">Delivered</p>
                        <p className="text-xl font-bold text-emerald-600">{stats.delivered}</p>
                    </div>
                </section>

                <section className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold text-slate-900">Delivery Map</h2>
                        <span className="text-xs text-gray-500">OpenStreetMap live tiles</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 overflow-hidden">
                        <div className="h-64 rounded-2xl overflow-hidden border border-emerald-100">
                            <MapContainer
                                center={selectedDelivery?.position || hubLocation.position}
                                zoom={12}
                                scrollWheelZoom={true}
                                className="h-full w-full"
                            >
                                <RecenterMap center={selectedDelivery?.position || hubLocation.position} />
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <CircleMarker
                                    center={hubLocation.position}
                                    radius={10}
                                    pathOptions={{ color: '#0f172a', fillColor: '#0f172a', fillOpacity: 1 }}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <strong>{hubLocation.name}</strong>
                                        </div>
                                    </Popup>
                                </CircleMarker>

                                {deliveries.map((delivery) => {
                                    const isSelected = delivery.id === selectedDelivery?.id;

                                    return (
                                        <CircleMarker
                                            key={delivery.id}
                                            center={delivery.position}
                                            radius={isSelected ? 11 : 8}
                                            eventHandlers={{
                                                click: () => setSelectedDeliveryId(delivery.id),
                                            }}
                                            pathOptions={{
                                                color: isSelected ? '#059669' : '#2563eb',
                                                fillColor: isSelected ? '#10b981' : '#3b82f6',
                                                fillOpacity: 1,
                                            }}
                                        >
                                            <Popup>
                                                <div className="text-sm">
                                                    <strong>{delivery.customer}</strong>
                                                    <div>{delivery.address}</div>
                                                    <div>ETA {delivery.eta}</div>
                                                </div>
                                            </Popup>
                                        </CircleMarker>
                                    );
                                })}

                                <Polyline positions={routePath} pathOptions={{ color: '#059669', weight: 4, opacity: 0.75 }} />
                            </MapContainer>
                        </div>

                        {selectedDelivery && (
                            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Selected stop</p>
                                        <h3 className="text-base font-bold text-slate-900">{selectedDelivery.customer}</h3>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                        {selectedDelivery.area}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2">{selectedDelivery.address}</p>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-slate-600">ETA {selectedDelivery.eta}</span>
                                    <span className="font-semibold text-slate-900">{selectedDelivery.items} item(s)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-3">Today&apos;s Deliveries</h2>
                    <div className="space-y-3">
                        {deliveries.map((delivery) => (
                            <div key={delivery.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-slate-900">{delivery.customer}</p>
                                        <p className="text-xs text-gray-500 mt-1">{delivery.id}</p>
                                    </div>
                                    <span
                                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                            delivery.status === 'Delivered'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : delivery.status === 'Picked Up'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-blue-100 text-blue-700'
                                        }`}
                                    >
                                        {delivery.status}
                                    </span>
                                </div>

                                <div className="mt-3 space-y-2 text-sm text-slate-700">
                                    <p className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-500" />
                                        <span>{delivery.address}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Clock3 className="w-4 h-4 text-slate-500" />
                                        ETA {delivery.eta}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <PackageCheck className="w-4 h-4 text-slate-500" />
                                        {delivery.items} item(s)
                                    </p>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDeliveryId(delivery.id)}
                                        className="flex-1 border border-emerald-300 text-emerald-700 py-2 rounded-lg font-medium text-sm"
                                    >
                                        View in Map
                                    </button>

                                    <button className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-1">
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </button>

                                    {delivery.status === 'Assigned' && (
                                        <button
                                            onClick={() => markPickedUp(delivery.id)}
                                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium text-sm"
                                        >
                                            Mark Picked Up
                                        </button>
                                    )}

                                    {delivery.status === 'Picked Up' && (
                                        <button
                                            onClick={() => markDelivered(delivery.id)}
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-1"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Mark Delivered
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <button
                    onClick={handleLogout}
                    className="w-full mt-6 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl inline-flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    End Shift
                </button>
            </main>
        </div>
    );
}
