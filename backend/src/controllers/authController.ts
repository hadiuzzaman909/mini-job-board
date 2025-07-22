import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const adminUsername = 'admin@gmail.com';
const adminPassword = 'Admin@123';

export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;

   
    if (username === adminUsername && password === adminPassword) {

        const token = jwt.sign(
            { username, role: 'admin' },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }  
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
