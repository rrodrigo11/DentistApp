const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>console.log("Succesfully connected to MongoDB."))
  .catch((err)=>console.log("Failed to connect MongoDB.", err));

module.exports = mongoose;