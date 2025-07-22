import express from 'express';
import * as applicationController from '../controllers/applicationController';

const router = express.Router();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Submit an application for a job
 *     description: Allows a user to submit an application for a job
 *     tags:
 *       - Applications  # This will group the route under "Applications" in Swagger UI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: string
 *                 example: 60d4e41f36c7294a5c4ef6d1
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               cvLink:
 *                 type: string
 *                 example: https://example.com/cv-johndoe.pdf
 *               phoneNumber:
 *                 type: string
 *                 example: +123456789
 *               coverLetter:
 *                 type: string
 *                 example: I am interested in this job because...
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Internal server error
 */
router.post('/', applicationController.createApplication); 

export default router;