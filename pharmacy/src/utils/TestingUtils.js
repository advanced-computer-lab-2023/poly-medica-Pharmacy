const { producer } = require('../producers/MedicineProducer.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDBTest = async () => {
	try {
		const mongoURL = process.env.MONGO_URI_TEST;
		await mongoose.connect(mongoURL);
		await mongoose.connection.db.dropDatabase();
	} catch (err) {
		console.error('Error connecting to the database:', err.message);
	}
};

const disconnectDBTest = async () => {
	try {
		producer.close();
		await mongoose.connection.db.dropDatabase();
		await mongoose.disconnect();
	} catch (err) {
		console.error('Error connecting to the database:', err.message);
	}
};

export { connectDBTest, disconnectDBTest };
