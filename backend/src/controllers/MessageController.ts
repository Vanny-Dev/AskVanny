import { Request, Response } from 'express';
import Message from '../models/Message';
import User from '../models/User';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { recipient, content } = req.body;

    if (!recipient || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recipient and content are required' 
      });
    }

    if (content.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message content cannot be empty' 
      });
    }

    if (content.length > 500) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message too long (max 500 characters)' 
      });
    }

    // Check if recipient exists
    const user = await User.findOne({ username: recipient.toLowerCase() });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recipient not found' 
      });
    }

    // Get message count for this recipient to generate message number
    const messageCount = await Message.countDocuments({ 
      recipient: recipient.toLowerCase() 
    });

    const message = await Message.create({
      recipient: recipient.toLowerCase(),
      content: content.trim(),
      author: `Anonymous Message #${messageCount + 1}`,
      messageNumber: messageCount + 1,
      liked: false,
    });

    res.status(201).json({
      success: true,
      message: {
        _id: message._id,
        recipient: message.recipient,
        content: message.content,
        author: message.author,
        liked: message.liked,
        createdAt: message.createdAt,
      },
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const messages = await Message.find({ 
      recipient: username.toLowerCase() 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      messages: messages.map(msg => ({
        _id: msg._id,
        recipient: msg.recipient,
        content: msg.content,
        author: msg.author,
        liked: msg.liked,
        createdAt: msg.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const toggleLikeMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.liked = !message.liked;
    await message.save();

    res.json({
      success: true,
      message: {
        _id: message._id,
        recipient: message.recipient,
        content: message.content,
        author: message.author,
        liked: message.liked,
        createdAt: message.createdAt,
      },
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};