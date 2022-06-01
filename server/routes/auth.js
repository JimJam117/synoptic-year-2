import Router from 'express';
import { login, logout, register } from "../controllers/authController.js";

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

export default router;