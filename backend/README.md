# Job Portal System Backend

This document provides an overview of the backend implementation for the Job Portal System, which utilizes MongoDB as its database.

## Project Structure

The backend is organized into the following directories:

- **src**: Contains the main application code.
  - **controllers**: Contains the logic for handling requests and responses.
    - `authController.js`: Manages user authentication (login and registration).
    - `jobController.js`: Handles job-related operations (CRUD).
    - `candidateController.js`: Manages candidate profiles and resumes.
    - `applicationController.js`: Handles job applications and tracking.
  - **models**: Defines the data models for MongoDB.
    - `Job.js`: Schema for job postings.
    - `Candidate.js`: Schema for candidate profiles.
    - `Employer.js`: Schema for employer details.
    - `Application.js`: Schema linking candidates to job postings.
  - **routes**: Defines the API endpoints.
    - `authRoutes.js`: Routes for authentication.
    - `jobRoutes.js`: Routes for job operations.
    - `candidateRoutes.js`: Routes for candidate operations.
    - `applicationRoutes.js`: Routes for application operations.
  - **middlewares**: Contains middleware functions for authentication.
    - `authMiddleware.js`: Validates user authentication and authorization.
  - **utils**: Contains utility functions.
    - `db.js`: Database connection logic.
  - `app.js`: Main entry point for the backend application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd job-portal-system/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run:
```
npm start
```

The server will be running on `http://localhost:5000` by default.

## API Endpoints

The backend exposes the following API endpoints:

- **Authentication**
  - `POST /api/auth/login`: Login for candidates and employers.
  - `POST /api/auth/register`: Register new candidates or employers.

- **Jobs**
  - `GET /api/jobs`: Retrieve all job postings.
  - `POST /api/jobs`: Create a new job posting.
  - `PUT /api/jobs/:id`: Update an existing job posting.
  - `DELETE /api/jobs/:id`: Delete a job posting.

- **Candidates**
  - `GET /api/candidates`: Retrieve all candidate profiles.
  - `POST /api/candidates`: Create a new candidate profile.
  - `PUT /api/candidates/:id`: Update an existing candidate profile.

- **Applications**
  - `GET /api/applications`: Retrieve all applications.
  - `POST /api/applications`: Apply for a job.
  - `GET /api/applications/:id`: Track application status.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.