# Step 1: Build Stage
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app using Webpack
RUN npm run build


# Expose port 80
EXPOSE 8080

# Start Nginx
CMD ["npm","run","start"]
