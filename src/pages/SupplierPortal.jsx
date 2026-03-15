import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowRight,
    Boxes,
    Clock3,
    Filter,
    LogOut,
    Package,
    PhilippinePeso,
    Search,
    ShieldCheck,
    TrendingUp,
    Truck,
    UserCircle2,
} from 'lucide-react';
import { products } from '../data/mockData';
import { supplierActivityLog, supplierAlerts, supplierPayouts } from '../data/supplierMockData';
import { useAuthStore, useOrderStore } from '../store';

export default function SupplierPortal() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const orders = useOrderStore((state) => state.orders);
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
    const [orderFilter, setOrderFilter] = useState('all');
    const [inventoryQuery, setInventoryQuery] = useState('');
    const [restockByProduct, setRestockByProduct] = useState({});

    const supplierName = user?.supplierName || 'MedPharm Supplies';

    const productMap = useMemo(() => {
        const map = new Map();
        products.forEach((product) => map.set(product.id, product));
        return map;
    }, []);

    const supplierProducts = useMemo(() => {
        return products.filter((product) => product.supplier === supplierName);
    }, [supplierName]);

    const [stockByProductId, setStockByProductId] = useState({});

    useEffect(() => {
        const initialStocks = supplierProducts.reduce((acc, product) => {
            acc[product.id] = product.stock;
            return acc;
        }, {});
        setStockByProductId(initialStocks);
        setRestockByProduct({});
    }, [supplierProducts]);

    const supplierOrders = useMemo(() => {
        return orders
            .map((order) => {
                const supplierItems = (order.items || []).filter((item) => {
                    const product = productMap.get(item.productId);
                    return product?.supplier === supplierName;
                });

                if (supplierItems.length === 0) {
                    return null;
                }

                const subtotal = supplierItems.reduce((total, item) => {
                    const product = productMap.get(item.productId);
                    return total + (product?.price || 0) * item.quantity;
                }, 0);

                const totalUnits = supplierItems.reduce((count, item) => count + item.quantity, 0);

                return {
                    ...order,
                    supplierItems,
                    supplierSubtotal: subtotal,
                    totalUnits,
                };
            })
            .filter(Boolean);
    }, [orders, productMap, supplierName]);

    const reservedByProduct = useMemo(() => {
        return supplierOrders.reduce((acc, order) => {
            if (order.status === 'Delivered') {
                return acc;
            }

            order.supplierItems.forEach((item) => {
                acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
            });

            return acc;
        }, {});
    }, [supplierOrders]);

    const supplierInventory = useMemo(() => {
        return supplierProducts.map((product) => {
            const totalStock = stockByProductId[product.id] ?? product.stock;
            const reservedUnits = reservedByProduct[product.id] || 0;
            const availableStock = Math.max(totalStock - reservedUnits, 0);

            return {
                ...product,
                totalStock,
                reservedUnits,
                availableStock,
            };
        });
    }, [supplierProducts, stockByProductId, reservedByProduct]);

    const filteredInventory = useMemo(() => {
        const query = inventoryQuery.trim().toLowerCase();
        if (!query) {
            return supplierInventory;
        }

        return supplierInventory.filter((product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }, [inventoryQuery, supplierInventory]);

    const lowStockItems = useMemo(
        () => supplierInventory.filter((product) => product.availableStock <= 30),
        [supplierInventory]
    );

    const processingOrders = supplierOrders.filter((order) => order.status === 'Processing').length;
    const activeDeliveries = supplierOrders.filter((order) => order.status === 'Out for Delivery').length;
    const supplierRevenue = supplierOrders.reduce((total, order) => total + order.supplierSubtotal, 0);
    const deliveredOrders = supplierOrders.filter((order) => order.status === 'Delivered');
    const deliveredRevenue = deliveredOrders.reduce((sum, order) => sum + order.supplierSubtotal, 0);
    const fulfillmentRate = supplierOrders.length
        ? Math.round((deliveredOrders.length / supplierOrders.length) * 100)
        : 0;
    const averageOrderValue = supplierOrders.length ? supplierRevenue / supplierOrders.length : 0;

    const visibleOrders = useMemo(() => {
        if (orderFilter === 'all') {
            return supplierOrders;
        }
        return supplierOrders.filter((order) => order.status === orderFilter);
    }, [orderFilter, supplierOrders]);

    const payoutRecords = useMemo(
        () => supplierPayouts.filter((payout) => payout.supplierName === supplierName),
        [supplierName]
    );

    const activityRecords = useMemo(
        () => supplierActivityLog.filter((activity) => activity.supplierName === supplierName).slice(0, 6),
        [supplierName]
    );

    const alertRecords = useMemo(
        () => supplierAlerts.filter((alert) => alert.supplierName === supplierName),
        [supplierName]
    );

    const handleDispatchOrder = (orderId) => {
        updateOrderStatus(orderId, 'Out for Delivery');
    };

    const handleMarkDelivered = (orderId) => {
        updateOrderStatus(orderId, 'Delivered');
    };

    const handleLogout = () => {
        logout();
        navigate('/supplier/login');
    };

    const updateStockBy = (productId, amount) => {
        if (!Number.isFinite(amount)) {
            return;
        }

        setStockByProductId((prev) => {
            const current = prev[productId] || 0;
            return {
                ...prev,
                [productId]: Math.max(current + amount, 0),
            };
        });
    };

    const applyManualRestock = (productId) => {
        const rawAmount = Number(restockByProduct[productId]);
        if (!rawAmount || rawAmount < 1) {
            return;
        }

        updateStockBy(productId, rawAmount);
        setRestockByProduct((prev) => ({ ...prev, [productId]: '' }));
    };

    return (
        <div className="container-app bg-gradient-to-b from-amber-50 via-white to-white pb-10">
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-amber-100 px-5 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold">MediQuick Supplier Workspace</p>
                        <h1 className="text-2xl font-extrabold text-gray-900 mt-1">{supplierName}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-red-600"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </button>
                </div>
                <div className="mt-3 rounded-xl bg-amber-100/60 px-3 py-2 text-sm text-amber-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    You are connected to live MediQuick order flow and rider dispatch updates.
                </div>
            </div>

            <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <MetricCard icon={Boxes} label="Catalog Items" value={supplierProducts.length} tone="blue" />
                    <MetricCard icon={AlertTriangle} label="Low Stock" value={lowStockItems.length} tone="red" />
                    <MetricCard icon={Clock3} label="To Fulfill" value={processingOrders} tone="amber" />
                    <MetricCard icon={PhilippinePeso} label="Supplier Sales" value={`₱${supplierRevenue.toFixed(2)}`} tone="emerald" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Delivered Revenue</p>
                        <p className="text-2xl font-extrabold text-emerald-900 mt-1">₱{deliveredRevenue.toFixed(2)}</p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Fulfillment Rate</p>
                        <p className="text-2xl font-extrabold text-blue-900 mt-1">{fulfillmentRate}%</p>
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Avg Order Value</p>
                        <p className="text-2xl font-extrabold text-violet-900 mt-1">₱{averageOrderValue.toFixed(2)}</p>
                    </div>
                </div>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Operational Queue</h2>
                        <span className="text-xs text-gray-500">{supplierOrders.length} linked orders</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <button
                            onClick={() => setOrderFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${orderFilter === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setOrderFilter('Processing')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${orderFilter === 'Processing' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Processing
                        </button>
                        <button
                            onClick={() => setOrderFilter('Out for Delivery')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${orderFilter === 'Out for Delivery' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Out for Delivery
                        </button>
                        <button
                            onClick={() => setOrderFilter('Delivered')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${orderFilter === 'Delivered' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Delivered
                        </button>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 ml-auto">
                            <Filter className="w-3.5 h-3.5" />
                            {visibleOrders.length} shown
                        </span>
                    </div>

                    {supplierOrders.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center">
                            <Package className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                            <p className="font-semibold text-gray-900">No supplier orders yet</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Orders placed through customer checkout will appear here when they include your products.
                            </p>
                        </div>
                    ) : visibleOrders.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center">
                            <p className="font-semibold text-gray-900">No orders in this status</p>
                            <p className="text-sm text-gray-600 mt-1">Switch filters to review other supplier orders.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {visibleOrders.slice(0, 6).map((order) => (
                                <div key={order.id} className="rounded-xl border border-gray-200 p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-gray-900">{order.id}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {order.supplierItems.length} supplier item{order.supplierItems.length > 1 ? 's' : ''} • {order.totalUnits} unit{order.totalUnits > 1 ? 's' : ''} • ₱{order.supplierSubtotal.toFixed(2)}
                                            </p>
                                        </div>
                                        <StatusBadge status={order.status} />
                                    </div>

                                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {order.supplierItems.slice(0, 2).map((item) => {
                                            const linkedProduct = productMap.get(item.productId);
                                            return (
                                                <div key={`${order.id}-${item.productId}`} className="rounded-lg bg-gray-50 px-2 py-1.5 text-xs text-gray-700">
                                                    {linkedProduct?.name || `Product #${item.productId}`} x{item.quantity}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {order.status === 'Processing' && (
                                            <button
                                                onClick={() => handleDispatchOrder(order.id)}
                                                className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-3 py-2 rounded-lg"
                                            >
                                                Assign Rider
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                        {order.status === 'Out for Delivery' && (
                                            <button
                                                onClick={() => handleMarkDelivered(order.id)}
                                                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-3 py-2 rounded-lg"
                                            >
                                                Mark Delivered
                                                <Truck className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => navigate(`/order-tracking/${order.id}`)}
                                            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-2 rounded-lg"
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Inventory Snapshot</h2>
                        <span className="text-xs text-gray-500">{activeDeliveries} active deliveries</span>
                    </div>

                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={inventoryQuery}
                            onChange={(e) => setInventoryQuery(e.target.value)}
                            placeholder="Search product or category"
                            className="w-full rounded-xl border border-gray-200 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    <div className="space-y-3">
                        {filteredInventory.map((product) => (
                            <div key={product.id} className="rounded-xl border border-gray-100 p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Reserved for orders: {product.reservedUnits}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-blue-700">₱{product.price.toFixed(2)}</p>
                                        <p className={`text-xs font-semibold mt-1 ${product.availableStock <= 20
                                                ? 'text-red-600'
                                                : product.availableStock <= 40
                                                    ? 'text-amber-600'
                                                    : 'text-emerald-600'
                                            }`}>
                                            {product.availableStock} available / {product.totalStock} total
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <button
                                        onClick={() => updateStockBy(product.id, 10)}
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                    >
                                        +10
                                    </button>
                                    <button
                                        onClick={() => updateStockBy(product.id, 50)}
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                    >
                                        +50
                                    </button>
                                    <button
                                        onClick={() => updateStockBy(product.id, -10)}
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                                    >
                                        -10
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={restockByProduct[product.id] || ''}
                                        onChange={(e) => setRestockByProduct((prev) => ({ ...prev, [product.id]: e.target.value }))}
                                        className="w-24 border border-gray-200 rounded-md px-2 py-1.5 text-xs"
                                        placeholder="Custom"
                                    />
                                    <button
                                        onClick={() => applyManualRestock(product.id)}
                                        className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    >
                                        Restock
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Performance & Alerts</h2>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Updated live
                        </span>
                    </div>
                    {lowStockItems.length === 0 ? (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-sm text-emerald-800">
                            Great job. No low-stock alerts right now.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {lowStockItems.slice(0, 4).map((item) => (
                                <div key={item.id} className="rounded-xl bg-red-50 border border-red-100 p-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-red-900">{item.name}</p>
                                        <p className="text-xs text-red-700">{item.availableStock} available units remaining</p>
                                    </div>
                                    <button
                                        onClick={() => updateStockBy(item.id, 30)}
                                        className="text-xs font-semibold px-2.5 py-1.5 rounded-md bg-white text-red-700 border border-red-200 hover:bg-red-100"
                                    >
                                        Quick +30
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {alertRecords.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {alertRecords.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`rounded-xl p-3 border ${alert.level === 'warning'
                                            ? 'bg-amber-50 border-amber-100'
                                            : 'bg-blue-50 border-blue-100'
                                        }`}
                                >
                                    <p className={`text-sm font-semibold ${alert.level === 'warning' ? 'text-amber-900' : 'text-blue-900'}`}>
                                        {alert.title}
                                    </p>
                                    <p className={`text-xs mt-1 ${alert.level === 'warning' ? 'text-amber-700' : 'text-blue-700'}`}>
                                        {alert.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Payout History</h2>
                        <span className="text-xs text-gray-500">{payoutRecords.length} records</span>
                    </div>

                    {payoutRecords.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 text-center">
                            No payout records found for this supplier yet.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {payoutRecords.map((payout) => (
                                <div key={payout.id} className="rounded-xl border border-gray-100 p-3 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{payout.period}</p>
                                        <p className="text-xs text-gray-500 mt-1">{payout.id} • Release: {payout.releaseDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-700">₱{payout.amount.toFixed(2)}</p>
                                        <p className={`text-xs font-semibold mt-1 ${payout.status === 'Released' ? 'text-emerald-700' : 'text-amber-700'}`}>
                                            {payout.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-gray-900">Activity Timeline</h2>
                        <span className="text-xs text-gray-500">Recent updates</span>
                    </div>

                    {activityRecords.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 text-center">
                            No recent supplier activity available.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {activityRecords.map((activity) => (
                                <div key={activity.id} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(activity.timestamp).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
                    <h2 className="font-bold text-gray-900 mb-3">Portal Contacts</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-blue-50 border border-blue-100 p-3">
                            <p className="text-xs text-blue-700 font-semibold">Rider Coordination</p>
                            <p className="text-sm text-blue-900 mt-1">Assign ready orders once packed so riders can pick up on time.</p>
                        </div>
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                            <p className="text-xs text-emerald-700 font-semibold">Supplier Admin</p>
                            <p className="text-sm text-emerald-900 mt-1 inline-flex items-center gap-2">
                                <UserCircle2 className="w-4 h-4" />
                                {user?.name || 'Supplier Manager'}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, tone }) {
    const toneClasses = {
        blue: 'bg-blue-50 border-blue-100 text-blue-800',
        red: 'bg-red-50 border-red-100 text-red-800',
        amber: 'bg-amber-50 border-amber-100 text-amber-800',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
    };

    return (
        <div className={`rounded-2xl border p-3 ${toneClasses[tone]}`}>
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
                <Icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-extrabold mt-2">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    if (status === 'Processing') {
        return <span className="status-badge status-processing">Processing</span>;
    }

    if (status === 'Out for Delivery') {
        return <span className="status-badge status-delivery">Out for Delivery</span>;
    }

    return <span className="status-badge status-delivered">Delivered</span>;
}
