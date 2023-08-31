import express from "express";
import {
  getAllFighters,
  addFighter,
  getFighter,
  checkID,
} from "../controllers/fighterController.js";

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllFighters).post(addFighter);

router.route("/:id").get(getFighter);

export default router;
