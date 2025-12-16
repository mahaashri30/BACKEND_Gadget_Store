const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vdmahaashri_db_user:Sece%402024@cluster0.r1fw5t4.mongodb.net/ActiveAura?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
