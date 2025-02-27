import Ad from "../models/Ad.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

export const createAd = async (req, res) => {
  try {
    const { title, prix, description, ville } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Champs requis: titre",
      });
    }

    if (!req.files || !req.files.image) {
      res.status(400).json({ message: "Photo obligatoire" });
    }
    const imageUrl = await uploadImage(req.files.image);

    const newAd = new Ad({
      title,
      imageUrl,
      prix,
      description,
      ville
    
    });

    await newAd.save();

    res.status(201).json(newAd);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la création de l'annonce",
        error: error.message,
      });
  }
};
