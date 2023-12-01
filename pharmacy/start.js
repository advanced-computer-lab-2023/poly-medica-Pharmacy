import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { PORT } from './src/utils/Constants.js';
import { scheduleTasks } from './src/utils/SchudulerTasks.js';

dotenv.config();


const mongoURL = process.env.MONGO_URI;
console.log(mongoURL);

const connect = async () => {
	try {
		await mongoose.connect(mongoURL);
		console.log('Database connected', mongoURL);
		await scheduleTasks();
	} catch (err) {
		console.error('Error connecting to the database:', err.message);
	}
};

await connect();


const port = process.env.PORT || PORT;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
