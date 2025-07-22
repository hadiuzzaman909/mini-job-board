import jwt from 'jsonwebtoken';

const verifyJWT = (req: any, res: any, next: any) => {
    const token = req.headers['x-auth-token'] || req.headers['authorization']?.split(' ')[1];  

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); 
        req.user = decoded; 
        next();  
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyJWT;