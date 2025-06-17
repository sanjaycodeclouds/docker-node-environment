# docker-node-environment

```bash
## Main project setup (this is not needed for Team Members)
-----------------------------------------------------------
# Step 1: Folder Structure
#    ├── app.js
#    ├── package.json
#    ├── Dockerfile
#    ├── docker-compose.yml
#    ├── .env

# Step 2:
#   npm i --save-dev nodemon
#   npm i --save express
#   npm i --save dotenv
#   npm i --save body-parser
#   npm i --save mongoose
#   npm i --save cors

# Step 3:
#   Setup .env file
#   PORT=?
#   MONDOGB_URL=?

# Step 4:
#   Setup connection.js file for MongoDB connect

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
