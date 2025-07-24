"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = void 0;
const application_model_1 = require("../models/application.model");
const job_model_1 = require("../models/job.model");
const appError_1 = require("../utils/appError");
const createApplication = async (applicationData) => {
    const job = await job_model_1.JobModel.findById(applicationData.jobId);
    if (!job)
        throw new appError_1.NotFoundError('Job');
    const newApplication = new application_model_1.ApplicationModel(applicationData);
    return newApplication.save();
};
exports.createApplication = createApplication;
//# sourceMappingURL=applicationService.js.map