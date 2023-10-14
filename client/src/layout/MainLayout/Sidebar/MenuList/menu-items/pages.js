// assets
import {
	IconKey,
	IconVaccineBottle,
	IconEmergencyBed,
	IconMedicineSyrup,
	IconRegistered,
} from '@tabler/icons';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

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
	title: 'Pages',
	caption: 'Pages Caption',
	type: 'group',
	children: [
		{
			id: 'authentication',
			title: 'page',
			type: 'collapse',
			icon: icons.IconKey,

			children: [
				{
					id: 'login3',
					title: 'subPage',
					type: 'item',
					url: '/pages/login/login3',
					target: true,
				},
				{
					id: 'register3',
					title: 'subPage',
					type: 'item',
					url: '/pages/register/register3',
					target: true,
				},
			],
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item',
			icon: icons.IconVaccineBottle,
			url: '/pages/medicines',
			target: false,
		},
		{
			id: 'pharmacistsInfo',
			title: 'Pharmacists Info',
			type: 'item',
			icon: LocalPharmacyIcon,
			url: '/pages/PharmacistsInfo',
			target: false,
		},
		{
			id: 'admins',
			title: 'Admins',
			type: 'item',
			icon: icons.AdminPanelSettingsOutlinedIcon,
			url: '/pages/admins',
			target: false,
		},
		{
			id: 'patients',
			title: 'Patients',
			type: 'item',
			icon: icons.IconEmergencyBed,
			url: '/pages/patients',
			target: false,
		},
		{
			id: 'pharmacists',
			title: 'Pharmacists',
			type: 'item',
			icon: icons.IconMedicineSyrup,
			url: '/pages/pharmacists',
			target: false,
		},
		{
			id: 'pharmacist-requests',
			title: 'Pharmacist Requests',
			type: 'item',
			icon: icons.IconRegistered,
			url: '/pages/pharmacist-requests',
		},
	],
};

export default pages;
