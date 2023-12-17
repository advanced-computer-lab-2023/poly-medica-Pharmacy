# poly-medica-Pharmacy


## Motivation

Welcome to Poly-Medica, an innovative virtual pharmacy solution at the forefront of healthcare transformation. Designed to simplify medication management, Poly-Medica offers a streamlined interface for patients to effortlessly order prescriptions and manage medication refills. Through intuitive reminders and secure transactions, our platform ensures convenient access to prescribed medications within a digital healthcare ecosystem. Poly-Medica redefines the pharmacy experience, providing a reliable and efficient solution for patients' medication needs.


### Build Status

[![Frontend CI](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/client-ci.js.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/client-ci.js.yml)

[![Pharmacy CI](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/pharmacy-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/pharmacy-microservice-ci.yml)

### Planned Features

#### Microservices with Kafka

We're planning to implement a microservices architecture using Kafka as the messaging system. This will enable scalable and decoupled communication between various components of our system, ensuring robustness and flexibility.

#### Frontend Automated Testing with Jest for React MUI

To enhance code quality and ensure a stable frontend, we're working on implementing comprehensive automated tests using Jest for our React application built with Material-UI (MUI). These tests will cover unit testing, integration testing, and UI component testing to guarantee a seamless user experience.

#### AI Models Integration

We're excited to introduce AI models to augment our system's capabilities:

- *Pharmacist AI*: Our second AI model aims to assist pharmacists by recommending alternative medicines based on the active ingredients of a prescribed medication. This functionality will streamline the pharmacist's decision-making process, ensuring accuracy and efficiency in dispensing medicines.

## Code Style Guide

### JavaScript (Node.js and React)

- *Indentation*: Use 2 spaces.
- *Naming Conventions*: camelCase for variables/functions, PascalCase for React components.
- *ESLint*: Utilize appropriate ESLint configurations for Node.js and React.

### Express.js (Backend)

- *Routing*: Follow RESTful conventions for organized routes.
- *Middleware*: Use for route-specific logic.
- *Error Handling*: Implement middleware for consistent error responses.

### MongoDB (Database)

- *Naming Conventions*: Maintain consistent naming for collections (singular nouns).
- *Schema Design*: Ensure consistency across collections.
- *Indexes*: Optimize with appropriate indexes for queries.

### React with Material-UI (Frontend)

- *MUI Components*: Leverage Material-UI components and adhere to their guidelines.
- *Folder Structure*: Organize components by features/functions.
- *State Management*: Use Redux/Context API for complex state (if needed).
- *Lifecycle Methods*: Prefer hooks and functional components.

### Git Workflow

- *Branching*: Follow Gitflow (feature branches, develop, master).
- *Pull Requests*: Require clear descriptions and peer reviews before merging.


## Screenshots 🖵

<!-- Admin Screenshots-->
<details>
<summary>Admin</summary>

<details>
<summary>View All Admins</summary>

 ![admins](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/8dc71a5b-9e78-4600-a7e6-5f6b8b7cbe33)

    
</details>
<details>
<summary>Add New Admin</summary>

![add_admin](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/f6b4a70c-528c-413d-aa84-bdcba18ce2c7)

    
</details>


<details>
<summary>View Medicines</summary>

![admin_medicines](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/9e6a5f72-4c12-4ec8-a052-8e715cf6907a)

</details>








</details>

<!-- Patient Screenshots-->
<details>
<summary>Patient</summary>

<details>
<summary>Shoping Cart</summary>

![WhatsApp Image 2023-12-17 at 5 47 14 AM](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/89a55d39-3264-4f11-9caa-86b8bc50bcd4)

    
</details>

<details>
<summary>Checkout</summary>

 ![checkout](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/175e647e-1c06-4350-b8ea-d7e28a4b668a)

    
</details>

<details>
<summary>Credit Card</summary>

![credit_card](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/4730d0bc-1328-49ff-80af-97a814b288e9)

    
</details>

</details>



<!-- Pharmacist Screenshots-->
<details>
<summary>Pharmacist</summary>

<details>
<summary>Edit Medicines</summary>

 ![phar_edit_medicines](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/8b910093-f2e5-442b-9525-4881e101aeec)

    
</details>

<details>
<summary>View Orders</summary>

 ![phar_orders](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/d39eb15b-2e40-47f3-a59b-fa4200de25e3)

    
</details>


<details>
<summary>View Monthly Sales Report</summary>

 ![WhatsApp Image 2023-12-17 at 5 41 49 AM](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/ff450c6e-c1b6-494b-a12d-ef93827c5893)

    
</details>

</details>




## Tech/Framework used 

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [React](https://reactjs.org/)

-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Jest](https://jestjs.io/)

-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)

-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)

-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
- [Babel](https://babeljs.io/)


## Features

The system serves different type of users (Patient, pharmacist , Admin )
<details>
<summary> As  Guest I can </summary>

- Sign up as a patient 
- Submit a request to register as a pharmacist

</details>
<details>

<summary> As  Patient I can </summary>

- View, search and filter all available medicines
- Add medicines to the shopping cart
- View cart items
- Remove and change the amount of an item in the cart
- Checkout an order 
- Add a new delivery address
- Choose to pay with wallet, credit card or cash on delivery
- View orders and their status
- Cancel an order
- View alternatives to a medicine based on main active ingredient
- View the amount in my wallet
- Chat with a pharmacist


</details>

</details>
<details>

<summary> As  pharmacist I can </summary>

- view a list of all available medicines  
- view the available quantity, and sales of each medicine
- Search and Filter a list of all available medicienes 
- Add a medicine with its details
- upload medicine image
- edit medicine details and price
- Archive or Unarchive a medicine
- Filter sales report based on a medicine or date
-Chat with a doctor
-Receive notifications

</details>

<details>

<summary> As  Admin I can </summary>

- Add another adminstrator 
- Remove a pharmacist or a patient from the system
- View all of the information uploaded by a pharmacist
- Accept or Reject the request of a pharmacist
- View a list of all available medicines
- Search and Filter a list of all available medicienes 
- View a total sales report based on a chosen month
- View a pharmacist's and patients's   information 

</details>


## Code Examples  

<details>
    <summary>
    Filter Context
    </summary>

```javascript
// FilterContext.js

import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState(
    [
      {
        attribute: '', // The attribute to filter on (e.g., 'medicinalUse')
        values: [], // The available values to filter by
        selectedValue: '', // The currently selected filter value
      }
    ]);

  const updateFilter = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <FilterContext.Provider value={{ filterData, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

```
</details>

<details>
    <summary>
    Search Context
    </summary>

```javascript
 import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

```

 </details>


<details>
    <summary>
    Side Bar
    </summary>

```javascript
import PropTypes from 'prop-types';
import { useUserContext } from 'hooks/useUserContext';

import { useTheme } from '@mui/material/styles';
import {  Box, Chip, Drawer, List, Stack, useMediaQuery } from '@mui/material';
import { usePayment } from 'contexts/PaymentContext';
import EarningCard from 'ui-component/EarningCard';


import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';


import MenuList from './MenuList';
import LogoSection from './LogoSection';
import { drawerWidth } from 'store/constant';
import { useState, useEffect } from 'react';
import { patientAxios, pharmacyAxios } from 'utils/AxiosConfig';


const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
	const { user } = useUserContext();
	const userType = user.type;
	const userId = user.id;

	const { paymentDone, setPaymentDone } = usePayment();

	const [amountInWallet, setamountInWallet] = useState(0);
	

	
		

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
		setPaymentDone(false);
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
								<EarningCard isLoading={false} earning={'Poly-Wallet'} value={amountInWallet}/>
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



```

 </details>


<details>
    <summary>
    Notification
    </summary>

```javascript

import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

 
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
 
import { pharmacyAxios } from '../../utils/AxiosConfig';

import Header from './Header';
import Sidebar from './Sidebar';
 

import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';
import { SearchProvider } from 'contexts/SearchContext';
import { FilterProvider } from 'contexts/FilterContext';
import { useUserContext } from 'hooks/useUserContext';
import { useEffect } from 'react';
import { PaymentProvider } from 'contexts/PaymentContext';
 
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	...theme.typography.mainContent,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
	transition: theme.transitions.create(
		'margin',
		open
			? {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}
			: {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}
	),
	[theme.breakpoints.up('md')]: {
		marginLeft: open ? 0 : -(drawerWidth - 20),
		width: `calc(100% - ${drawerWidth}px)`
	},
	[theme.breakpoints.down('md')]: {
		marginLeft: '20px',
		width: `calc(100% - ${drawerWidth}px)`,
		padding: '16px'
	},
	[theme.breakpoints.down('sm')]: {
		marginLeft: '10px',
		width: `calc(100% - ${drawerWidth}px)`,
		padding: '16px',
		marginRight: '10px'
	}
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ userType }) => {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down('md')); 
	const leftDrawerOpened = useSelector((state) => state.customization.opened);
	const { user } = useUserContext();
	const userId = user.id;
	const navigate = useNavigate();
	useEffect(() => {
		if(!user || user.type != userType){
			navigate(`/${user.type}`);
		} else if(userType == 'patient') {
			pharmacyAxios.get(`/cart/users/${userId}`).then(() => { 
				console.log('cart already created!');
			}).catch((error) => {
				if(error.response.status == 404){
					pharmacyAxios.post('/cart/users', { userId }).then(() => {
						console.log('cart created!');
					}).catch((error) => {
						console.log(error);
					});
				}
			});
			
		}
	},[]);
	const dispatch = useDispatch();
	const handleLeftDrawerToggle = () => {
		dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
	};

	return (
		<FilterProvider>
		<SearchProvider>
		<PaymentProvider>
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
				}}
			>
				<Toolbar>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			{/* drawer */}
			{user && user.type == userType && <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />}

					{/* main content */}
			<Main theme={theme} open={leftDrawerOpened}>
					{(!user || user.type != userType) && <h1>not autherized!!</h1>}
					{user && user.type == userType && <Outlet />}
			</Main>
			{/* <Customization /> */}
		</Box>
		</PaymentProvider>
		</SearchProvider>
		</FilterProvider>
	);
};

export default MainLayout;

 


```

 </details>


 <details>
    <summary>
   Cart API
    </summary>

```javascript
import CartService from '../service/cart-service.js';
import {
	ERROR_STATUS_CODE,
	NOT_FOUND_STATUS_CODE,
	OK_STATUS_CODE,
} from '../utils/Constants.js';

import { isValidMongoId } from '../utils/Validation.js';

export const cart = (app) => {
	const service = new CartService();

	app.post('/cart/users', async (req, res) => {
		try {
			const { userId } = req.body;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.createCart(userId);
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'cart not found' });
			}
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			console.log(err.message, 'err in cart api');
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.post('/cart/users/:userId/medicines', async (req, res) => {
		try {
			const { medicine } = req.body;
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.addMedicineToCart(userId, medicine);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/cart/users/:userId/medicines', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			const updatedCart = await service.deleteAllMedicinesFromCart(userId);

			res.status(OK_STATUS_CODE).json({ updatedCart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId/medicines/', async (req, res) => {
		try {
			const { userId } = req.params;
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}
			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}
			const medicines = cart.medicines;
			res.status(OK_STATUS_CODE).json({ medicines });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.get('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Cart not found!' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine not found!' });
			}

			res.status(OK_STATUS_CODE).json({ medicine });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.patch('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			const { quantity } = req.query;

			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine not found!' });
			}

			if (quantity <= 0) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Quantity cannot be less that or equal to zero!' });
			}
			if (quantity > medicine.medicine.quantity) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Quantity cannot be more than the available amount!' });
			}

			const cart = await service.updateMedicineInCart(
				userId,
				medicineId,
				quantity,
			);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine is not in the cart!' });
			}
			res.status(OK_STATUS_CODE).json({ cart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});

	app.delete('/cart/users/:userId/medicines/:medicineId', async (req, res) => {
		try {
			const { userId, medicineId } = req.params;
			if (!isValidMongoId(medicineId)) {
				return res
					.status(ERROR_STATUS_CODE)
					.json({ err: 'Invalid medicine id!' });
			}
			if (!isValidMongoId(userId)) {
				return res.status(ERROR_STATUS_CODE).json({ err: 'Invalid user id!' });
			}

			const cart = await service.getCart(userId);
			if (!cart) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'No cart for this user' });
			}

			const medicine = await service.getMedicine(userId, medicineId);
			if (!medicine) {
				return res
					.status(NOT_FOUND_STATUS_CODE)
					.json({ err: 'Medicine is not in the cart!' });
			}

			const updatedCart = await service.deleteMedicineFromCart(
				userId,
				medicineId,
			);

			res.status(OK_STATUS_CODE).json({ updatedCart });
		} catch (err) {
			res.status(ERROR_STATUS_CODE).json({ err: err.message });
		}
	});
};



```

 </details>







 



## Installation  

Install my-project with `npm`

```bash
> git clone https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy.git
> cd poly-medica-pharmacy
> cd pharmacy && npm i && cd..
> cd client && npm i 
```



 ## API Refrences

 ### Pharnacy Endpoints
 
 #### Admin Endpoints
    
###### Example Request

    GET /admins
<details>
    <summary>
        Response
    </summary>

    {
    "admins": [
        {
            "_id": "6553da31154c235ee2273fb7",
            "userName": "admin",
            "mainAdmin": false,
            "__v": 0
        },
        {
            "_id": "657dc3c90ad23de5a4f3b21a",
            "userName": "adminPhamracy",
            "email": "admin@gmail.com",
            "mainAdmin": false,
            "__v": 0
        }
    ]
}
</details>

###### Example Request

    POST /admins 

| Body | Type | Descroption
| --- | --- | -----
| userId | String | Required.admin user id
| password | String | Required.admin password
| userName | String | Required.admin username
| email | String | Required.admin email
| type | String | Required.admin type

<details>
    <summary>
        Response
    </summary>

    state code = 200

        {
            "_id": "657dc3c90ad23de5a4f3b21a",
            "userName": "adminPhamracy",
            "email": "admin@gmail.com",
            "mainAdmin": false,
            "__v": 0
        }
    
</details>

###### Example Request

    DELETE /admins/:id 

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.admin's user id

<details>
    <summary>
        Response
    </summary>

    state code = 200

    {
    message: 'admin deleted!', 
        {
            "_id": "657dc3c90ad23de5a4f3b21a",
            "userName": "adminPhamracy",
            "email": "admin@gmail.com",
            "mainAdmin": false,
            "__v": 0
        }
}
</details>

###### Example Request

    DELETE /patients/:id 

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.patient's user id

<details>
    <summary>
        Response
    </summary>

    state code = 200

    {
    message: 'patient deleted!', 
        {
            "_id": "657dc3c90ad23de5a4f3b21a",
            "userName": "patient",
            "email": "patient@gmail.com",
            "mainAdmin": false,
            "__v": 0
        }
    
}
</details>

#### Cart Endpoints

###### Example Request

    POST /cart/users

| Body | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id

<details>
    <summary>
        Response
    </summary>

    state code = 200

    {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
        ],
        "__v": 65
    }
}
    
