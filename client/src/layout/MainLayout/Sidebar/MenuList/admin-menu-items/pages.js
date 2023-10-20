
// assets
import { IconKey, IconVaccineBottle, IconEmergencyBed,
	IconMedicineSyrup,
	IconRegistered, } from '@tabler/icons';
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
			url: '/admin/pages/medicines',
			target: false
		},
		{
			id: 'patientInfo',
			title: 'Patient Info',
			type: 'item',
			icon: PersonIcon,
			url: '/admin/pages/PatientInfo',
			target: false
		},
		{
			id: 'pharmacistsInfo',
			title: 'Pharmacists Info',
			type: 'item',
			icon: LocalPharmacyIcon,
			url: '/admin/pages/PharmacistsInfo',
			target: false
		},
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

	]
};

export default pages;
