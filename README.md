# Code Execution Environment Using Python FastAPI & Next.js

This repository contains a code execution environment using Python FastAPI and MySQL for the backend and Next.js for the frontend. The backend is containerized using Docker, while the frontend can be run with npm.

## Getting Started

Follow the instructions below to clone the repository and run the application.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <your-repository-directory>

2. **Navigate to the backend directory and build the Docker container**
    ```bash
    cd python-fastapi
    docker-compose up --build
    
3. **Navigate to the frontend directory and start the Next.js development server**
    ```bash
    cd next-frontend
    npm install
    npm run dev

### Stopping the Application

    cd python-fastapi
    docker-compose down