</details>

###### Example Request

    GET /cart/users/:userId

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id

<details>
    <summary>
        Response
    </summary>

    state code = 200

   {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
            {
                "medicine": {
                    "_id": "65513e3d406b1ee9de6b90ed",
                    "name": "panadol",
                    "price": 62,
                    "description": "very good for cold",
                    "pictureName": "Abdelrahman's photo1699823165934.jpg",
                    "quantity": 3,
                    "sales": 4,
                    "medicinalUse": "for cold",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a250ad23de5a4f3b14a"
            },
            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
        ],
        "__v": 65
        }
    }
    
</details>

###### Example Request

    POST /cart/users/:userId/medicines

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id

| Body | Type | Descroption
| --- | --- | -----
| medicine | medicine object | Required.medicines added to the cart

<details>
    <summary>
        Response
    </summary>

    state code = 200

   {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
            {
                "medicine": {
                    "_id": "65513e3d406b1ee9de6b90ed",
                    "name": "panadol",
                    "price": 62,
                    "description": "very good for cold",
                    "pictureName": "Abdelrahman's photo1699823165934.jpg",
                    "quantity": 3,
                    "sales": 4,
                    "medicinalUse": "for cold",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a250ad23de5a4f3b14a"
            },
            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
        ],
        "__v": 65
        }
    }
    
