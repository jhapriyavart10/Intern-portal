# Internship Portal

## Overview
The Internship Portal is a full-stack web application that allows users to view and post internship opportunities. It features separate views for employers and applicants, enabling them to interact with the platform effectively.

## Features
- **User Roles**: Distinct interfaces for employers and applicants.
- **Internship Listings**: Applicants can view and filter internships by location or role.
- **Application Process**: Applicants can submit applications for internships.
- **Posting Internships**: Employers can create and manage internship postings.
- **Dashboard**: Employers can view their postings and applications.
- **Sorting**: Internships can be sorted by the newest postings.

## Technologies Used
- **Frontend**: React, Vite
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS Modules / Styled Components

## Project Structure
```
internship-portal
├── client                # Frontend application
│   ├── public            # Public assets
│   ├── src               # Source code for the React app
│   └── package.json      # Client dependencies and scripts
├── server                # Backend application
│   ├── src               # Source code for the Express app
│   └── package.json      # Server dependencies and scripts
├── README.md             # Project documentation
└── docker-compose.yml     # Docker configuration
```

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- Docker (optional)

### Installation

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd internship-portal
   ```

2. **Setup the server**:
   - Navigate to the `server` directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on `.env.example` and configure your environment variables.
   - Start the server:
     ```
     npm start
     ```

3. **Setup the client**:
   - Navigate to the `client` directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the client:
     ```
     npm run dev
     ```

### Running with Docker
- To run the application using Docker, execute:
  ```
  docker-compose up
  ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.