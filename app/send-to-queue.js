const { ServiceBusClient } = require('@azure/service-bus')

const connectionString = process.env.CONNECTION_STRING
const queueName = process.env.QUEUE_NAME

const sendToQueue = async (messages) => {
  const sbClient = new ServiceBusClient(connectionString)
  const sender = sbClient.createSender(queueName)

  try {
    const messageBatch = await createMessageBatch(messages, sender)
    await sender.sendMessages(messageBatch)
    console.log(`Sent a batch of messages to the queue: ${queueName}`)
    await sender.close()
  } finally {
    await sbClient.close()
  }
}

const createMessageBatch = async (messages, sender) => {
  let batch = await sender.createMessageBatch()
  for await (const message of messages) {
    if (!batch.tryAddMessage(message)) {
      await sender.sendMessages(batch)
      batch = await sender.createMessageBatch()
      if (!batch.tryAddMessage(message)) {
        throw new Error('Message too big to fit in a batch')
      }
    }
  }
  return batch
}

module.exports = sendToQueue