</details>

###### Example Request

    DELETE /cart/users/:userId/medicines

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id


<details>
    <summary>
        Response
    </summary>

    state code = 200

   {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
            
            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
        ],
        "__v": 65
        }
    }
    
</details>

###### Example Request

    GET /cart/users/:userId/medicines

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
</details>

###### Example Request

    GET /cart/users/:userId/medicines/:medicineId

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id
|medicineId | String | Required.medicine user id


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
</details>
            
###### Example Request

    PATCH /cart/users/:userId/medicines/:medicineId

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id
| medicineId | String | Required.medicine user id

| Query | Type | Descroption
| --- | --- | -----
| quantity | Number | Required.quanity of medicine in the cart

<details>
    <summary>
        Response
    </summary>

    state code = 200

    {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
            
            {
                "medicine": {
                    "_id": "65513e1b406b1ee9de6b90e9",
                    "name": "bruffen",
                    "price": 65,
                    "description": "very good for flu",
                    "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
                    "quantity": 4,
                    "sales": 14,
                    "medicinalUse": "for flu",
                    "activeIngerdients": "Sugar",
                    "monthlySales": []
                },
                "quantity": 1,
                "_id": "657d6a260ad23de5a4f3b157"
            }
        ],
        "__v": 65
        }
    }
</details>

