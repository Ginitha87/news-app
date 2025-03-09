# Frontend Application with Docker

This project is containerized using Docker to ensure consistent development and deployment environments.

## Prerequisites

- Docker installed on your system

## Docker Setup and Running the Application

1. Clone the repository:
   git clone https://github.com/Ginitha87/news-app.git
   cd news-app
2. Build the Docker image:
   docker build -t react-newsapp .
3. Run the Docker container:
   docker run -p 8080:8080 react-newsapp
4. Access the application at `http://localhost:3000` in your web browser.
