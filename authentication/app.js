import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { user } from './src/api/user.js';
import { PORT } from './src/utils/Constants.js';
import cors from 'cors'
import { checkUser } from './src/middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

const mongoURL = process.env.MONGO_URI || "mongodb://localhost:27017/pharmacy";
console.log(mongoURL);

const connect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to the database:", err); 
        process.exit(1); 
    }
};

await connect();
app.use('*', checkUser);
user(app);

const port = PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

