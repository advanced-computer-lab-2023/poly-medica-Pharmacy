import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { PORT } from './src/utils/Constants.js';
import { pharmacist } from './src/api/PharmacistAPI.js';
import { medicine } from './src/api/MedicineAPI.js';
import { admin } from './src/api/AdminAPI.js';

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

admin(app);
pharmacist(app);
medicine(app);

const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
