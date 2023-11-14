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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// constant
const icons = {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	AdminPanelSettingsOutlinedIcon,
	IconRegistered,
	ReceiptLongIcon,
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
			id: 'patientInfo',
			title: 'Patient Info',
			type: 'item',
			icon: PersonIcon,
			url: '/pharmacist/pages/PatientInfo',
			target: false,
		},
		{
			id: 'pharmacistsInfo',
			title: 'Pharmacists Info',
			type: 'item',
			icon: LocalPharmacyIcon,
			url: '/pharmacist/pages/PharmacistsInfo',
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
	],
};

export default pages;
