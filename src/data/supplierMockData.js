export const supplierProfiles = [
    {
        id: 'SUP-3901',
        companyName: 'MedPharm Supplies',
        managerName: 'Mara Santos',
        email: 'medpharm@mediquick.local',
        phone: '+63 917 112 0099',
        warehouseAddress: 'Blk 8, North Reclamation Area, Cebu City',
        serviceAreas: ['Talisay', 'Cebu City', 'Mandaue'],
    },
    {
        id: 'SUP-4018',
        companyName: 'SafeGuard Medical',
        managerName: 'Joel Martinez',
        email: 'safeguard@mediquick.local',
        phone: '+63 918 667 2210',
        warehouseAddress: 'F. Cabahug St., Kasambagan, Cebu City',
        serviceAreas: ['Cebu City', 'Lapu-Lapu', 'Mandaue'],
    },
    {
        id: 'SUP-4172',
        companyName: 'HealthTech Solutions',
        managerName: 'Alyssa Dizon',
        email: 'healthtech@mediquick.local',
        phone: '+63 919 004 8877',
        warehouseAddress: 'A.S. Fortuna, Banilad, Mandaue City',
        serviceAreas: ['Mandaue', 'Consolacion', 'Cebu City'],
    },
    {
        id: 'SUP-4260',
        companyName: 'Emergency Ready Co.',
        managerName: 'Rico Navarro',
        email: 'emergencyready@mediquick.local',
        phone: '+63 920 551 3344',
        warehouseAddress: 'Ouano Ave., Tipolo, Mandaue City',
        serviceAreas: ['Talisay', 'Cebu City', 'Minglanilla'],
    },
];

export const supplierPayouts = [
    {
        id: 'PAY-2026-001',
        supplierName: 'MedPharm Supplies',
        period: 'Mar 01 - Mar 07',
        amount: 22340.5,
        status: 'Released',
        releaseDate: '2026-03-09',
    },
    {
        id: 'PAY-2026-002',
        supplierName: 'MedPharm Supplies',
        period: 'Mar 08 - Mar 14',
        amount: 18725.0,
        status: 'Processing',
        releaseDate: '2026-03-16',
    },
    {
        id: 'PAY-2026-003',
        supplierName: 'SafeGuard Medical',
        period: 'Mar 01 - Mar 07',
        amount: 30120.75,
        status: 'Released',
        releaseDate: '2026-03-09',
    },
];

export const supplierActivityLog = [
    {
        id: 'ACT-1001',
        supplierName: 'MedPharm Supplies',
        type: 'restock',
        message: 'Paracetamol 500mg restocked by 100 units',
        timestamp: '2026-03-14T08:20:00Z',
    },
    {
        id: 'ACT-1002',
        supplierName: 'MedPharm Supplies',
        type: 'dispatch',
        message: 'Order ORD-2026-908 assigned to rider',
        timestamp: '2026-03-14T10:05:00Z',
    },
    {
        id: 'ACT-1003',
        supplierName: 'MedPharm Supplies',
        type: 'delivery',
        message: 'Order ORD-2026-899 marked delivered',
        timestamp: '2026-03-14T14:40:00Z',
    },
    {
        id: 'ACT-1004',
        supplierName: 'SafeGuard Medical',
        type: 'restock',
        message: 'N95 Face Mask stock increased by 250 units',
        timestamp: '2026-03-14T09:30:00Z',
    },
];

export const supplierAlerts = [
    {
        id: 'ALT-01',
        supplierName: 'MedPharm Supplies',
        level: 'warning',
        title: 'Pending quality check',
        detail: '2 items are waiting for expiration review before dispatch.',
    },
    {
        id: 'ALT-02',
        supplierName: 'MedPharm Supplies',
        level: 'info',
        title: 'Peak hour reminder',
        detail: 'Prepare rider handoff between 5:00 PM and 7:00 PM for faster SLA.',
    },
    {
        id: 'ALT-03',
        supplierName: 'Emergency Ready Co.',
        level: 'warning',
        title: 'Oxygen tank threshold reached',
        detail: 'Available oxygen tanks are below recommended reserve stock.',
    },
];
