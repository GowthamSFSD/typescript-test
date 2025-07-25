import express from "express";
import user from "./user.routes";
import personalChef from "./personalChefRoutes";
const router = express.Router();

router.use("/user", user);
router.use("/personal-chef", personalChef);

export default router;
