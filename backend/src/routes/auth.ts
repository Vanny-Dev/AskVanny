import express from 'express';
import { login, verifyUser } from '../controllers/AuthController';

const router = express.Router();

// Login route - returns redirect URL
router.post('/login', login);

// Verify user route - for checking if logged in user is valid
router.get('/verify/:username', verifyUser);

export default router;