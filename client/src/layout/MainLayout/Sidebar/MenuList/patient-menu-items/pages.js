// assets
import {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	IconRegistered,
} from '@tabler/icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// constant
const icons = {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	AdminPanelSettingsOutlinedIcon,
	IconRegistered,
	ShoppingCartOutlinedIcon,
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
	],
};

export default pages;
