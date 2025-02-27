import Article from "../models/Article.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

export const createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Vérification des champs requis
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Le titre et la description sont requis." });
    }

    // Vérifier si une image est envoyée
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ message: "Une image est requise pour cet article." });
    }

    // Upload de l'image
    const imageUrl = await uploadImage(req.files.image);

    // Création du nouvel article
    const newArticle = new Article({ 
      title, description, imageUrl 
    });

    // Sauvegarde dans la base de données
    await newArticle.save();

    // Retourner l'article créé
    res.status(201).json(newArticle);
  } catch (error) {
    // Gestion des erreurs détaillées
    res.status(500).json({
      message: "Erreur lors de la création de l'article",
      error: error.message,
    });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur 500 pour récupérer les articles" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(400).json({ message: "Artice non trouvé " });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur 500 pour récupérer un article" });
  }
};

export const deleteArticleById = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(400).json({ message: "Artice non trouvé " });
    }
    res.json({ message: " Article supprimé! " });
  } catch (error) {
    res.status(500).json({ message: "Erreur 500 pour deleter un article" });
  }
};

export const updateArticleById = async (req, res) => {
  try {
    const updateArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateArticle) {
      return res.status(400).json({ message: "Article non trouvé " });
    }
    res.json({ message: " Article mis à jour !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur 500 pour mettre l'article à jour" });
  }
};
