import { useRoutes } from 'react-router-dom';

// routes
import PatientRoutes from './PatientRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PharmacistRoutes from './PharmacistRoutes';
import AdminRoutes from './AdminRoutes';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([PatientRoutes, PharmacistRoutes, AdminRoutes, AuthenticationRoutes]);
}
