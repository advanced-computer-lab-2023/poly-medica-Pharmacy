// assets
import {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	IconRegistered,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// constant
const icons = {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	AdminPanelSettingsOutlinedIcon,
	IconRegistered,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
	id: 'pages',
	title: 'Dashboard',
	// caption: 'Pages Caption',
	type: 'group',
	children: [
		{
			id: 'admins',
			title: 'Admins',
			type: 'item',
			icon: icons.AdminPanelSettingsOutlinedIcon,
			url: '/admin/pages/admins',
			target: false,
		},
		{
			id: 'patients',
			title: 'Patients',
			type: 'item',
			icon: icons.IconEmergencyBed,
			url: '/admin/pages/patients',
			target: false,
		},
		{
			id: 'pharmacists',
			title: 'Pharmacists',
			type: 'item',
			icon: icons.IconMedicineSyrup,
			url: '/admin/pages/pharmacists',
			target: false,
		},
		{
			id: 'pharmacist-requests',
			title: 'Pharmacist Requests',
			type: 'item',
			icon: icons.IconRegistered,
			url: '/admin/pages/pharmacist-requests',
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item',
			icon: icons.IconVaccineBottle,
			url: '/admin/pages/medicines',
		},
		{
			id: 'total-sales-report',
			title: 'Total Sales Report',
			type: 'item',
			icon: icons.IconRegistered,
			url: '/pharmacist/pages/total-sales-report',
			target: false,
		},
	],
};

export default pages;
