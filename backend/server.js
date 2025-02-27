import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';
import adRoutes from './routes/adRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(fileUpload({
  useTempFiles: true,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier (5 Mo)
}));

app.use('/articles', articleRoutes);
app.use('/ads' , adRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));