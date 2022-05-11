
const twilio = require('twilio')(process.env.TWILIO_TEST_ACCOUNT, process.env.TWILIO_TEST_TOKEN); 

export const sendSMS = async ({ input }) => {
 
  const message = await twilio.messages.create(
    {
      body: input.text,
      from: input.from, // 'ex: +12077055921'
      to: input.to // 'ex: +33672143657' 
    })

  return {
    id : message.sid
  }
}