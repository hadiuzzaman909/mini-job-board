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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJobById = exports.getJobs = void 0;
const jobService = __importStar(require("../services/jobService"));
const catchAsync_1 = require("../utils/catchAsync");
exports.getJobs = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log('Api is hitted');
    const jobs = await jobService.getJobs();
    res.json(jobs);
});
exports.getJobById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    res.json(job);
});
exports.createJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    console.log('Api is hitted');
    const newJob = await jobService.createJob(req.body);
    res.status(201).json(newJob);
});
exports.updateJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const updatedJob = await jobService.updateJob(req.params.id, req.body);
    res.json(updatedJob);
});
exports.deleteJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const response = await jobService.deleteJob(req.params.id);
    res.json(response);
});
//# sourceMappingURL=jobController.js.map