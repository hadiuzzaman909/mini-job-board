import express from 'express';
import { login } from '../controllers/authController';  

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Admin login to get a JWT token
 *     description: Authenticates the admin user and returns a JWT token for further requests.
 *     tags:
 *       - Auth  # This ensures the route appears under "Auth" in Swagger UI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: jwt-token-string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);  

export default router;