import express from 'express';
import cors from 'cors';
import { pharmacist } from './src/api/PharmacistAPI.js';
import { pharmacistRequests } from './src/api/PharmacistRequestsAPI.js';
import { medicine } from './src/api/MedicineAPI.js';
import { admin } from './src/api/AdminAPI.js';
import { cart } from './src/api/CartAPI.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { checkUser } from './src/middleware/authMiddleware.js';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'http://localhost:3002',
		],
		credentials: true,
	}),
);

app.use('*', checkUser);
admin(app);
cart(app);
pharmacist(app);
pharmacistRequests(app);
medicine(app);

export default app;
