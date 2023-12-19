import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyMedicines = Loadable(lazy(() => import('pages/medicine/Medicines')));
const LazyPatientsInfo = Loadable(
    lazy(() => import('pages/patient/PatientInfo'))
);

const LazyHome = Loadable(lazy(() => import('pages/Home/Home')));

const LazyPharmacistsInfo = Loadable(
    lazy(() => import('pages/pharmacist/PharmacistInfo'))
);
const LazyTotalSalesReport = Loadable(
	lazy(() => import('pages/total-sales-report/TotalSalesReport')),
);
const Account = Loadable(lazy(() => import('pages/profile/Account')));
const LazyOrders = Loadable(lazy(() => import('pages/orders/Orders')));
// utilities routing
const UtilsTypography = Loadable(
    lazy(() => import('pages/utilities/Typography'))
);
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const PharmacistRoutes = {
	path: '/pharmacist',
	element: <MainLayout userType={'pharmacist'} />,
	children: [
		{
			path: 'pharmacist',
			element: <DashboardDefault />,
		},
		{
			path: 'dashboard',
			children: [
				{
					path: 'default',
					element: <DashboardDefault />,
				},
                {
                    path: 'home',
                    element: <LazyHome />,
                }
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
					path: 'medicines',
					element: <LazyMedicines />,
				},
				{
					path: 'orders',
					element: <LazyOrders />,
				},
				{
					path: 'total-sales-report',
					element: <LazyTotalSalesReport />,
				},
			],
		},
		{
			path: 'pages',
			children: [
				{
					path: 'patientInfo',
					element: <LazyPatientsInfo />,
				},
			],
		},
		{
			path: 'pages',
			children: [
				{
					path: 'PharmacistsInfo',
					element: <LazyPharmacistsInfo />,
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

export default PharmacistRoutes;
