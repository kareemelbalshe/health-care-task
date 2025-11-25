import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
// import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import visitRoutes from './routes/visit.js';
import financeRoutes from './routes/finance.js';
import medicineRoutes from './routes/medicine.js';
import { errorHandler, notFound } from './middleware/error.js';
import { connectDB } from './config/connectToDB.js';
import hpp from "hpp";
import helmet from "helmet";
import rateLimiting from "express-rate-limit";
import safeXssClean from './middleware/safeXssClean.js';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use(helmet());

app.use(hpp());

app.use(safeXssClean);

app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200,
  })
);

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/patient', patientRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/visit', visitRoutes);
app.use('/api/v1/finance', financeRoutes);
app.use('/api/v1/medicine', medicineRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
  await connectDB();
});