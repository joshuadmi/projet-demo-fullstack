# CRUD Backend avec Cloudinary

## Prérequis
- Node.js installé
- MongoDB installé et en cours d'exécution
- Compte Cloudinary pour stocker les images

## Installation
```sh
npm install express mongoose dotenv cors helmet express-fileupload cloudinary
```

## Configuration de l'environnement
Créer un fichier `.env` et y ajouter :
```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

## Structure du projet
```
backend/
├── config/
│   ├── db.js
├── controllers/
│   ├── articleController.js
├── models/
│   ├── Article.js
├── routes/
│   ├── articleRoutes.js
├── middleware/
│   ├── uploadMiddleware.js
├── server.js
├── .env
├── package.json
```

## Configuration de la base de données
```js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export default connectDB;
```

## Configuration de Cloudinary
```js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;
```

## Middleware d'upload
```js
import cloudinary from '../config/cloudinary.js';
export const uploadImage = async (file) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  return result.secure_url;
};
```

## Modèle Mongoose
```js
import mongoose from 'mongoose';
const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Article', ArticleSchema);
```

## Contrôleur CRUD
```js
import Article from '../models/Article.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';

export const createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = await uploadImage(req.files.image);
    const newArticle = new Article({ title, description, imageUrl });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};
```

## Démarrage du serveur
```js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(fileUpload({ useTempFiles: true }));

app.use('/articles', articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Routes CRUD
```js
import express from 'express';
import { createArticle } from '../controllers/articleController.js';
const router = express.Router();
router.post('/', createArticle);
export default router;
```

