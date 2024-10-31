const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {

    try {
       const res= await mongoose.connect(process.env.URL);  
        console.log(`Connected to MongoDB successfully!`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

}

module.exports=connectDB;