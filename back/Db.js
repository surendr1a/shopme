const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  const MONGO_URI = 'mongodb+srv://Amazon:Amazon@cluster0.metou6t.mongodb.net/Amazon?retryWrites=true&w=majority&appName=Cluster0';

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const fetchedDataCollection = mongoose.connection.db.collection('products');
    const foodfetchedData = await fetchedDataCollection.find({}).toArray();

    global.products = foodfetchedData;
    console.log("Connected to MongoDB successfully");
    return mongoose.connection; // Return the database connection
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connection;