###### Example Request

    DELETE /cart/users/:userId/medicines/:medicineId

| Parameter | Type | Descroption
| --- | --- | -----
| userId | String | Required.patient's user id
| medicineId | String | Required.medicine user id


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {
    "cart": {
        "_id": "65513bb6406b1ee9de6b90d4",
        "userId": "6551271dc2777e21102ef271",
        "medicines": [
        ],
        "__v": 65
        }
    }
</details>


#### Medicine Endpoints

###### Example Request

    GET /medicines

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
   {
    "medicines": [
        {
            "archive": false,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 4,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
    ]
   }
</details>

###### Example Request

    GET /medicines/archive

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
   {
    "medicines": [
        {
            "archive": true,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 4,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
    ]
   }
</details>

###### Example Request

    GET /medicines/:id

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.medicine's id


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
            "archive": false,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 4,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
</details>

###### Example Request

    GET medicines/:id/pictures

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.medicine's id


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
                C:\Users\unknown\Documents\pictures
            }
</details>

###### Example Request

    PATCH /medicines/:id

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.medicine's id


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
            "archive": false,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 4,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
</details>

###### Example Request

    PATCH /medicines/:id/:quantity

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.medicine's id
| quantity | Number | Required.medicine's quantity


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
            "archive": false,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 5,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
</details>

###### Example Request

    PATCH /medicines/:id/:archive

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.medicine's id
| archive | Boolean | Required.medicine's archive state


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
            
            }
