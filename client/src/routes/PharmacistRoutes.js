import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyMedicines = Loadable(lazy(() => import('pages/medicine/Medicines')));
const LazyPatientsInfo = Loadable(lazy(() => import('pages/patient/PatientInfo')));
const LazyPharmacistsInfo = Loadable(lazy(() => import('pages/pharmacist/PharmacistInfo')));
const LazyPharmacistRequests = Loadable(
	lazy(() => import('pages/PharmacistRequests')),
);
const LazyPatients = Loadable(lazy(() => import('pages/Patients')));
const LazyAdmins = Loadable(lazy(() => import('pages/Admins')));
const LazyPharmacists = Loadable(lazy(() => import('pages/Pharmacists')));
const LazyOrders = Loadable(lazy(() => import('pages/orders/Orders')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('pages/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const PharmacistRoutes = {
	path: '/pharmacist',
	element: <MainLayout userType={'pharmacist'}/>,
	children: [
		{
			path: 'pharmacist',
			element: <DashboardDefault />
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />
				}
			]
		},
		{
			path: 'pages',
			children: [
				{
					path: 'medicines',
					element: <LazyMedicines />
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
                    path: 'orders',
                    element: <LazyOrders />,
                },
			]
		},
		{
			path: 'pages',
			children: [
				{
					path: 'patientInfo',
					element: <LazyPatientsInfo />
				},
			]
		},
		{
			path: 'pages',
			children: [
				{
					path: 'PharmacistsInfo',
					element: <LazyPharmacistsInfo />
				}
			]
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
			element: <SamplePage />
		}
	]
};

export default PharmacistRoutes;
