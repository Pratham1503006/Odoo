import { authOperations } from '../DataBase_Client/skillSwapDB.js';

// Middleware to verify Supabase JWT token
export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access token required' 
            });
        }

        const token = authHeader.substring(7);
        
        // Verify token with Supabase
        const user = await authOperations.getUser(token);
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }

        // Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
};

// Optional middleware - doesn't fail if no token provided
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const user = await authOperations.getUser(token);
            req.user = user;
        }
        
        next();

    } catch (error) {
        // Don't fail for optional auth, just continue without user
        next();
    }
};

// Middleware to check if user owns the resource
export const checkResourceOwnership = (resourceIdParam = 'userId') => {
    return (req, res, next) => {
        const resourceId = req.params[resourceIdParam];
        
        if (!req.user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        if (req.user.id !== resourceId) {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. You can only access your own resources.' 
            });
        }

        next();
    };
};