</details>

###### Example Request

    POST /medicines

| Body | Type | Descroption
| --- | --- | -----
| newMedicine | medicine object | Required. the new medicine object 

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
        {
            "archive": false,
            "_id": "65513e1b406b1ee9de6b90e9",
            "name": "bruffen",
            "price": 65,
            "description": "very good ",
            "pictureName": "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699823131168.jpg",
            "quantity": 4,
            "sales": 14,
            "medicinalUse": "for mohamed",
            "activeIngerdients": "Sugar",
            "__v": 0,
            "monthlySales": [
            ]
        }
    
</details>

#### Pharmacist Endpoints

###### Example Request

    GET /patients


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
      {
    "allPatients": {
        "patients": [
            {
                "emergencyContact": {
                    "name": "mohamedd lhaled",
                    "mobile": "10019203",
                    "relation": "Uncle"
                },
                "_id": "652abaded27a562a45ed3185",
                "name": "mohamedd lhaled",
                "userName": "abdelrahman.elmeky",
                "email": "abdelrahman.a.f.m@gmail.com",
                "password": "$2b$10$zh9jccFNqnzA9t1chhQuYu93VFjy5AdqxVUpZXNTQr67E8XUJIpZO",
                "dateOfBirth": "2023-10-14T15:59:09.372Z",
                "gender": "MALE",
                "mobileNumber": "10019203",
                "familyMembers": [
                    {
                        "name": "amir tarek",
                        "nationalId": "12909245",
                        "age": 56,
                        "gender": "MALE",
                        "relation": "CHILD",
                        "email": "",
                        "mobileNumber": "",
                        "_id": "65512d2d3c230e8c8b83716e"
                    }
                ],
                "__v": 0,
                "walletAmount": 120,
                "healthRecords": [],
                "healthPackages": [],
                "deliveryAddresses": []
            }
        ]
    }
}
    
