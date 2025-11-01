import { Request, Response } from 'express';
import User from '../models/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username || username.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username is required' 
      });
    }

    // Only find user by loginUsername if it exists, otherwise use username
    const user = await User.findOne({ 
      $or: [
        { loginUsername: username.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found. Please create an account first.' 
      });
    }

    // Return user data for client-side storage
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
      },
      redirectUrl: `/dashboard/${user.username}` // URL to redirect to
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found',
        shouldRedirect: true,
        redirectUrl: '/login'
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};