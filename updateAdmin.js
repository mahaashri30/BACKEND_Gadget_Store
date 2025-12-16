const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(
  "mongodb+srv://vdmahaashri_db_user:Sece%402024@cluster0.r1fw5t4.mongodb.net/ActiveAura?retryWrites=true&w=majority"
).then(async () => {
  console.log("Connected to MongoDB");
  
  const result = await User.updateOne(
    { email: "admin@activeaura.com" },
    { $set: { role: "admin" } }
  );
  
  console.log("Updated:", result);
  console.log("Admin role set successfully!");
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
