require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/activeaura';

async function checkSetup() {
  console.log('\n🔍 Checking ActiveAura Setup...\n');

  try {
    // Check MongoDB connection
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Check users
    const userCount = await User.countDocuments();
    console.log(`✅ Users in MongoDB: ${userCount}`);

    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser) {
      console.log(`✅ Admin user exists: ${adminUser.email}`);
    } else {
      console.log('❌ No admin user found. Run: node createAdmin.js');
    }

    // Check products
    const productsPath = path.join(__dirname, 'db', 'products.json');
    if (fs.existsSync(productsPath)) {
      const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
      console.log(`✅ Products in database: ${products.length}`);
    } else {
      console.log('❌ No products found. Run: node seedProducts.js');
    }

    // Check orders
    const ordersPath = path.join(__dirname, 'db', 'orders.json');
    if (fs.existsSync(ordersPath)) {
      const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8'));
      console.log(`✅ Orders in database: ${orders.length}`);
    } else {
      console.log('⚠️  No orders yet (this is normal)');
    }

    console.log('\n✅ Setup looks good! Start the servers:\n');
    console.log('Backend:  cd backend && npm run dev');
    console.log('Frontend: npm start\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkSetup();
