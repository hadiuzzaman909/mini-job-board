"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController = __importStar(require("../controllers/jobController"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const router = express_1.default.Router();
/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     description: Returns a list of all jobs
 *     tags:
 *       - Jobs  # This will group the route under "Jobs" in Swagger UI
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 */
router.get('/', jobController.getJobs);
/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a specific job by ID
 *     description: Returns a single job by its ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A job object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', jobController.getJobById);
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     description: Allows an admin to create a new job.
 *     tags:
 *       - Jobs
 *     security:
 *       - BearerAuth: []  # Specify that this endpoint requires Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       403:
 *         description: Unauthorized (no token provided or invalid token)
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyJWT_1.default, jobController.createJob);
/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job
 *     description: Allows an admin to update a job by its ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyJWT_1.default, jobController.updateJob);
/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     description: Allows an admin to delete a job by its ID
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyJWT_1.default, jobController.deleteJob);
exports.default = router;
//# sourceMappingURL=jobRoutes.js.map