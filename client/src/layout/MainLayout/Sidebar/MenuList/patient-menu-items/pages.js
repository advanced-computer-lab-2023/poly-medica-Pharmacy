// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    IconRegistered,
} from '@tabler/icons';
import PersonIcon from '@mui/icons-material/Person';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from '@mui/icons-material/Home';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    AdminPanelSettingsOutlinedIcon,
    IconRegistered,
    PointOfSaleIcon,
    ReceiptLongIcon,
    HomeIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'medicines',
            title: 'Medicines',
            type: 'item',
            icon: icons.IconVaccineBottle,
            url: '/patient/pages/medicines',
            target: false,
        },
        {
            id: 'patientInfo',
            title: 'Patient Info',
            type: 'item',
            icon: PersonIcon,
            url: '/patient/pages/PatientInfo',
            target: false,
        },
        {
            id: 'pharmacistsInfo',
            title: 'Pharmacists Info',
            type: 'item',
            icon: LocalPharmacyIcon,
            url: '/patient/pages/PharmacistsInfo',
            target: false,
        },
        {
            id: 'admins',
            title: 'Admins',
            type: 'item',
            icon: icons.AdminPanelSettingsOutlinedIcon,
            url: '/patient/pages/admins',
            target: false,
        },
        {
            id: 'patients',
            title: 'Patients',
            type: 'item',
            icon: icons.IconEmergencyBed,
            url: '/patient/pages/patients',
            target: false,
        },
        {
            id: 'pharmacists',
            title: 'Pharmacists',
            type: 'item',
            icon: icons.IconMedicineSyrup,
            url: '/patient/pages/pharmacists',
            target: false,
        },
        {
            id: 'pharmacist-requests',
            title: 'Pharmacist Requests',
            type: 'item',
            icon: icons.IconRegistered,
            url: '/patient/pages/pharmacist-requests',
        },
        {
            id: 'Orders',
            title: 'Orders',
            type: 'item',
            icon: icons.ReceiptLongIcon,
            url: '/patient/pages/orders',
            target: false,
        },
        {
            id: 'Checkout',
            title: 'Checkout',
            type: 'item',
            icon: icons.PointOfSaleIcon,
            url: '/patient/pages/checkout',
            target: false,
        },
        {
            id: 'addresses',
            title: 'Address',
            type: 'item',
            icon: icons.HomeIcon,
            url: '/patient/pages/address',
            target: false,
        },
    ],
};

export default pages;
