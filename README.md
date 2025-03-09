# Frontend Application with Docker

This project is containerized using Docker to ensure consistent development and deployment environments. Docker eliminates environment-related issues and makes it easy to run the application across different systems.

## Prerequisites

- Docker installed on your system ([Download Docker](https://www.docker.com/get-started))
- Basic understanding of Docker commands

## Docker Setup and Running the Application

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Ginitha87/news-app.git
   cd news-app
   ```

2. **Build the Docker image:**
   ```sh
   docker build -t news-app .
   ```
   - This command builds a Docker image named `newsapp` using the `Dockerfile` in the project directory.
3. **Run the Docker container:**
   ```sh
   docker run -p 8080:8080 --name newsapp-container news-app
   ```
   - The `-p 8080:8080` flag maps port 8080 in the container to port 8080 on your host machine.
   - The `--name newsapp-container` assigns a name to the running container.
4. **Verify the application is running:**
   - Open a browser and go to `http://localhost:8080`
