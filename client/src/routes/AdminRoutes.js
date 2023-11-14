import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyPharmacistRequests = Loadable(
	lazy(() => import('pages/pharmacist/PharmacistRequests')),
);
const LazyPatients = Loadable(lazy(() => import('pages/patient/Patients')));
const LazyAdmins = Loadable(lazy(() => import('pages/admin/Admins')));
const LazyPharmacists = Loadable(
	lazy(() => import('pages/pharmacist/Pharmacists')),
);
const LazyMedicines = Loadable(lazy(() => import('pages/medicine/Medicines')));
// utilities routing
const UtilsTypography = Loadable(
	lazy(() => import('pages/utilities/Typography')),
);
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));
const Account = Loadable(lazy(() => import('pages/profile/Account')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

//TODO: take the profile page from the clinic

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: '/admin',
	element: <MainLayout userType={'admin'} />,
	children: [
		{
			path: 'admin',
			element: <DashboardDefault />,
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />,
				},
			],
		},
		{
			path: 'pages',
			children: [
				{
					path: 'profile',
					element: <Account />,
				},
				{
					path: 'admins',
					element: <LazyAdmins />,
				},
				{
					path: 'pharmacists',
					element: <LazyPharmacists />,
				},
				{
					path: 'pharmacist-requests',
					element: <LazyPharmacistRequests />,
				},
				{
					path: 'patients',
					element: <LazyPatients />,
				},
				{
					path: 'medicines',
					element: <LazyMedicines />,
				},
			],
		},
		{
			path: 'utils',
			children: [
				{
					path: 'util-typography',
					element: <UtilsTypography />,
				},
				{
					path: 'util-color',
					element: <UtilsColor />,
				},
				{
					path: 'util-shadow',
					element: <UtilsShadow />,
				},
			],
		},

		{
			path: 'sample-page',
			element: <SamplePage />,
		},
	],
};

export default AdminRoutes;
