require('dotenv').config()

const sendToQueue = require('./send-to-queue')
const arrayData = require('./data')

sendToQueue(arrayData)
