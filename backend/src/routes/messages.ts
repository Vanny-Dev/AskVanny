import express from 'express';
import { createMessage, getMessages, toggleLikeMessage } from '../controllers/MessageController';

const router = express.Router();

router.post('/create', createMessage);
router.get('/:username', getMessages);
router.patch('/:messageId/like', toggleLikeMessage);

export default router;