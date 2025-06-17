# docker-node-environment

```bash
## Main project setup (this is not needed for Team Members)
-----------------------------------------------------
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