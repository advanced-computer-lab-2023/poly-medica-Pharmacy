import PropTypes from 'prop-types';
import { useUserContext } from 'hooks/useUserContext';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Chip, Drawer, List, Stack, Typography, useMediaQuery } from '@mui/material';
import { usePayment } from 'contexts/PaymentContext';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from './LogoSection';
import { drawerWidth } from 'store/constant';
import { useState, useEffect } from 'react';
import { patientAxios, pharmacyAxios } from 'utils/AxiosConfig';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
	const { user } = useUserContext();
	const userType = user.type;
	const userId = user.id;

	const { paymentDone } = usePayment();

	const [amountInWallet, setamountInWallet] = useState(0);

	console.log(paymentDone);

	useEffect(() => {
		if (userType === 'patient') {
			patientAxios.get(`/patients/${userId}/wallet`).then((response) => {
				setamountInWallet(response.data.walletAmount);
			});
		} else if (userType === 'pharmacist') {
			pharmacyAxios.get(`/pharmacists/${userId}/wallet`).then((response) => {
				setamountInWallet(response.data.walletAmount);
			});
		}
	}, [paymentDone]);

	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

	const drawer = (
		<>
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
					<LogoSection />
				</Box>
			</Box>
			<BrowserView>
				<PerfectScrollbar
					component="div"
					style={{
						height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
						paddingLeft: '16px',
						paddingRight: '16px'
					}}
				>

					<MenuList />
					<List
						subheader={
							userType != 'admin' && (
								<Stack direction="row" alignItems="center" spacing={2} mb={2}>
									<Avatar sx={{ backgroundColor: 'white', color: '#000' }}>
										<AccountBalanceWalletIcon />
									</Avatar>
									<Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
										<strong>Poly-Wallet:</strong> $ {amountInWallet}
									</Typography>
								</Stack>
							)
						}
					>
					</List>
					<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
						<Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
					</Stack>
				</PerfectScrollbar>
			</BrowserView>
			<MobileView>
				<Box sx={{ px: 2 }}>
					<MenuList />
					<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
						<Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
					</Stack>
				</Box>
			</MobileView>
		</>
	);

	const container = window !== undefined ? () => window.document.body : undefined;


	return (
		<Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
			<Drawer
				container={container}
				variant={matchUpMd ? 'persistent' : 'temporary'}
				anchor="left"
				open={drawerOpen}
				onClose={drawerToggle}
				sx={{
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						background: theme.palette.background.default,
						color: theme.palette.text.primary,
						borderRight: 'none',
						[theme.breakpoints.up('md')]: {
							top: '88px'
						}
					}
				}}
				ModalProps={{ keepMounted: true }}
				color="inherit"
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

Sidebar.propTypes = {
	drawerOpen: PropTypes.bool,
	drawerToggle: PropTypes.func,
	window: PropTypes.object
};

export default Sidebar;
