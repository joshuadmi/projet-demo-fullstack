import express from "express";
import {
  createArticle,
  deleteArticleById,
  getArticleById,
  getArticles,
  updateArticleById,
} from "../controllers/articleController.js";

const router = express.Router();

//Route pour la création de l'article
router.post("/add", createArticle);

router.get("/all", getArticles);

router.get("/:id", getArticleById);

router.delete("/:id", deleteArticleById);


router.put('/:id', updateArticleById);

export default router;
