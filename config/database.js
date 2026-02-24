const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("DB Connected");
    } catch (err) {
        console.log("DB Error:", err.message);
    }
}

module.exports = dbConnect;
