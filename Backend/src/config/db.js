const mongoose = require("mongoose");
const dns = require("dns");

// Fallback to public DNS servers if needed for Atlas SRV lookups
const dnsServers = ["8.8.8.8", "1.1.1.1"];
try {
  dns.setServers(dnsServers);
} catch (err) {
  console.warn("Unable to set custom DNS servers:", err.message);
}

/**
 * Connects to MongoDB database using Mongoose.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error("Database Connection Error: MONGO_URI or MONGODB_URI is not defined in env configuration.");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
