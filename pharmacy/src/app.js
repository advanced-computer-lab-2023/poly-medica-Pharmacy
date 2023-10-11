import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PORT } from './utils/Constants.js'; 
import cors from 'cors';
import { pharmacist } from './api/PharmacistAPI.js';
import { medicine } from './api/MedicineAPI.js';
import { AdminAPI } from './api/AdminAPI.js';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { checkUser } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


const mongoURL = process.env.MONGO_URI || "mongodb://localhost:27017/pharmacy";

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
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:3001', 'http://localhost:3002'],
	credentials: true
}));

app.use('*', checkUser);
AdminAPI(app);
pharmacist(app);
medicine(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});