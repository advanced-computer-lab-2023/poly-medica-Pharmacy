// assets
import {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    IconRegistered,
} from '@tabler/icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
// constant
const icons = {
    IconKey,
    IconVaccineBottle,
    IconEmergencyBed,
    IconMedicineSyrup,
    AdminPanelSettingsOutlinedIcon,
    IconRegistered,
    ShoppingCartOutlinedIcon,
    PointOfSaleIcon,
    ReceiptLongIcon,
    HomeIcon,
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
            url: '/patient/pages/medicines',
            target: false,
        },
        {
            id: 'cart',
            title: 'Cart',
            type: 'item',
            icon: ShoppingCartOutlinedIcon,
            url: '/patient/pages/cart',
            target: false,
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
        {
            id: 'chat',
            title: 'Chat',
            type: 'item',
            icon: icons.ChatIcon,
            url: '/patient/pages/chat',
            target: false,
        },
    ],
};

export default pages;
