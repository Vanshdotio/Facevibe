const mongoose = require('mongoose')
const dns = require('dns')

// Fallback to public DNS servers if needed for Atlas SRV lookups
const dnsServers = ["8.8.8.8", "1.1.1.1"];
try {
  dns.setServers(dnsServers);
} catch (err) {
  console.warn("Unable to set custom DNS servers:", err.message);
}

function connectToDB() {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    mongoose.connect(uri)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log(err);

        })
}

module.exports = connectToDB;