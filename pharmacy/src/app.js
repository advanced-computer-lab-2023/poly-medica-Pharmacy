import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PORT } from './utils/Constants.js';
import cors from 'cors';
// import the pharmacyapi 
import { pharmacist } from './api/PharmacistAPI.js';
import { medicine } from './api/MedicineAPI.js';

dotenv.config();
const app = express();

const mongoURL = process.env.MONGO_URI;

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
	origin: ["http://localhost:3000","http://localhost:3001", "http://localhost:3002"],
	credentials: true
}));

pharmacist(app);
medicine(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});