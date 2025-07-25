import express from "express";
import { makeFoodController } from "../../controllers/personalchef.controller";

const router = express.Router();

router.get("/make-food", makeFoodController);

export default router;