</details>

###### Example Request

    GET /pharmacists


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
      {
    "pharmacists": [
        {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "dateOfBirth": "2023-11-12T22:29:43.016Z",
                "_id": "6551521a7c84fccc7d4886aa"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699828250281.bmp",
                "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699828250504.jpg",
                "Abdelrahman,s passport1699828250512.jpg"
            ],
            "__v": 0,
            "walletAmount": 69122
        },
        {
            "_id": "6553d76e154c235ee2273f80",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist2",
                "email": "pharmacist@gmail1.com",
                "password": "$2b$10$z1yuydoknHf4NgsbtrYE8O.QTmM1xw9I/2y.Dc31EDJLp6UWGVXf.",
                "dateOfBirth": "2023-11-14T20:10:28.547Z",
                "_id": "6553d71a154c235ee2273f69"
            },
            "hourlyRate": 90,
            "affiliation": "asd",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699993370287.bmp"
            ],
            "__v": 0,
            "walletAmount": 69120
        },
        {
            "_id": "65560594cb2888cf1686f748",
            "userData": {
                "name": "mohamed khaled",
                "userName": "mohamed.khaled",
                "email": "abdelrahman.a.f.m@gmail.com",
                "password": "$2b$10$SCyzlwRlYv54NDvPqYM/teDRQNEbpzvyqLRt0Gf3H4QQqPYnr8T6e",
                "dateOfBirth": "2002-11-16T12:03:17.412Z",
                "_id": "6556053acb2888cf1686f744"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highschool",
            "documentsNames": [
                "371700136250157.PNG"
            ],
            "__v": 0,
            "walletAmount": 69120
        }
    ]
}
    
</details>

##### Example Request

    POST /check-pharmacist-req

| Body | Type | Descroption
| --- | --- | -----
| email | String | Required.pharmacist's email
| userName | String | Required.pharmacist's username


<details>
    <summary>
        Response
    </summary>

    state code = 200

            {
            
            }
</details>


###### Example Request

    GET /pharmacists/:id

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.pharmacist's id

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
      {
    "pharmacist":
        {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "dateOfBirth": "2023-11-12T22:29:43.016Z",
                "_id": "6551521a7c84fccc7d4886aa"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699828250281.bmp",
                "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699828250504.jpg",
                "Abdelrahman,s passport1699828250512.jpg"
            ],
            "__v": 0,
            "walletAmount": 69122
        },
        
}
    
</details>

userData,
			hourlyRate,
			affiliation,
			educationalBackground,
			documentsNames,


###### Example Request

    POST /pharmacists

| Parameter | Type | Descroption
| --- | --- | -----
| userData | User object | Required.pharmacist's user details
| hourlyRate | Number | Required.pharmacist's hourlyRate
| affiliation | String | Required.pharmacist's affiliation
| affiliation | String | Required.pharmacist's affiliation
| educationalBackground | String | Required.pharmacist's educational Background
| documentsNames | String | Required.pharmacist's documents Names



<details>
    <summary>
        Response
    </summary>

    state code = 200
    
      {
    "pharmacist":
        {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "dateOfBirth": "2023-11-12T22:29:43.016Z",
                "_id": "6551521a7c84fccc7d4886aa"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699828250281.bmp",
                "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699828250504.jpg",
                "Abdelrahman,s passport1699828250512.jpg"
            ],
            "__v": 0,
            "walletAmount": 69122
        },
        
}
    
</details>


###### Example Request

    DELETE /pharmacists/:id

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.pharmacist's id

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
      {
    "deletedPharmacist":
        {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "dateOfBirth": "2023-11-12T22:29:43.016Z",
                "_id": "6551521a7c84fccc7d4886aa"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699828250281.bmp",
                "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699828250504.jpg",
                "Abdelrahman,s passport1699828250512.jpg"
            ],
            "__v": 0,
            "walletAmount": 69122
        }
        
}
    
