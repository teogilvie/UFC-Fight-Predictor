import express from "express";
import { getPrediction } from "../controllers/predictionController.js";

const router = express.Router();

router.route("/").get(getPrediction);

export default router;
