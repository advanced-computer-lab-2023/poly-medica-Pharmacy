// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import patientMenuItem from 'layout/MainLayout/Sidebar/MenuList/patient-menu-items';
import pharmacistMenuItem from 'layout/MainLayout/Sidebar/MenuList/pharmacist-menu-items';
import adminMenuItem from 'layout/MainLayout/Sidebar/MenuList/admin-menu-items';
import { useUserContext } from 'hooks/useUserContext';
import { ADMIN_TYPE_ENUM, PATIENT_TYPE_ENUM } from 'utils/Constants';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {

	const { user } = useUserContext();
	const menuItem = user.type == PATIENT_TYPE_ENUM? patientMenuItem: user.type == ADMIN_TYPE_ENUM? adminMenuItem: pharmacistMenuItem;
	const navItems = menuItem.items.map((item) => {
		switch (item.type) {
		case 'group':
			return <NavGroup key={item.id} item={item} />;
		default:
			return (
				<Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
				</Typography>
			);
		}
	});

	return <>{navItems}</>;
};

export default MenuList;
