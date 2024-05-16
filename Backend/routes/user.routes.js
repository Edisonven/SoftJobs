import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/tokenMiddleware.js";

const router = Router();

router.post("/usuarios", userController.register);
router.post("/login", userController.login);
router.get("/usuarios", verifyToken, userController.checkUserToken);

export default router;
