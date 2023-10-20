
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
			url: '/pharmacist/pages/medicines',
			target: false
		},
		{
			id: 'patientInfo',
			title: 'Patient Info',
			type: 'item',
			icon: PersonIcon,
			url: '/pharmacist/pages/PatientInfo',
			target: false
		},
		{
			id: 'pharmacistsInfo',
			title: 'Pharmacists Info',
			type: 'item',
			icon: LocalPharmacyIcon,
			url: '/pharmacist/pages/PharmacistsInfo',
			target: false
		},
		{
			id: 'admins',
			title: 'Admins',
			type: 'item',
			icon: icons.AdminPanelSettingsOutlinedIcon,
			url: '/pharmacist/pages/admins',
			target: false,
		},
		{
			id: 'patients',
			title: 'Patients',
			type: 'item',
			icon: icons.IconEmergencyBed,
			url: '/pharmacist/pages/patients',
			target: false,
		},
		{
			id: 'pharmacists',
			title: 'Pharmacists',
			type: 'item',
			icon: icons.IconMedicineSyrup,
			url: '/pharmacist/pages/pharmacists',
			target: false,
		},
		{
			id: 'pharmacist-requests',
			title: 'Pharmacist Requests',
			type: 'item',
			icon: icons.IconRegistered,
			url: '/pharmacist/pages/pharmacist-requests',
		},

	]
};

export default pages;
