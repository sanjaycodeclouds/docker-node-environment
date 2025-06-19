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
npm init
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

### 🧩 Docker Setup

### Step 6: 🐳 Dockerfile
#####   Setup "Dockerfile"
#####   This file include all the necessary dependencies to build the image
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

### Step 7: 📤 Git Push & Commit
<pre>
Pushing code to the branch
</pre>

### Step 8: 🔨 Push Docker Image to Docker Hub Manually (without CI/CD)
##### Login to Docker Hub from CLI
```bash
docker login
```

### Step 9: 🛠️ Build the Docker Image
```bash
docker build -t sanjaykarmakar/docker-node-environment:latest .
```

### Step 10: 🏷️ Tag with Version (optional but recommended)
```bash
docker tag sanjaykarmakar/docker-node-environment:latest sanjaykarmakar/docker-node-environment:v1.0.0
```

### Step 11: 🚀 Push the Image to Docker Hub
```bash
# Push the latest tag
docker push sanjaykarmakar/docker-node-environment:latest

# Push the versioned tag
docker push sanjaykarmakar/docker-node-environment:v1.0.0
```

### Step 12: ✅ Done!
##### Now your image will be available for your team to pull and use:
```bash
docker pull sanjaykarmakar/docker-node-environment:latest
```


### 🔄 CI/CD Setup with GitHub Actions

### Step 1: ⚙️ GitHub Actions Workflow
#####   Setup docker-node-environment-deploy.yml
<pre>
.github > workflows > docker-node-environment.yml
</pre>
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

### Step 2: 🐳 Docker Hub Setup
<pre>
Docker Hub setup:
  • Go to https://hub.docker.com/
  • Click on your profile → Account Settings
  • Go to Personal Access Token
  • Give it a name like github-ci-cd-token, set expiration
  • Choose access level: Read/Write
  • Click Generate
  • Copy the token (you won’t see it again!)
</pre>

### Step 3: 🔐 Create Secrets in GitHub
<pre>
Add this to GitHub repo:
  • Go to your GitHub repo → Settings → Secrets and variables → Actions
  • Click New repository secret
  • Name: DOCKERHUB_USERNAME
  • Value: Your Docker Hub username
  • Click New repository secret
  • Name: DOCKERHUB_TOKEN
  • Value: The Docker Hub token you just generated
</pre>

### Step 4: 📤 Git Push & Commit
<pre>
Pushing code to the developer branch
Switch to the Main Branch, merge developer branch
Push the main branch
</pre>


### 🧪 How Team Members Can Use the Image
### Step 1: 🐳 Docker Setup Guide (for Team Members)
<pre>
Must have Docker installed on team members system.
  • For macOS / Windows:
  • Download Docker Desktop: https://www.docker.com/products/docker-desktop/
  • Install and open Docker Desktop.
  • Ensure Docker is running in the background.
</pre>
  • For Linux (Debian/Ubuntu):
  ```bash
    sudo apt update
    sudo apt install docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
  ```
### Step 2: 🚀 Run the Project Using Docker (for Team Members)
##### No need to install Node.js, MongoDB manually! or set up anything locally. They can just:
##### Pulled the image
```bash
docker pull sanjaykarmakar/docker-node-environment:latest
```


### Step 3: 📁 Create a Local Project Folder (if not already) (for Team Members)
##### If you haven’t copied the code from the container, create a folder to mount your work into:
##### Copied files out of the container to local folder
```bash
docker run --name temp-node-app -d sanjaykarmakar/docker-node-environment:latest

docker cp <container_id>:/app ./my-node-app
cd my-node-app

docker stop temp-node-app
docker rm temp-node-app
```

### ✅ Step 4: You should run:
##### Every time you do the changes it will reflect
```bash
docker run -d -p 3000:3000 -v "$(pwd)":/app -w /app sanjaykarmakar/docker-node-environment:latest
```


### 🔁 Rebuild & Push Updated Docker Image
##### If your team member adds a new package, they’ve changed the package.json (and probably package-lock.json). To reflect this change in Docker Hub, they must follow these steps:

##### ✅ Steps Your Team Member Must Follow After Adding a New Package
```bash
docker build -t sanjaykarmakar/docker-node-environment:latest .
```
<pre>
OR
</pre>

```bash
docker build -t sanjaykarmakar/docker-node-environment:v1.0.2 .
```

##### Push the Updated Image to Docker Hub
```bash
docker push sanjaykarmakar/docker-node-environment:latest
```
<pre>
Or with a version tag:
</pre>
```bash
docker push sanjaykarmakar/docker-node-environment:v1.1.1
```

### ✅ Other Team Members Can Now Pull the Latest Image
```bash
docker pull sanjaykarmakar/docker-node-environment:latest
docker run -d -p 3000:3000 sanjaykarmakar/docker-node-environment:latest
```

### 📌 In Short:
##### Every time the code or dependencies change, rebuild and push a new Docker image to Docker Hub.








### 📝 Changelog (Manual)
##### [1.1.0] – 2025-06-19
🎉 **Added Steps For Team Member To Use The Docker Image, Install Packages And Push To The Docker Hub Release**
- Added steps for team member to use the Docker Image, install packages and push to the Docker Hub.


##### [1.1.0] – 2025-06-18
🎉 **Added platforms Release**
- Added platforms: linux/amd64,linux/arm64 – ensures compatibility for both x86 and ARM (M1/M2) systems.

##### [1.0.0] – 2025-06-17
🎉 **Initial Release**
- Node.js app containerized with Docker.
- MongoDB connection via mongoose.
- CI/CD pipeline set up via GitHub Actions.
- Pushed Docker image to Docker Hub.