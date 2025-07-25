##Overview

Mini Job Board is a full-stack web application built to help companies post jobs and allow users to apply for them. The application includes a public-facing frontend that displays job listings and a backend API to manage jobs and applications.

#Frontend
Frontend URL: https://mini-job-board-6zro.vercel.app/

Built using Next.js, this application provides an intuitive UI to display job listings, show detailed job descriptions, and allow users to apply for jobs.

#Backend
Backend API URL: https://job-portal-63en.onrender.com/api-docs/

Built using Node.js with Express, this API exposes routes for fetching job listings, fetching job details, submitting applications, and adding new jobs (admin-only functionality with authentication).

##Features
Frontend:
Homepage: Displays all jobs with job title, company, location, and a link to the job details page.

Job Details Page: Displays the full description of a job.

Apply Page: A form allowing users to submit applications, which includes their name, email, and CV link or short text.

Success Message: After a successful application submission, a confirmation message is displayed.

Backend API:
GET /jobs: Fetch all job listings.

GET /jobs/:id: Fetch a single job's details by ID.

POST /applications: Submit a job application with name, email, and CV link/short text.

POST /jobs: Admin-only endpoint to add a new job. This requires authentication.

Authentication:
Admin Authentication: Basic authentication or JWT is used for the POST /jobs endpoint. Only an admin can add new jobs.

##Technologies Used
Frontend:
Next.js (for a faster, SSR-friendly application)

Backend:
Node.js (Express framework)

MongoDB (or any other database of your choice like SQLite, JSON)

Deployment:
Frontend: Deployed on Vercel

Backend: Deployed on Render 

##Getting Started
Prerequisites
Node.js installed on your machine.

npm or yarn for managing packages.

Steps to run locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/hadiuzzaman909/mini-job-board.git
cd mini-job-board

Install backend dependencies:
cd backend
npm install

Install frontend dependencies:

cd frontend
npm install

Set up environment variables:

For backend, create a .env file and add necessary environment variables such as DB_URI, PORT, etc.

For frontend, ensure all API calls are properly linked to your deployed backend.

Start the backend:
npm run dev

Start the frontend:
npm start

#Backend Dependencies:
Here are the dependencies installed for the Backend:

express: Web framework for building the API.

dotenv: To manage environment variables.

cors: Middleware to enable CORS (Cross-Origin Resource Sharing).

jsonwebtoken: To handle JSON Web Tokens for authentication.

mongoose: MongoDB object modeling for Node.js.

winston: Logger for logging events.

swagger-jsdoc: Swagger integration for API documentation.


#Frontend Dependencies:
Here are the Frontend dependencies:

next: Next.js framework for building SSR and static web applications.

axios: Promise-based HTTP client for making API requests.


##Testing
The backend includes unit tests for job listings and applications. You can run tests using Jest:
npm run test

##Troubleshooting
No node_modules directory: Run npm install to resolve this.

Build failed due to missing environment variables: Make sure all environment variables are set correctly in .env.