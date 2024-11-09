const express = require('express');
const { addTransaction, getAllTransaction } = require("../controllers/transactionController")

// Router object

const router = express.Router();


// Routes 
// Add Transaction POST Method
router.post("/add-transcation", addTransaction)

// Get Transaction GET Method
router.post("/get-transaction", getAllTransaction)

module.exports = router