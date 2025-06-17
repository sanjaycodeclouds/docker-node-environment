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
#   PORT=3000
#   MONDOGB_URL=mongodb+srv://admin:<password>@cluster0.b4laov4.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0

# Step 4:
#   Setup connection.js file for MongoDB connect
const mongoose = require("mongoose")
function connectToMongoDB(url) {
    return mongoose.connect(url)
}
module.exports = {
    connectToMongoDB,
}

# Step 5:
#   Setup app.js file

# Step 6: 
#   Setup "Dockerfile"
#   This file include all the necessary dependencies to run the container

# Step 7:
#   Setup docker-compose.yml
#   This file is not necessary but it includes some features like:
#     • This will overcome to build the docker everytime
#     • Share setup with your team
#     • Running multiple services (like Node.js + MongoDB)
#     • Want to simplify your Docker commands


## CI/CD setup (this is not needed for Team Members)
----------------------------------------------------
# Step 1:
#   Switch to deloper branch (recommended)

# Step 2:
#   Setup .github > workflows > docker-node-environment.yml

# Step 3:
#   Go to https://hub.docker.com/
#   Click on your profile > Account Settings
#   Go to Personal Access Token
#   Give it a name like github-ci-cd-token, set expiration
#   Choose access level: Read/Write
#   Click Generate
#   Copy the token (you won’t see it again!)

# Step 4:
#   Then add this to GitHub repo:
#     • Go to your GitHub repo → Settings → Secrets and variables → Actions
#     • Click New repository secret
#     • Name: DOCKERHUB_USERNAME
#     • Value: Your Docker Hub username
#     • Click New repository secret
#     • Name: DOCKERHUB_TOKEN
#     •	Value: The Docker Hub token you just generated

# Step 4:
#   Pushing code to the developer branch
#   Switch to the Main Branch, merge developer branch here
