import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const LazyPrescriptions = Loadable(
	lazy(() => import('pages/prescriptions/Prescriptions')),
);
const LazyMedicines = Loadable(lazy(() => import('pages/medicine/Medicines')));
const LazyCart = Loadable(lazy(() => import('pages/cart/Cart')));
const Account = Loadable(lazy(() => import('pages/profile/Account'))); //TODO: generalize this
const LazyPayment = Loadable(lazy(() => import('pages/payment/Payment')));
const LazyOrders = Loadable(lazy(() => import('pages/orders/Orders')));
const LazyCheckout = Loadable(lazy(() => import('pages/checkout/Checkout')));
const LazyAddress = Loadable(lazy(() => import('pages/address/Address')));
// utilities routing
const UtilsTypography = Loadable(
	lazy(() => import('pages/utilities/Typography')),
);
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const PatientRoutes = {
	path: '/patient',
	element: <MainLayout userType={'patient'} />,
	children: [
		{
			path: 'patient',
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
					path: 'prescriptions',
					element: <LazyPrescriptions />,
				},
				{
					path: 'medicines',
					element: <LazyMedicines />,
				},
				{
					path: 'cart',
					element: <LazyCart />,
				},
				{
					path: 'payment',
					element: <LazyPayment />,
				},
				{
					path: 'orders',
					element: <LazyOrders />,
				},
				{
					path: 'checkout/:type/:id',
					element: <LazyCheckout />,
				},
				{
					path: 'address',
					element: <LazyAddress />,
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

export default PatientRoutes;
