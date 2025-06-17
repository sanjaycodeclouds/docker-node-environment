# Use official Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy only package files to install dependencies first (for caching)
COPY package*.json ./

# These commands do not install packages on your team members’ local machines. Instead:
#	•	They run inside the Docker image at build time
#	•	The resulting image has all packages preinstalled
#	•	When your team runs the container, everything is already set up

# Install all dependencies from package.json (express, mongoose, etc.)
RUN npm install

# Install nodemon globally, so the server auto-restarts on changes (can be skipped in prod)
RUN npm install -g nodemon

# Copy the rest of the application
COPY . .

# Expose the app port
EXPOSE 3000

# Default command to run the app with auto-reload
CMD ["nodemon", "app.js"]