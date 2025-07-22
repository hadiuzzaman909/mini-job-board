import express from 'express';
import * as jobController from '../controllers/jobController';  
import adminAuth from '../middlewares/adminAuth';  
import verifyJWT from '../middlewares/verifyJWT';  

const router = express.Router();

router.get('/', jobController.getJobs);            
router.get('/:id', jobController.getJobById);      

router.post('/', adminAuth, verifyJWT, jobController.createJob);    
router.put('/:id', adminAuth, verifyJWT, jobController.updateJob);   
router.delete('/:id', adminAuth, verifyJWT, jobController.deleteJob); 

export default router;
