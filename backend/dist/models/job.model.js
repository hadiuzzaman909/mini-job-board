"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const LocationSchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String }
}, { _id: false });
const SalarySchema = new mongoose_1.Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
}, { _id: false });
const JobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: LocationSchema, required: true },
    description: { type: String, required: true },
    salary: { type: SalarySchema, required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
    requirements: { type: [String], required: true, validate: [(arr) => arr.length > 0, 'At least one requirement is required'] },
    benefits: { type: [String] },
    applicationDeadline: { type: Date, required: true },
    jobStatus: { type: String, enum: ['Active', 'Closed', 'On Hold'], default: 'Active' },
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});
JobSchema.index({ company: 1, jobStatus: 1 });
JobSchema.index({ applicationDeadline: 1 });
exports.JobModel = (0, mongoose_1.model)('Job', JobSchema);
//# sourceMappingURL=job.model.js.map