require('dotenv').config()

const sendToQueue = require('./send-to-queue')
const generateData = require('./generateData')
sendToQueue(generateData(10))