</details>

###### Example Request

    GET /pharmacists/:id/wallet

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.pharmacist's id

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {

    "walletAmount": 69122
        
    }
    
</details>

#### Pharmacist Requests Endpoints

###### Example Request

    GET /pharmacist-requests


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {
    "pharmacistRequests": []
    }
    
</details>

###### Example Request

    POST /add-pharmacist-req

| Body | Type | Descroption
| --- | --- | -----
| userId | String | Required.pharmacist's id
| email | String | Required.pharmacist's email
| password | String | Required.pharmacist's password
| userName | String | Required.pharmacist's user name
| type | String | Required.pharmacist is the type


<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "userId": "6551521a7c84fccc7d4886aa",
                "type": "phramcist"
            }
    }
    
</details>

###### Example Request

    GET pharmacist-requests/files/:fileName

| Parameter | Type | Descroption
| --- | --- | -----
| fileName | String | Required.pharmacist's document name



<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {
        'C:\Users\unKnown\Documents/text.pdf'
    }
    
</details>

###### Example Request

    GET pharmacist-requests/files/:fileName

| Parameter | Type | Descroption
| --- | --- | -----
| id | String | Required.pharmacist's id

| Query | Type | Descroption
| --- | --- | -----
| accept | Boolean | Required.flag acceptance of contract

<details>
    <summary>
        Response
    </summary>

    state code = 200
    
    {
        message: 'pharmacist request deleted',
        "deletedPharmacistRequest":
        {
            "_id": "655152517c84fccc7d4886b3",
            "userData": {
                "name": "pharmacist2",
                "userName": "pharmacist1",
                "email": "pharmacist@malek.com",
                "password": "$2b$10$uydmwg8sp8pKenRkBobi1.z./JwAfOl3kNgFhSkHvR3dk7pm0cTzK",
                "dateOfBirth": "2023-11-12T22:29:43.016Z",
                "_id": "6551521a7c84fccc7d4886aa"
            },
            "hourlyRate": 90,
            "affiliation": "sfg",
            "educationalBackground": "highsxhool",
            "documentsNames": [
                "41699828250281.bmp",
                "969c85ae-40a8-416e-8d0c-1f11ee3aec8f1699828250504.jpg",
                "Abdelrahman,s passport1699828250512.jpg"
            ],
            "__v": 0,
            "walletAmount": 69122
        }
    }
    
</details>

 
## Tests 

The testing is done using `jest`. To run the tests, run the following command.


```bash
> cd pharmacy && npm run test
```
 ![image 1](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/6981eb8d-0beb-4090-9e6c-b50f4d6b510f)

### Models tests
`Faker.js` is used to generate data to test different models 

There is tests done for the following models : `Admin` , `Pharmacist` ,`Cart` , `Medicine` ,`Request` , `Health Package` , `User Data`





## How to use
To run backend\
Note: You will need to run all services in the following repo [Clinic](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic.git)
#### pharmacy service
```bash
cd pharmacy && nodemon start
```
To run frontend
```bash
cd client && npm start
```
 All services and client will be running on the specified ports on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file for all services

<details>
    <summary>
        envs
    </summary>


`MONGO_URI`

`JWT_SECRETABLE_KEY`

`MONGO_URI_TEST` 
</details>





## Contributing
Contributions are always welcome!

### Getting Started

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch
5. Make your changes
6. Commit and push your changes
7. Create a pull request
8. Wait for your pull request to be reviewed and merged



## Credits
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)

- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Jest docs](https://jestjs.io/docs/getting-started)
- [Stripe docs](https://stripe.com/docs)

- [Clean code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)
- [RESTful Web API Patterns and Practices Cookbook](https://learning.oreilly.com/library/view/restful-web-api/9781098106737/)
- [Designing Data Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)


## License

#### Stripe License
This project uses Stripe to process payments. By using this project, you agree to be bound by the Stripe Services Agreement.

You can find the full text of the Stripe Services Agreement at the following link:

https://stripe.com/legal

Please make sure to read and understand the Stripe Services Agreement before using this project.

If you have any questions about the Stripe Services Agreement or how it applies to your use of this project, please contact Stripe at support@stripe.com.    