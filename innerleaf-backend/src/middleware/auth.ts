import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// In a real application, store this in an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'innerleaf_secret_key';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    // Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user ID to request object
    (req as any).userId = decoded.userId;
    next();
    return;
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
  // This line should never be reached, but TypeScript needs it for type safety
  return res.status(500).json({ message: 'Internal server error' });
};