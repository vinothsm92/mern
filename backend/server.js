const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://sanjumsp:sanjumsp@cluster0.bw059.mongodb.net/sample?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

 const booksRouter = require('./routes/books');

 app.use('/api', booksRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
