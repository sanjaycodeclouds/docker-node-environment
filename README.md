# docker-node-environment

A fully Dockerized Node.js development environment using Express, Mongoose, and other essential packages. Includes CI/CD integration using GitHub Actions to automatically build and push Docker images to Docker Hub.

### Step 1: 📁 Project Structure
<pre>
├── app.js
├── connection.js
├── package.json
├── .env
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/docker-node-environment-deploy.yml
</pre>

### Step 2: 🔧 Install Dependencies
```bash
npm install --save express body-parser mongoose cors dotenv
npm install --save-dev nodemon
```

### Step 3: 🛠️ Configure Environment
#####   Setup .env file
```bash
PORT=3000
MONDOGB_URL=mongodb+srv://admin:<password>@cluster0.b4laov4.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0
```

### Step 4: 🌐 MongoDB Connection
#####   Setup connection.js file for MongoDB connect
```bash
const mongoose = require("mongoose")
function connectToMongoDB(url) {
    return mongoose.connect(url)
}
module.exports = {
    connectToMongoDB,
}
```

### Step 5: 🚀 Main App File (app.js)
#####   Setup app.js file
```bash
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// Setup constants
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || "MONGODB_URL"

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded())

// Connect with MongoDB
const { connectToMongoDB } = require("./connection")

connectToMongoDB(MONGODB_URL)
    .then(() => {
        console.log(`MongoDB connected successfully.`);
    })
    .catch((err) => {
        console.log(`Error in MongoDB connection.`, err.message)
    })

// Routes
app.get("/", (req, res) => {
  res.send(`Node.js Docker Environment Ready!`);
});

// Server Connection
app.listen(PORT, () => { console.log(`Server started at port: ${PORT}`);})
```

### Step 6: 🐳 Dockerfile
#####   Setup "Dockerfile"
#####   This file include all the necessary dependencies to run the container
```bash
# Use official Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy only package files to install dependencies first (for caching)
COPY package*.json ./

# These commands do not install packages on your team members’ local machines. Instead:
#  • They run inside the Docker image at build time
#  • The resulting image has all packages preinstalled
#  • When your team runs the container, everything is already set up

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
```

### Step 7: ⚙️ Docker Compose (Optional)
#####   Setup docker-node-environment-deploy.yml
<pre>
This file is not necessary but it includes some features like:
  • This will overcome to build the docker everytime
  • Share setup with your team
  • Running multiple services (like Node.js + MongoDB)
  • Want to simplify your Docker commands
</pre>
```bash
name: Build & Push Docker Image

on:
  push:
    branches:
      - main  # Only trigger when pushing/merging to main branch

jobs:
  docker-build-and-push:
    name: Build Docker Image and Push to Docker Hub
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            sanjaykarmakar/docker-node-environment:latest
            sanjaykarmakar/docker-node-environment:v1.0.0
            sanjaykarmakar/docker-node-environment:${{ github.sha }}
```


### 🔄 CI/CD Setup with GitHub Actions

##### Step 1: 🔐 Create Secrets in GitHub
<pre>
Go to your GitHub repo → Settings → Secrets and Variables → Actions:
  DOCKERHUB_USERNAME: your Docker Hub username
  DOCKERHUB_TOKEN: Docker Hub access token with read/write access
</pre>

##### Step 2:
<pre>
Setup .github > workflows > docker-node-environment.yml
</pre>

##### Step 3:
<pre>
Go to https://hub.docker.com/
Click on your profile > Account Settings
Go to Personal Access Token
Give it a name like github-ci-cd-token, set expiration
Choose access level: Read/Write
Click Generate
Copy the token (you won’t see it again!)
</pre>

##### Step 4:
<pre>
Add this to GitHub repo:
  • Go to your GitHub repo → Settings → Secrets and variables → Actions
  • Click New repository secret
  • Name: DOCKERHUB_USERNAME
  • Value: Your Docker Hub username
  • Click New repository secret
  • Name: DOCKERHUB_TOKEN
  •	Value: The Docker Hub token you just generated
</pre>

##### Step 4:
<pre>
Pushing code to the developer branch
Switch to the Main Branch, merge developer branch here
</pre>
