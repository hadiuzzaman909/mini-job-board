"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const job_model_1 = require("../models/job.model");
const appError_1 = require("../utils/appError");
const createJob = async (jobData) => {
    const newJob = new job_model_1.JobModel(jobData);
    return newJob.save();
};
exports.createJob = createJob;
const getJobs = async () => {
    return job_model_1.JobModel.find().sort({ createdAt: -1 });
};
exports.getJobs = getJobs;
const getJobById = async (jobId) => {
    const job = await job_model_1.JobModel.findById(jobId);
    if (!job)
        throw new appError_1.NotFoundError('Job');
    return job;
};
exports.getJobById = getJobById;
const updateJob = async (jobId, jobData) => {
    const updatedJob = await job_model_1.JobModel.findByIdAndUpdate(jobId, jobData, {
        new: true,
        runValidators: true
    });
    if (!updatedJob)
        throw new appError_1.NotFoundError('Job');
    return updatedJob;
};
exports.updateJob = updateJob;
const deleteJob = async (jobId) => {
    const deletedJob = await job_model_1.JobModel.findByIdAndDelete(jobId);
    if (!deletedJob)
        throw new appError_1.NotFoundError('Job');
    return { message: 'Job deleted successfully' };
};
exports.deleteJob = deleteJob;
//# sourceMappingURL=jobService.js.map