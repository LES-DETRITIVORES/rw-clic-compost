
const twilio = require('twilio')(process.env.TWILIO_TEST_ACCOUNT, process.env.TWILIO_TEST_TOKEN); 

export const sendSMS = async ({ query }) => {
 
  const message = await twilio.messages.create(
    {
      body: query,
      from: '+12077055921',
      to: '+33672143657' 
    })

  return {
    query,
    id : message.sid
  }
}