import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken, checkRoutes } from "../middleware/tokenMiddleware.js";

const router = Router();

router.post("/usuarios", checkRoutes, userController.register);
router.post("/login", checkRoutes, userController.login);
router.get("/usuarios", verifyToken, userController.checkUserToken);

export default router;
