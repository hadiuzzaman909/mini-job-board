import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Job Board API',
        version: '1.0.0',
        description: 'API documentation for the Job Portal',
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' 
            ? 'https://mini-job-board-oqvc.onrender.com' 
            : 'http://localhost:5000',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Job: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: 'Job title',
                    },
                    company: {
                        type: 'string',
                        description: 'Company name',
                    },
                    location: {
                        type: 'object',
                        properties: {
                            city: { type: 'string' },
                            state: { type: 'string' },
                            country: { type: 'string' },
                            zipCode: { type: 'string' },  
                        },
                    },
                    description: {
                        type: 'string',
                        description: 'Job description',
                    },
                    salary: {
                        type: 'object',
                        properties: {
                            min: { type: 'number' },
                            max: { type: 'number' },
                            currency: { type: 'string' },
                        },
                    },
                    jobType: {
                        type: 'string',
                        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
                    },
                    requirements: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'List of job requirements',
                    },
                    benefits: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'List of job benefits',
                    },
                    applicationDeadline: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Job application deadline',
                    },
                    jobStatus: {
                        type: 'string',
                        enum: ['Active', 'Closed', 'On Hold'],
                        default: 'Active',
                    },
                    postedBy: {
                        type: 'string',  
                        description: 'ID of the user who posted the job',
                    },
                },
            },
            Application: {
                type: 'object',
                properties: {
                    jobId: {
                        type: 'string',
                        description: 'Job ID',
                    },
                    name: {
                        type: 'string',
                        description: 'Applicant name',
                    },
                    email: {
                        type: 'string',
                        description: 'Applicant email',
                    },
                    cvLink: {
                        type: 'string',
                        description: 'Link to applicant\'s CV',
                    },
                    phoneNumber: {
                        type: 'string',
                        description: 'Applicant phone number',
                    },
                    coverLetter: {
                        type: 'string',
                        description: 'Cover letter of the applicant',
                    },
                    applicantAddress: {
                        type: 'object',
                        properties: {
                            street: { type: 'string' },
                            city: { type: 'string' },
                            country: { type: 'string' },
                        },
                        description: 'Applicant address',
                    },
                    applicationStatus: {
                        type: 'string',
                        enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'],
                        default: 'Pending',
                    },
                },
            },
        },
    },
    security: [
        {
            BearerAuth: [],  
        },
    ],
};


const swaggerOptions = {
    swaggerDefinition,
    apis: [
        process.env.NODE_ENV === 'production' 
            ? './dist/routes/*.js'  
            : './src/routes/*.ts',  
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: any) => {
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
