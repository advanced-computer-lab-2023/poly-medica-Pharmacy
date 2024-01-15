# Poly Medica Pharmacy  

This repository is a service integrated with [The Poly Medica Clinic](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic) system.  


### Build Status

[![Frontend CI](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/client-ci.js.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/client-ci.js.yml)

[![Pharmacy CI](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/pharmacy-microservice-ci.yml/badge.svg)](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/actions/workflows/pharmacy-microservice-ci.yml)

### Planned Features

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
<summary>Patient Viewing Medicines</summary>

![medicines](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/513a501b-4e43-4918-a7ca-795976fd4848)

</details>

<details>
<summary>Patient Viewing Cart</summary>

 ![cart](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/29cd8cab-7db6-4e7a-8922-154c7c1a5777)
 
</details>

<details>
<summary>Pateint Chatting With Pharmacy</summary>

![payment using card](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/7e7c3c66-a4b6-4bd2-ae6d-1ac1d3bee255)

</details>

<details>
<summary> Patient Viewing Order </summary>
	
 ![orders](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/7764d06e-74bd-4dcf-b3f9-fb815b41f155)

</details>

<details>

<summary> Admin Viewing Sales Report </summary>

 ![report](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/9566f3a1-75ab-4239-81bd-7439523f3653)

</details>

<details>
<summary> Pharmacist Receving Notification </summary>

![notification](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/c2638a98-4c46-4a35-8c3e-e63719a5b438)

 
</details>


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

```bash
> git clone https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy.git
> cd poly-medica-pharmacy
> cd pharmacy && npm i && cd..
> cd client && npm i 
```



 ## API Documentation

The API documentation is created using Swagger. To access it, follow these steps:

1. Ensure the service is running.
2. Open your browser and navigate to `localhost:SERVICE_PORT/api-docs`.

![swagger-pharmacy](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/102627389/6bbf9f77-6d7d-49b0-b969-c0adee93e1d3)


---
 
## Tests 

The testing is done using `jest`. To run the tests, run the following command.


```bash
> cd pharmacy && npm run test
```
 ![image 1](https://github.com/advanced-computer-lab-2023/poly-medica-Pharmacy/assets/101880627/6981eb8d-0beb-4090-9e6c-b50f4d6b510f)

### Models tests
`Faker.js` is used to generate data to test different models 

There is tests done for the following models : `Admin` , `Pharmacist` ,`Cart` , `Medicine` ,`Request` , `Health Package` , `User Data`


---


## How to use
Note: You will need to run all services in the following repo [Clinic](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic.git)  
<br/>
To run backend  
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
       Pharmacy envs
    </summary>


`MONGO_URI`

`PORT`

`MONGO_URI_TEST` 
</details>



--- 

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

--- 

## Credits
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)

- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Jest docs](https://jestjs.io/docs/getting-started)
- [Stripe docs](https://stripe.com/docs)


## License

This project is open source following [MIT License](https://opensource.org/license/mit/).  
---


### Contributers: 
- [Mohamed Khaled](https://github.com/Mohamed-Khaled308)
- [Amir Tarek](https://github.com/amir-awad)
- [Malek Mohamed](https://github.com/malekelkssas)
- [Ahmad Hoseiny](https://github.com/AhmadHoseiny)
- [Mohamed Hassan](https://github.com/mohamedhassans)
- [Abdelrahman Amr](https://github.com/Aelmeky)
- [Yehia Mohamed](https://github.com/YehiaFarghaly)
