"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./config/logger"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_1 = __importDefault(require("./config/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}` : '', // Vercel URL
        'https://mini-job-board-oqvc.onrender.com'
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
(0, db_1.default)();
(0, swagger_1.default)(app);
app.use('/auth', authRoutes_1.default);
app.use('/jobs', jobRoutes_1.default);
app.use('/applications', applicationRoutes_1.default);
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Job Board API!',
        documentation: `Visit ${process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}/api-docs` : 'http://localhost:5000/api-docs'} for API documentation`,
        endpoints: {
            auth: '/auth',
            jobs: '/jobs',
            applications: '/applications',
        },
    });
});
app.use(errorHandler_1.errorHandler);
const PORT = parseInt(process.env.PORT || '5000');
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map