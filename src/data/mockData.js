// Mock data for MediQuick app

export const categories = [
    { id: 1, name: 'Medicine', icon: '💊', color: '#4F46E5' },
    { id: 2, name: 'PPE', icon: '🦺', color: '#059669' },
    { id: 3, name: 'Equipment', icon: '🩺', color: '#DC2626' },
    { id: 4, name: 'Emergency Kits', icon: '🚑', color: '#EA580C' },
];

export const products = [
    {
        id: 1,
        name: 'Paracetamol 500mg',
        category: 'Medicine',
        price: 120.00,
        image: '/Paracetamol.webp',
        description: 'Effective pain reliever and fever reducer. Safe for adults and children.',
        dosage: 'Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.',
        stock: 150,
        supplier: 'MedPharm Supplies',
        rating: 4.8,
        reviews: 234,
    },
    {
        id: 2,
        name: 'N95 Face Mask (Box of 20)',
        category: 'PPE',
        price: 450.00,
        image: '/n95.webp',
        description: 'High-quality N95 respirator masks. 95% filtration efficiency.',
        dosage: 'Single use. Replace after 8 hours of use or when damaged.',
        stock: 89,
        supplier: 'SafeGuard Medical',
        rating: 4.9,
        reviews: 567,
    },
    {
        id: 3,
        name: 'Digital Thermometer',
        category: 'Equipment',
        price: 350.00,
        image: '/Digital Thermometer.webp',
        description: 'Fast and accurate digital thermometer with LCD display.',
        dosage: 'Clean tip before and after each use. Battery included.',
        stock: 45,
        supplier: 'HealthTech Solutions',
        rating: 4.7,
        reviews: 189,
    },
    {
        id: 4,
        name: 'First Aid Emergency Kit',
        category: 'Emergency Kits',
        price: 1250.00,
        image: '/First Aid Emergency Kit.webp',
        description: 'Complete emergency kit with bandages, antiseptics, and medical tools.',
        dosage: 'Check expiration dates regularly. Store in cool, dry place.',
        stock: 32,
        supplier: 'Emergency Ready Co.',
        rating: 4.9,
        reviews: 412,
    },
    {
        id: 5,
        name: 'Amoxicillin 500mg',
        category: 'Medicine',
        price: 280.00,
        image: '/Amoxicillin 500mg.webp',
        description: 'Antibiotic for bacterial infections. Prescription required.',
        dosage: 'Take as prescribed by physician. Complete full course.',
        stock: 78,
        supplier: 'MedPharm Supplies',
        rating: 4.6,
        reviews: 156,
    },
    {
        id: 6,
        name: 'Surgical Gloves (Box of 100)',
        category: 'PPE',
        price: 380.00,
        image: '/Surgical Gloves.webp',
        description: 'Latex-free surgical gloves. Powder-free and sterile.',
        dosage: 'Single use only. Dispose after use.',
        stock: 120,
        supplier: 'SafeGuard Medical',
        rating: 4.8,
        reviews: 298,
    },
    {
        id: 7,
        name: 'Blood Pressure Monitor',
        category: 'Equipment',
        price: 1850.00,
        image: '/Blood Pressure Monitor.webp',
        description: 'Automatic digital blood pressure monitor with memory function.',
        dosage: 'Follow instruction manual. Calibrate regularly.',
        stock: 28,
        supplier: 'HealthTech Solutions',
        rating: 4.7,
        reviews: 203,
    },
    {
        id: 8,
        name: 'Oxygen Tank (Portable)',
        category: 'Emergency Kits',
        price: 3500.00,
        image: '/Oxygen Tank Portable.webp',
        description: 'Portable oxygen tank for emergency use. Includes regulator.',
        dosage: 'Use only as directed by medical professional.',
        stock: 15,
        supplier: 'Emergency Ready Co.',
        rating: 4.9,
        reviews: 87,
    },
];

export const suppliers = [
    {
        id: 1,
        name: 'MedPharm Supplies',
        distance: '1.2 km',
        rating: 4.8,
        deliveryTime: '30-45 mins',
    },
    {
        id: 2,
        name: 'SafeGuard Medical',
        distance: '2.5 km',
        rating: 4.9,
        deliveryTime: '45-60 mins',
    },
    {
        id: 3,
        name: 'HealthTech Solutions',
        distance: '3.8 km',
        rating: 4.7,
        deliveryTime: '60-75 mins',
    },
    {
        id: 4,
        name: 'Emergency Ready Co.',
        distance: '4.2 km',
        rating: 4.9,
        deliveryTime: '60-90 mins',
    },
];

export const orderStatuses = [
    { id: 1, status: 'Processing', description: 'Your order is being prepared', icon: '📦' },
    { id: 2, status: 'Out for Delivery', description: 'Rider is on the way', icon: '🚚' },
    { id: 3, status: 'Delivered', description: 'Order completed', icon: '✅' },
];

export const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '2024-02-15',
        status: 'Delivered',
        total: 1520.00,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 3, quantity: 1 },
        ],
        estimatedTime: 'Delivered at 2:30 PM',
    },
    {
        id: 'ORD-2024-002',
        date: '2024-02-16',
        status: 'Out for Delivery',
        total: 830.00,
        items: [
            { productId: 2, quantity: 1 },
            { productId: 5, quantity: 1 },
        ],
        estimatedTime: '15-20 mins',
    },
];

export const paymentMethods = [
    { id: 1, name: 'Cash on Delivery', icon: '💵', enabled: true },
    { id: 2, name: 'GCash', icon: '📱', enabled: true },
    { id: 3, name: 'Credit/Debit Card', icon: '💳', enabled: true },
];

export const savedAddresses = [
    {
        id: 1,
        label: 'Home',
        address: '123 Main Street, Bulacao, Talisay City, Cebu',
        isDefault: true,
    },
    {
        id: 2,
        label: 'Clinic',
        address: '456 Medical Center Bldg, Bulacao, Talisay City, Cebu',
        isDefault: false,
    },
];

export const mockUser = {
    name: 'Dr. Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 912 345 6789',
    userType: 'Healthcare Professional',
};
