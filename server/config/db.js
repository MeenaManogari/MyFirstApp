const mongoose = require("mongoose");
const connectDB = async () => {
  const connects = await mongoose.connect(process.env.MONGO_DB);
  console.log(`MongoDB Connected:${connects.connection.host}`);
};
module.exports = connectDB;
