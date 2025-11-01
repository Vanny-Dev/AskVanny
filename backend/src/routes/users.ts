import express from 'express';
import { createUser, getUser } from '../controllers/UserController';

const router = express.Router();

router.post('/create', createUser);
router.get('/:username', getUser);

export default router;
