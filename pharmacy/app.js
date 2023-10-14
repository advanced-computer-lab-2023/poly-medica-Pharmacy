import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PORT } from './src/utils/Constants.js';
import cors from 'cors';
import { pharmacist } from './src/api/PharmacistAPI.js';
import { pharmacistRequests } from './src/api/PharmacistRequestsAPI.js';
import { medicine } from './src/api/MedicineAPI.js';
import { admin } from './src/api/AdminAPI.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { checkUser } from './src/middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoURL = process.env.MONGO_URI || 'mongodb://localhost:27017/pharmacy';

const connect = async () => {
	try {
		await mongoose.connect(mongoURL);
		console.log('Database connected');
	} catch (err) {
		console.error('Error connecting to the database:', err);
	}
};

await connect();

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
pharmacist(app);
pharmacistRequests(app);
medicine(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});