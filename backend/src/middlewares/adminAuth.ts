import jwt from 'jsonwebtoken';

const adminAuth = (req: any, res: any, next: any) => {
    const adminUsername = 'admin@gmail.com';  
    const adminPassword = 'Admin@123';  

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No credentials provided' });
    }

    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString('utf-8')
        .split(':');

    if (username !== adminUsername || password !== adminPassword) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = jwt.sign(
        { username: adminUsername, role: 'admin' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    res.setHeader('x-auth-token', token);

    next(); 
};

export default adminAuth;

