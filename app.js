const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

// Setup constants
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://admin:oH5i0ldJV0Np0EEE@cluster0.b4laov4.mongodb.net/deocker_node_environment?retryWrites=true&w=majority&appName=Cluster0"


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
        console.log("Error in MongoDB connection.", err.message)
    })


// Routes
app.get('/', (req, res) => {
  res.send('Node.js Docker Environment Ready!');
});


// Server Connection
app.listen(PORT, () => { console.log(`Server started at port: ${PORT}`);})