// assets
import {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	IconRegistered,
	IconPrescription,
} from '@tabler/icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
	ShoppingCartOutlinedIcon,
	PointOfSaleIcon,
	ReceiptLongIcon,
	IconPrescription,
	HomeIcon,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
	id: 'pages',
	title: 'Dashboard',
	// caption: 'Pages Caption',
	type: 'group',
	children: [
		{
			id: 'prescriptions',
			title: 'Prescriptions',
			type: 'item',
			icon: icons.IconPrescription,
			url: '/patient/pages/prescriptions',
			target: false,
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item',
			icon: icons.IconVaccineBottle,
			url: '/patient/pages/medicines',
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
