import express from "express";

import { createAd } from "../controllers/adController.js";

const router = express.Router();

router.post = ('/ajouter', createAd);


export default router;