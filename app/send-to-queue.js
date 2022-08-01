const { ServiceBusClient } = require('@azure/service-bus')

const connectionString = process.env.CONNECTION_STRING
const queueName = process.env.QUEUE_NAME

const sendToQueue = async (messages) => {
// create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString)

  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName)

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    // await sender.sendMessages(messages)

    // create a batch object
    let batch = await sender.createMessageBatch()
    for (let i = 0; i < messages.length; i++) {
    // for each message in the array

      // try to add the message to the batch
      if (!batch.tryAddMessage(messages[i])) {
        // if it fails to add the message to the current batch
        // send the current batch as it is full
        await sender.sendMessages(batch)

        // then, create a new batch
        batch = await sender.createMessageBatch()

        // now, add the message failed to be added to the previous batch to this batch
        if (!batch.tryAddMessage(messages[i])) {
          // if it still can't be added to the batch, the message is probably too big to fit in a batch
          throw new Error('Message too big to fit in a batch')
        }
      }
    }

    // Send the last created batch of messages to the queue
    await sender.sendMessages(batch)

    console.log(`Sent a batch of messages to the queue: ${queueName}`)

    // Close the sender
    await sender.close()
  } finally {
    await sbClient.close()
  }
}

module.exports = sendToQueue
