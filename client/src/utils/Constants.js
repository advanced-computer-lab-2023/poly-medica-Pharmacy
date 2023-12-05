export const CLINIC_BASE_URL = 'http://localhost:8001';
export const PATIENT_BASE_URL = 'http://localhost:8002';
export const PHARMACY_BASE_URL = 'http://localhost:8003';
export const AUTHENTICATION_BASE_URL = 'http://localhost:8004';
export const PAYMENT_BASE_URL = 'http://localhost:8005';
export const COMMUNICATION_BASE_URL = 'http://localhost:8006';
export const PHARMACY_MONGO_ID = '5fc7a921328d333b8ce85141';

export const PATIENT_TYPE_ENUM = 'patient';
export const ADMIN_TYPE_ENUM = 'admin';
export const PHARMACIST_TYPE_ENUM = 'pharmacist';

const APPOINTMENT_STATUS = ['COMPLETE', 'UNCOMPLETE', 'CANCELED'];
export const DATE_FILTER_ARRAY = ['Last week', 'Last month', 'Last year'];

export const APPOINTMENT_FILTER_ARRAY = [
    {
        attribute: 'Appointment Status',
        values: APPOINTMENT_STATUS,
    },
    {
        attribute: 'Date',
        values: DATE_FILTER_ARRAY,
    },
];

export const DOCTOR_TYPE_ENUM = 'doctor';

export const ADDRESS_ATTRIBUTES = [
    'city',
    'street',
    'buildingName',
    'phoneNumber',
];

export const PENDING_STATUS = 'pending';
export const CANCELLED_STATUS = 'cancelled';
export const REJECTED_STATUS = 'rejected';

export const DATE_FORAMT = 'MMMM Do YYYY, h:mm a';

export const ZERO_INDEX = 0;

export const PUBLIC_KEY =
    'pk_test_51O42p1LtBZHl10napsQI3fM0sBwi0QLCZJc7k8wpLLfbGVnpf8QcQvBUkNiNVL6TGkqMzL5bADebhcTdZhKDNiqv00ESfjq69z';
