const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv'); 
const colors = require('colors');
const connectDB = require('./config/connectDB');

//Config dotenv
dotenv.config();

// Database connection
connectDB()

// Rest object
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/users', require('./routes/userRoute'))

// Transaction
app.use("/api/v1/transaction", require("./routes/transactionRoute"))

//Port
const PORT = 8080 || process.env.PORT;

//Listen server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})