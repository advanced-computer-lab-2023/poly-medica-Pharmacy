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
import dotenv from 'dotenv';
import { checkUser } from './src/middleware/authMiddleware.js';
import { medicineProducer } from './src/producers/MedicineProducer.js';
import swaggerUi from 'swagger-ui-express';
import { default as swaggerFile } from './src/swagger/swagger.json' assert { type: 'json' };

const app = express();

dotenv.config();
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

admin(app);
cart(app);
pharmacist(app);
pharmacistRequests(app);
medicine(app);
medicineProducer(app);

export default app;
