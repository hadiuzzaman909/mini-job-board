import express from 'express';
import * as applicationController from '../controllers/applicationController'; 

const router = express.Router();

router.post('/', applicationController.createApplication);  

export default router;
