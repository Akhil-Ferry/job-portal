# Job Portal System Using MongoDB

## Overview
The Job Portal System is a web application designed to connect job seekers with employers. It leverages MongoDB as its core database to efficiently manage diverse and semi-structured data, such as job listings, candidate profiles, and applications. This system provides a flexible and scalable solution for modern job portals.

## Features
- **Job Listings**: Employers can create, update, and delete job postings with detailed information.
- **Candidate Profiles**: Job seekers can register, create profiles, and upload resumes.
- **Search Functionality**: Users can search for jobs and candidates using various filters.
- **Application Tracking**: Candidates can apply for jobs and track their application status.
- **Analytics Dashboard**: Provides insights into job postings and application trends.

## Technology Stack
- **Frontend**: React (with optional libraries like Tailwind or Bootstrap)
- **Backend**: Node.js (Express)
- **Database**: MongoDB

## Core Modules
1. **Job Management**
   - Create, read, update, and delete job postings.
   - Search jobs by title, location, skills, and salary range.

2. **Candidate Management**
   - Register and manage candidate profiles.
   - Search candidates by skills and experience.

3. **Application Management**
   - Apply for jobs and track application status.
   - Employers can view and filter applications.

4. **Authentication**
   - Separate login for employers and candidates.
   - Role-based access control.

5. **Data Analytics**
   - Generate insights on job postings and application trends using MongoDB's aggregation framework.

## Getting Started
### Prerequisites
- Node.js
- MongoDB
- A package manager (npm or yarn)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```
   cd backend
   npm start
   ```
2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.