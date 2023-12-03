// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    IconRegistered,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChatIcon from '@mui/icons-material/Chat';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    AdminPanelSettingsOutlinedIcon,
    IconRegistered,
    ReceiptLongIcon,
    ChatIcon,
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
            url: '/pharmacist/pages/medicines',
            target: false,
        },
        {
            id: 'Orders',
            title: 'Orders',
            type: 'item',
            icon: icons.ReceiptLongIcon,
            url: '/pharmacist/pages/orders',
            target: false,
        },
        {
            id: 'chat',
            title: 'Chat',
            type: 'item',
            icon: icons.ChatIcon,
            url: '/pharmacist/pages/chat',
            target: false,
        },
    ],
};

export default pages;
